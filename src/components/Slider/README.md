# Slider

Slider 组件

## 使用

- 基础用法

```jsx
import React from 'react'
import { Slider } from 'wowjoy-component'

const Foo = () => <Slider defaultValue={20}/>
```

## APIs

| 属性                     | 描述                                                                                                                                         |       类型       |                         默认值                          |
| ------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------- | :--------------: | :-----------------------------------------------------: |
| className                | 顶层样式 class                                                                                                                               |      string      |                                                         |
| defaultStyles            | 顶层默认样式                                                                                                                                 |      string      |                                                         |
| children                 | 内容                                                                                                                                         |       node       |                                                         |
| value                    | 设置当前值。使用 number时只有一个滑块，number[]时有多个滑块                                                                                  |      number      |                        number[]                         |               |
| defaultValue             | 设置默认值。使用 number时只有一个滑块，number[]时有多个滑块                                                                                  | number/number[]  |                       0 or [0, 0]                       |
| included                 | marks 不为空对象时有效，值为 true 时表示值为包含关系，false 表示并列                                                                         |     boolean      |                          false                          |
| marks                    | 刻度标记，key 必须在闭区间 [min, max] 内，每个标签可以单独设置样式                                                                           | { number: string | ReactNode } or { number: { style: object, label: string | ReactNode } } | {} |
| max                      | 最大值                                                                                                                                       |      number      |                           100                           |
| min                      | 最小值                                                                                                                                       |      number      |                           100                           |
| step                     | 步长，取值必须大于 0，并且可被 (max - min) 整除。当 marks 不为空对象时，可以设置 step 为 null，此时 Slider 的可选值仅有 marks 标出来的部分。 |   number/null    |                            1                            |
| tipFormatter             | Slider 会把当前值传给 tipFormatter，并在 Tooltip 中显示 tipFormatter 的返回值，若为 null，则隐藏 Tooltip。                                   |  Function/null   |                            -                            |
| vertical                 | 值为 true 时，Slider 为垂直方向                                                                                                              |     boolean      |                          false                          |
| onChange                 | 当 Slider 的值发生改变时，会触发 onChange 事件，并把改变后的值作为参数传入。                                                                 |   value=>void    |                            -                            |
| tooltipPlacement         | 设置 Tooltip 展示位置。参考 Tooltip 组件                                                                                                     |        -         |
| tooltipVisible           | 值为true时，Tooltip 将会始终显示；否则始终不显示，哪怕在拖拽及移入时。                                                                       |     boolean      |                            -                            |
| getTooltipPopupContainer | Tooltip 渲染父节点，默认渲染到 body 上。                                                                                                     |     function     |                   () => document.body                   |