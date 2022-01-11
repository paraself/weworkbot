require('source-map-support').install()
const { WeWorkBot } = require('../dist/index')
const { mdContent } = require('./content')

const bot = new WeWorkBot({
  // 这里替换成自己的key
  key: 'xxxxx',
})

/** 发送文本消息 */
bot.sendText({
  content: '文本测试消息',
  mentioned_list: ['@all'],
})

/** 发送markdown消息 */
bot.sendMarkDown(mdContent)

/** 发送图片消息 */
bot.sendImage('test/test_file.jpg')

/** 发送图文消息 */
bot.sendNews([
  {
    title: '测试图文标题',
    url: 'https://www.qq.com',
    description: '测试图文描述',
    picurl:
      'http://res.mail.qq.com/node/ww/wwopenmng/images/independent/doc/test_pic_msg1.png',
  },
])

/** 上传并发送文件 */
bot
  .upload({
    filePath: 'test/test_file.jpg',
  })
  .then((mid) => {
    bot.sendFile(mid)
  })

bot.sendCardTextNotice({
  source: {
    icon_url:
      'https://wework.qpic.cn/wwpic/252813_jOfDHtcISzuodLa_1629280209/0',
    desc: '我是机器人',
  },
  main_title: {
    title: '欢迎使用企业微信机器人',
    desc: '您的好友正在邀请您加入企业微信',
  },
  emphasis_content: {
    title: '1234',
    desc: '数据含义',
  },
  quote_area: {
    type: 1,
    url: 'https://work.weixin.qq.com/?from=openApi',
    title: '引用文本标题',
    quote_text: 'Jack：企业微信真的很好用~\nBalian：超级好的一款软件！',
  },
  sub_title_text: '下载企业微信还能抢红包！',
  horizontal_content_list: [
    {
      keyname: '邀请人',
      value: '张三',
    },
    {
      keyname: '企微官网',
      value: '点击访问',
      type: 1,
      url: 'https://work.weixin.qq.com/?from=openApi',
    },
  ],
  jump_list: [
    {
      type: 1,
      url: 'https://work.weixin.qq.com/?from=openApi',
      title: '企业微信官网',
    },
  ],
  card_action: {
    type: 1,
    url: 'https://work.weixin.qq.com/?from=openApi',
  },
})
