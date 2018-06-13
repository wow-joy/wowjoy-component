# Message

提示组件

_建议结合 `pop` 工具使用_ [https://github.com/wow-joy/wowjoy-component/tree/master/src/tools/pop]

## 使用

- 基础用法

```
import React from 'react'
import { Message_info as Message } from 'wowjoy-component'
/* import { Info as Message } from 'wowjoy-component/lib/components/Message' */  // 按需加载

const Foo = () => <Message>这是个Info提示</Message>
```

## APIs

| 属性      | 子属性 | 描述                            |   类型   | 默认值 |
| --------- | ------ | :------------------------------ | :------: | :----: |
| className |        | 顶层样式 class                  |  string  |        |
| icon      |        | 图标                            |   node   |        |
| children   |        | 内容                            |   node   |        |
| onClose   |        | 关闭事件， 为空时不显示关闭按钮 | function |        |
