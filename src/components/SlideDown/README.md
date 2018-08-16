# SlideDown

SlideDown 组件

## 使用

- 基础用法

```
import React from 'react'
import SlideDown from 'wowjoy-component'

const Foo = () => <SlideDown></SlideDown>
```

## APIs

| 属性            | 描述                  |  类型  | 默认值 |
| --------------- | :-------------------- | :----: | :----: |
| className       | 顶层样式 class        | string |        |
| defaultStyles   | 顶层默认样式          | string |        |
| children        | 下拉内容              |  node  |        |
| content         | 可见控制区域内容      |  node  |        |
| onChange        | 展开状态改变 事件     |  func  |        |
| onBlur          | 失去焦点事件          |  func  |        |
| isActive        | 是否展开， 受控       |  bool  |        |
| defaultIsActive | 是否默认展开， 非受控 |  bool  |        |
