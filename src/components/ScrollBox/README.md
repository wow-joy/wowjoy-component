# ScrollBox

ScrollBox 组件

## 使用

- 基础用法

```
import React from 'react'
import { ScrollBox } from 'wowjoy-component'

const Foo = () => <ScrollBox>这里是要滚动的内容</ScrollBox>
```

## APIs

| 属性            | 描述                                                                                                                                              |  类型  | 默认值 |
| --------------- | :------------------------------------------------------------------------------------------------------------------------------------------------ | :----: | :----: |
| className       | 顶层样式 class                                                                                                                                    | string |        |
| defaultStyles   | 顶层默认样式                                                                                                                                      | string |        |
| children        | 内容                                                                                                                                              |  node  |        |
| dynamic         | 是否动态获取宽高，当可确定组件尺寸不变时请设为 false，优化性能，非原生滚动条只能自动监听重渲染，如果只有内容区域发生变化请使用`rerender` Method。 |  bool  |        |
| cover           | 是否覆盖内容区域，覆盖时滚动条会覆盖边缘数据                                                                                                      |  bool  |        |
| showOuterBorder | 是否显示外边框                                                                                                                                    |  bool  |        |
| unUseNative     | 是否禁用原生滚动条（webkit 会默认启用原生滚动条，此时`cover` api 会失效）                                                                         |  bool  |        |

## Method

| 方法名   | 描述           |  参数   | 返回 |
| -------- | :------------- | :-----: | :--: |
| scrollTo | 滚动至目标位置 | ( x,y ) | void |
| rerender | 重置滚动条     |   ()    | void |
