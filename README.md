# langue-taranslate README

可以翻译选中中文文字的插件，目前为测试版

# 使用方式

安装完插件，选中要翻译文字右键即可选择使用

1. 翻译-不改变选中文本
   直接将翻译添加到词典文件里

2. 翻译-template 文本
   文本形式改变 你好世界 -> {{ $t("你好世界") }}
   将翻译添加到词典文件里

3. 翻译-template 配置项
   文本形式改变 你好世界 -> $t('你好世界')
   将翻译添加到词典文件里

4. 翻译-script 文本
   文本形式改变 "你好世界" -> i18n.global.t("你好世界")
   将翻译添加到词典文件里

# 关于配置项

点击插件的设置即可进行配置

百度翻译 api 的 apikey
百度翻译 api 的 appid

1. 本插件翻译原理为调用百度翻译的 api
   默认使用的是作者的 apikey 和 appid
   2022 年 8 月 1 日起，通用翻译 API 标准版免费调用量调整为 5 万字符/月，高级版免费调用量调整为 100 万字符/月
   个人开发认证后即可使用高级免费版,可在下面网址注册
   https://api.fanyi.baidu.com/api/trans/product/desktop?req=developer
   在开发者信息查看 apikey 和 appid

存放中英词典的路径
存放中中词典的路径

# 关于快捷键的配置

插件仅实现了 翻译-不改变选中文本 的快捷键 ctrl+shift+t

自定义快捷键方式

1. ctrl+shift+p 打开搜索框
2. 搜索 Preferences: Open Keyboard Shortcuts (JSON)
3. [
   // 翻译-不改变选中文本
   {
   "key": "ctrl+shift+t", // 你自定义的快捷键
   "command": "langue-taranslate.noChangeText",
   "when": "editorTextFocus && editorHasSelection"
   },
   // 翻译-template 文本
   {
   "key": "ctrl+shift+g", // 你自定义的快捷键
   "command": "langue-taranslate.templateText",
   "when": "editorTextFocus && editorHasSelection"
   },
   // 翻译-template 配置项
   {
   "key": "ctrl+shift+y", // 你自定义的快捷键
   "command": "langue-taranslate.templateQuoteText",
   "when": "editorTextFocus && editorHasSelection"
   },
   // 翻译-script 文本
   {
   "key": "ctrl+shift+i", // 你自定义的快捷键
   "command": "langue-taranslate.scriptText",
   "when": "editorTextFocus && editorHasSelection"
   },
   ]

# 关于插件的源码

欢迎你来完善它
https://github.com/achanghello/translate-plug
