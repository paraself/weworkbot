# weworkbot

企业微信群聊机器人, Node js >= v10

官方文档地址

https://developer.work.weixin.qq.com/document/path/91770

### 安装
```
npm i weworkbot
```

### 注意
因为企业微信限制了每个机器人最大以20条/分钟发送，所以集成了p-queue用来控制发送频率

### 使用
``` js
import { WeWorkBot } from 'weworkbot'
const { mdContent } = require('./content')

const bot = new WeWorkBot({
  key: 'xxxx',
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
```


### 文本通知模版卡片

|字段|类型|必须|说明|
|:------|:-----------|:---|:---|
|card_type|String|是|模版卡片的模版类型，文本通知模版卡片的类型为text_notice|
|source|Object|否|卡片来源样式信息，不需要来源样式可不填写|
|source.icon_url|String|否|来源图片的url|
|source.desc|String|否|来源图片的描述，建议不超过13个字|
|source.desc_color|Int|否|来源文字的颜色，目前支持：0(默认) 灰色，1 黑色，2 红色，3 绿色|
|main_title|Object|是|模版卡片的主要内容，包括一级标题和标题辅助信息|
|main_title.title|String|否|一级标题，建议不超过26个字。模版卡片主要内容的一级标题main_title.title和二级普通文本sub_title_text必须有一项填写|
|main_title.desc|String|否|标题辅助信息，建议不超过30个字|
|emphasis_content|Object|否|关键数据样式|
|emphasis_content.title|String|否|关键数据样式的数据内容，建议不超过10个字|
|emphasis_content.desc|String|否|关键数据样式的数据描述内容，建议不超过15个字|
|quote_area|Object|否|引用文献样式，建议不与关键数据共用|
|quote_area.type|Int|否|引用文献样式区域点击事件，0或不填代表没有点击事件，1 代表跳转url，2 代表跳转小程序|
|quote_area.url|String|否|点击跳转的url，quote_area.type是1时必填|
|quote_area.appid|String|否|点击跳转的小程序的appid，quote_area.type是2时必填|
|quote_area.pagepath|String|否|点击跳转的小程序的pagepath，quote_area.type是2时选填|
|quote_area.title|String|否|引用文献样式的标题|
|quote_area.quote_text|String|否|引用文献样式的引用文案|
|sub_title_text|String|否|二级普通文本，建议不超过112个字。模版卡片主要内容的一级标题main_title.title和二级普通文本sub_title_text必须有一项填写|
|horizontal_content_list|Object[]|否|二级标题+文本列表，该字段可为空数组，但有数据的话需确认对应字段是否必填，列表长度不超过6|
|horizontal_content_list.type|Int|否|链接类型，0或不填代表是普通文本，1 代表跳转url，2 代表下载附件，3 代表@员工|
|horizontal_content_list.keyname|String|是|二级标题，建议不超过5个字|
|horizontal_content_list.value|String|否|二级文本，如果horizontal_content_list.type是2，该字段代表文件名称（要包含文件类型），建议不超过26个字|
|horizontal_content_list.url|String|否|链接跳转的url，horizontal_content_list.type是1时必填|
|horizontal_content_list.media_id|String|否|附件的media_id

### 图文展示模版卡片

|字段|类型|必须|说明|
|:------|:-----------|:---|:---|
|card_type|String|是|模版卡片的模版类型，图文展示模版卡片的类型为news_notice|
|source|Object|否|卡片来源样式信息，不需要来源样式可不填写|
|source.icon_url|String|否|来源图片的url|
|source.desc|String|否|来源图片的描述，建议不超过13个字|
|source.desc_color|Int|否|来源文字的颜色，目前支持：0(默认) 灰色，1 黑色，2 红色，3 绿色|
|main_title|Object|是|模版卡片的主要内容，包括一级标题和标题辅助信息|
|main_title.title|String|是|一级标题，建议不超过26个字|
|main_title.desc|String|否|标题辅助信息，建议不超过30个字|
|card_image|Object|是|图片样式|
|card_image.url|String|是|图片的url|
|card_image.aspect_ratio|Float|否|图片的宽高比，宽高比要小于2.25，大于1.3，不填该参数默认1.3|
|image_text_area|Object|否|左图右文样式|
|image_text_area.type|Int|否|左图右文样式区域点击事件，0或不填代表没有点击事件，1 代表跳转url，2 代表跳转小程序|
|image_text_area.url|String|否|点击跳转的url，image_text_area.type是1时必填|
|image_text_area.appid|String|否|点击跳转的小程序的appid，必须是与当前应用关联的小程序，image_text_area.type是2时必填|
|image_text_area.pagepath|String|否|点击跳转的小程序的pagepath，image_text_area.type是2时选填|
|image_text_area.title|String|否|左图右文样式的标题|
|image_text_area.desc|String|否|左图右文样式的描述|
|image_text_area.image_url|String|是|左图右文样式的图片url|
|quote_area|Object|否|引用文献样式，建议不与关键数据共用|
|quote_area.type|Int|否|引用文献样式区域点击事件，0或不填代表没有点击事件，1 代表跳转url，2 代表跳转小程序|
|quote_area.url|String|否|点击跳转的url，quote_area.type是1时必填|
|quote_area.appid|String|否|点击跳转的小程序的appid，quote_area.type是2时必填|
|quote_area.pagepath|String|否|点击跳转的小程序的pagepath，quote_area.type是2时选填|
|quote_area.title|String|否|引用文献样式的标题|
|quote_area.quote_text|String|否|引用文献样式的引用文案|
|vertical_content_list|Object[]|否|卡片二级垂直内容，该字段可为空数组，但有数据的话需确认对应字段是否必填，列表长度不超过4|
|vertical_content_list.title|String|是|卡片二级标题，建议不超过26个字|
|vertical_content_list.desc|String|否|二级普通文本，建议不超过112个字|
|horizontal_content_list|Object[]|否|二级标题+文本列表，该字段可为空数组，但有数据的话需确认对应字段是否必填，列表长度不超过6|
|horizontal_content_list.type|Int|否|模版卡片的二级标题信息内容支持的类型，1是url，2是文件附件|
|horizontal_content_list.keyname|String|是|二级标题，建议不超过5个字|
|horizontal_content_list.value|String|否|二级文本，如果horizontal_content_list.type是2，该字段代表文件名称（要包含文件类型），建议不超过26个字|
|horizontal_content_list.url|String|否|链接跳转的url，horizontal_content_list.type是1时必填|
|horizontal_content_list.media_id|String|否|附件的media_id