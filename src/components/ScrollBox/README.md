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

| 属性          | 描述                                                           |  类型  | 默认值 |
| ------------- | :------------------------------------------------------------- | :----: | :----: |
| className     | 顶层样式 class                                                 | string |        |
| defaultStyles | 顶层默认样式                                                   | string |        |
| children      | 内容                                                           |  node  |        |
| dynamic       | 是否动态获取宽高，当可确定组件尺寸不变时请设为 false，优化性能 |  bool  |        |
| cover         | 是否覆盖内容区域，覆盖时滚动条会覆盖边缘数据                   |  bool  |        |

## Method

| 方法名   | 描述           |  参数   | 返回 |
| -------- | :------------- | :-----: | :--: |
| scrollTo | 滚动至目标位置 | ( x,y ) | void |
| rerender | 重置滚动条     |   ()    | void |
