# Steps

Steps 组件

## 使用

- 基础用法

```jsx
import React from 'react'
import {Steps} from 'wowjoy-component'
const Foo = () => (
  <Steps current={1}>
    <Steps.Step title="Finished" description="This is a description." />
    <Steps.Step title="In Progress" description="This is a description." />
    <Steps.Step title="**Waiting**" description="This is a description." />
  </Steps>
),
```

## APIs

### Steps

| 属性           | 描述                                                                                                 |  类型  |   默认值   |
| -------------- | :--------------------------------------------------------------------------------------------------- | :----: | :--------: |
| className      | 顶层样式 class                                                                                       | string |     -      |
| defaultStyles  | 顶层默认样式                                                                                         | string |     -      |
| children       | 内容                                                                                                 | number |     24     |
| size           | 步骤条每个的大小                                                                                     | string |  "basic"   |
| type           | 步骤条布局类型，可选 "basic"、"dot" 和 "arrow"                                                       | string |  "basic"   |
| current        | 指定当前步骤，从 0 开始记数。在子 Step 元素中，可以通过 status 属性覆盖状态                          | number |     0      |
| direction      | 指定步骤条方向。目前支持水平（horizontal）和竖直（vertical）两种方向                                 | string | horizontal |
| labelPlacement | 指定标签放置位置，默认水平放图标右侧，可选 vertical 放图标下方，upAndDown 标题和描述分别位于图标上下 | string | horizontal |
| status         | 指定当前步骤的状态，可选 waitprocessfinisherror                                                      | string |  process   |
| initial        | 起始序号，从 0 开始记数                                                                              | number |     0      |

### Steps.Step

| 属性        | 描述                                                                                                                                                                                                  |  类型  |  默认值   |
| ----------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :-------: |
| description | 步骤的详情描述，可选                                                                                                                                                                                  | string | ReactNode | - |
| icon        | 步骤图标的类型，可选，接受函数时：(currentIcon,{index,status,title,description})=>ReactNode，currentIcon 为结合当前状态应当显示的组件（如果此时 Steps.type 为'dot'，currentIcon 为内置默认 Dot 组件） | string | ReactNode | function | - |
| status      | 指定状态。当不配置该属性时，会使用 Steps 的 current 来自动指定状态。可选：waitprocessfinisherror                                                                                                      | string |   wait    |
| title       | 标题                                                                                                                                                                                                  | string | ReactNode | - |
