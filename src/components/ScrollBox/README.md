# ScrollBox

ScrollBox 组件

## 使用

- 基础用法

```
import React from 'react'
import ScrollBox from 'wowjoy-component'

const Foo = () => <ScrollBox></ScrollBox>
```

## APIs

| 属性          | 描述           |  类型  | 默认值 |
| ------------- | :------------- | :----: | :----: |
| className     | 顶层样式 class | string |        |
| defaultStyles | 顶层默认样式   | string |        |
| children      | 内容           |  node  |        |
| visible      | 是否可见，因为需要获取内容高度，当父组件改变 `display:'none' | other`时， 请传递该参数         |  bool  |        |
