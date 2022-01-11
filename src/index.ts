import rpn from 'request-promise-native'
import * as Types from './types'
const BOT_URL_WEBHOOK = 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send'
const BOT_URL_UPLOAD =
  'https://qyapi.weixin.qq.com/cgi-bin/webhook/upload_media'
import fs, { ReadStream } from 'fs'
import { md5 } from './md5'

/**
 * 如何使用群机器人
 * 在终端某个群组添加机器人之后，创建者可以在机器人详情页看的该机器人特有的webhookurl。开发者可以按以下说明a向这个地址发起HTTP POST 请求，即可实现给该群组发送消息。
 * 特别特别要注意：一定要保护好机器人的webhook地址，避免泄漏！不要分享到github、博客等可被公开查阅的地方，否则坏人就可以用你的机器人来发垃圾消息了。
 */
export class WeWorkBot {
  private key: string
  constructor(params: { key: string }) {
    this.key = params.key
  }

  /** 统一发送任意类型的消息 */
  async send(msg: Types.IMsg): Promise<Types.IMsgResult> {
    const res = (await rpn({
      uri: BOT_URL_WEBHOOK,
      method: 'POST',
      json: true,
      qs: {
        key: this.key,
      },
      body: msg,
    })) as Types.IMsgResult
    if (res.errcode !== 0 || res.errmsg !== 'ok') {
      throw new Error(`errcode: ${res.errcode}, errmsg: ${res.errmsg}`)
    } else {
      return res
    }
  }

  /** 发送文本消息 */
  async sendText(msg: Types.IMsgText['text']) {
    return this.send({
      msgtype: 'text',
      text: msg,
    } as Types.IMsgText)
  }

  /** 发送markdown类型消息 */
  async sendMarkDown(content: string) {
    return this.send({
      msgtype: 'markdown',
      markdown: {
        content,
      },
    } as Types.IMsgMarkDown)
  }

  /** 发送 图片类型消息 */
  async sendImage(filePath: string) {
    const buff = await fs.promises.readFile(filePath)
    const md5hash = md5(buff)
    const base64 = buff.toString('base64')
    console.log(md5hash)
    return this.send({
      msgtype: 'image',
      image: {
        base64,
        md5: md5hash,
      },
    } as Types.IMsgImage)
  }

  /** 发送文件消息，请先用文件上传接口获取media id */
  async sendFile(mediaId: string) {
    return this.send({
      msgtype: 'file',
      file: {
        media_id: mediaId,
      },
    } as Types.IMsgFile)
  }

  /** 发送图文类型消息 */
  async sendNews(articles: Types.IMsgNewsArticle[]) {
    return this.send({
      msgtype: 'news',
      news: {
        articles,
      },
    } as Types.IMsgNews)
  }

  /** 发送文本通知模版卡片 */
  async sendCardTextNotice(
    msg: Omit<Types.IMsgTemplateCardTextNotice['template_card'], 'card_type'>
  ) {
    return this.send({
      msgtype: 'template_card',
      template_card: {
        card_type: 'text_notice',
        ...msg,
      },
    } as Types.IMsgTemplateCardTextNotice)
  }

  /** 发送图文展示模版卡片 */
  async sendCardNewsNotice(msg: Types.IMsgTemplateCardNewsNotice) {
    return this.send(msg)
  }

  /**
   * 文件上传接口
   * 要求文件大小在5B~20M之间, 素材上传得到media_id，该media_id仅三天内有效, media_id只能是对应上传文件的机器人可以使用
   * */
  async upload(params: { stream?: ReadStream; filePath?: string }) {
    if (!params.filePath && !params.stream) {
      throw new Error('Either stream or file path is required!')
    }
    if (params.filePath && params.stream) {
      throw new Error('Only one of stream or file path is required!')
    }
    const fileStream = params.stream || fs.createReadStream(params.filePath!)
    const res = (await rpn({
      uri: BOT_URL_UPLOAD,
      method: 'POST',
      qs: {
        key: this.key,
        type: 'file',
      },
      json: true,
      formData: {
        file: {
          value: fileStream,
          options: {
            filename: 'test.jpg',
            // contentType: 'image/jpg',
          },
        },
      },
    })) as Types.IUploadResult
    if (res.errcode === 0 && res.errmsg === 'ok' && res.media_id) {
      return res.media_id
    } else {
      const errmsg = `errcode: ${res.errcode}, errmsg: ${res.errmsg}`
      throw new Error(errmsg)
    }
  }
}
