export interface IMsgText {
  msgtype: 'text'
  text: {
    /** 文本内容，最长不超过2048个字节，必须是utf8编码 */
    content: string
    /** userid的列表，提醒群中的指定成员(@某个成员)，@all表示提醒所有人，如果开发者获取不到userid，可以使用mentioned_mobile_list */
    mentioned_list?: Array<string | '@all'>
    /** 手机号列表，提醒手机号对应的群成员(@某个成员)，@all表示提醒所有人。  */
    mentioned_mobile_list?: Array<string | '@all'>
  }
}

export interface IMsgMarkDown {
  msgtype: 'markdown'
  markdown: {
    content: string
  }
}

export interface IMsgImage {
  msgtype: 'image'
  image: {
    base64: string
    md5: string
  }
}

export interface IMsgFile {
  /** 消息类型，此时固定为file */
  msgtype: 'file'
  file: {
    /** 文件id，通过下文的文件上传接口获取 */
    media_id: string
  }
}

export interface IMsgNewsArticle {
  /** 标题，不超过128个字节，超过会自动截断 */
  title: string
  /** 描述，不超过512个字节，超过会自动截断 */
  description?: string
  /** 点击后跳转的链接。 */
  url: string
  /** 图文消息的图片链接，支持JPG、PNG格式，较好的效果为大图 1068*455，小图150*150。 */
  picurl?: string
}

export interface IMsgNews {
  /** 消息类型，此时固定为news */
  msgtype: 'news'
  news: {
    /** 图文消息，一个图文消息支持1到8条图文 */
    articles: IMsgNewsArticle[]
  }
}

export type IHorizontalContentList = {
  /** 链接类型，0或不填代表是普通文本，1 代表跳转url，2 代表下载附件，3 代表@员工。 */
  type?: 0 | 1 | 2 | 3
  /** 二级标题，建议不超过5个字 */
  keyname: string
  /** 二级文本，如果horizontal_content_list.type是2，该字段代表文件名称（要包含文件类型），建议不超过26个字 */
  value?: string
  /** 附件的media_id */
  media_id?: 'MEDIAID'
  /** 链接跳转的url，horizontal_content_list.type是1时必填 */
  url?: string
}

export type IVerticalContentList = {
  /** 卡片二级标题，建议不超过26个字 */
  title: string
  /** 二级普通文本，建议不超过112个字 */
  desc?: string
}

export type IJumpList = {
  /** 1 跳转url；2跳转小程序 */
  type: 1 | 2
  /** 跳转的标题 */
  title: '跳转小程序'
  /** 小程序的appid */
  appid?: 'APPID'
  /** 小程序的page path */
  pagepath?: 'PAGEPATH'
  /** 跳转的url */
  url?: 'https://work.weixin.qq.com/?from=openApi'
}

export interface ICardAction {
  /** 1 url, 2 小程序 */
  type: 1 | 2
  url?: string
  appid?: string
  pagepath?: string
}

export interface IQuoteArea {
  /** 引用文献样式区域点击事件，0或不填代表没有点击事件，1 代表跳转url，2 代表跳转小程序 */
  type?: 0 | 1 | 2
  /** 点击跳转的url，quote_area.type是1时必填 */
  url?: string
  /** 点击跳转的小程序的appid，quote_area.type是2时必填 */
  appid?: string
  /** 点击跳转的小程序的pagepath，quote_area.type是2时选填 */
  pagepath?: string
  /** 引用文献样式的标题 */
  title?: string
  /** 引用文献样式的引用文案 */
  quote_text?: string
}

export interface IEmphContent {
  /** 关键数据样式的数据内容，建议不超过10个字 */
  title?: '100'
  /** 关键数据样式的数据描述内容，建议不超过15个字 */
  desc?: '数据含义'
}

export interface IMainTitle {
  /** 一级标题，建议不超过26个字。模版卡片主要内容的一级标题main_title.title和二级普通文本sub_title_text必须有一项填写 */
  title?: '欢迎使用企业微信'
  /** 标题辅助信息，建议不超过30个字 */
  desc?: '您的好友正在邀请您加入企业微信'
}

export interface ISource {
  /** 来源图片的url */
  icon_url?: 'https://wework.qpic.cn/wwpic/252813_jOfDHtcISzuodLa_1629280209/0'
  /** 来源图片的描述，建议不超过13个字 */
  desc?: '企业微信'
  /** 来源文字的颜色，目前支持：0(默认) 灰色，1 黑色，2 红色，3 绿色 */
  desc_color?: 0 | 1 | 2 | 3
}

export interface ICardImage {
  /** 图片的url */
  url: string
  /** 图片的宽高比，宽高比要小于2.25，大于1.3，不填该参数默认1.3 */
  aspect_ratio?: number
}

export interface IImageTextArea {
  /** 左图右文样式区域点击事件，0或不填代表没有点击事件，1 代表跳转url，2 代表跳转小程序| */
  type?: 0 | 1 | 2
  /** 点击跳转的url，image_text_area.type是1时必填 */
  url?: string
  /** 点击跳转的小程序的appid，必须是与当前应用关联的小程序，image_text_area.type是2时必填 */
  appid?: string
  /** 点击跳转的小程序的pagepath，image_text_area.type是2时选填 */
  pagepath?: string
  /** 左图右文样式的标题 */
  title?: string
  /** 左图右文样式的描述 */
  desc?: string
  /** 左图右文样式的图片url */
  image_url: string
}

export interface IMsgTemplateCardTextNotice {
  msgtype: 'template_card'
  template_card: {
    /** 模版卡片的模版类型，文本通知模版卡片的类型为text_notice */
    card_type: 'text_notice'
    /** 卡片来源样式信息，不需要来源样式可不填写 */
    source?: ISource
    /** 模版卡片的主要内容，包括一级标题和标题辅助信息 */
    main_title: IMainTitle
    /** 关键数据样式 */
    emphasis_content?: IEmphContent
    /** 引用文献样式，建议不与关键数据共用 */
    quote_area?: IQuoteArea
    /** 二级普通文本，建议不超过112个字。模版卡片主要内容的一级标题main_title.title和二级普通文本sub_title_text必须有一项填写 */
    sub_title_text?: string
    /** 二级标题+文本列表，该字段可为空数组，但有数据的话需确认对应字段是否必填，列表长度不超过6 */
    horizontal_content_list?: IHorizontalContentList[]
    jump_list?: IJumpList[]
    card_action?: ICardAction
  }
}

export interface IMsgTemplateCardNewsNotice {
  msgtype: 'template_card'
  template_card: {
    /** 模版卡片的模版类型，文本通知模版卡片的类型为text_notice */
    card_type: 'news_notice'
    /** 卡片来源样式信息，不需要来源样式可不填写 */
    source?: ISource
    /** 模版卡片的主要内容，包括一级标题和标题辅助信息 */
    main_title: IMainTitle
    /** 图片样式 */
    card_image: ICardImage
    /** 左图右文样式 */
    image_text_area?: IImageTextArea
    /** 引用文献样式，建议不与关键数据共用 */
    quote_area?: IQuoteArea
    /** 卡片二级垂直内容，该字段可为空数组，但有数据的话需确认对应字段是否必填，列表长度不超过4 */
    vertical_content_list?: IVerticalContentList[]
    /** 二级标题+文本列表，该字段可为空数组，但有数据的话需确认对应字段是否必填，列表长度不超过6 */
    horizontal_content_list?: IHorizontalContentList[]
    jump_list?: IJumpList[]
    card_action?: ICardAction
  }
}

export type IMsg =
  | IMsgText
  | IMsgMarkDown
  | IMsgImage
  | IMsgFile
  | IMsgNews
  | IMsgTemplateCardTextNotice
  | IMsgTemplateCardNewsNotice

export interface IUploadResult {
  errcode: number
  errmsg: string
  type: 'file'
  media_id: string
  created_at: string
}

export interface IMsgResult {
  errcode: 0
  errmsg: 'ok'
}
