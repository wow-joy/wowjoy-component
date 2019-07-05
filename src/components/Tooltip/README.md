# Tooltip

Tooltip 组件

## 使用

- 基础用法

```jsx
import React from "react";
import { Tooltip, Btn } from "wowjoy-component";

const Foo = () => (
  <Tooltip title="titme" placement="topLeft">
    <Btn>test</Btn>
  </Tooltip>
);
```

## 通用api

| 属性               | 描述                                                                                                                   |                     类型                      | 默认值  |
| ------------------ | :--------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------: | :-----: |
| className          | 顶层样式 class                                                                                                         |                    string                     |         |
| defaultStyles      | 顶层默认样式                                                                                                           |                    string                     |         |
| visible            | 用于手动控制浮层显隐                                                                                                   |                    boolean                    |         |
| defaultVisible     | 默认是否显隐                                                                                                           |                    boolean                    |         |
| theme              | 气泡主题色，可选 dark light                                                                                            |                    string                     |  dark   |
| children           | 触发区域                                                                                                               |                     node                      |         |
| title              | 气泡内容                                                                                                               |                  string/node                  |         |
| mouseEnterDelay    | 鼠标移入后延时多少才显示 Tooltip，单位：秒                                                                             |                    number                     |   0.1   |
| mouseLeaveDelay    | 鼠标移出后延时多少才显示 Tooltip，单位：秒                                                                             |                    number                     |   0.1   |
| placement          | 气泡框位置，可选 top left right bottom topLeft topRight bottomLeft bottomRight leftTop leftBottom rightTop rightBottom |                    string                     |   top   |
| enterAnimation     | 入场动画                                                                                                               | object（styled-components 的 keyframes 定义） | fadeIn  |
| leaveAnimation     | 出场动画                                                                                                               | object（styled-components 的 keyframes 定义） | fadeOut |
| onVisibleChange    | 显示隐藏的回调                                                                                                         |               (visible) => void               |         |
| arrowPointAtCenter | 箭头是否指向目标元素中心                                                                                               |                     bool                      |  false  |
| autoAdjustOverflow | 气泡被遮挡时自动调整位置                                                                                               |                     bool                      |  true   |
| arrowMargin        | 气泡箭头和触发元素的距离                                                                                               |                    number                     |    4    |


# ComplexToolTip
| getContainer       | 浮层渲染父节点，默认渲染到 body 上                                                                                     |                   function                    | ()=>document.body |


> 注意：请确保 Tooltip 的子元素能接受 onMouseEnter、onMouseLeave 事件
