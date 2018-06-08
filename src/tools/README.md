# pop

弹出工具

## 使用

- 基础用法

```
import React, { Component } from "react";
import { Layout_info as Message } from 'wowjoy-component'
import pop from "wowjoy-component/tools/pop";

class Foo  extends Component {

  componentWillUnmount() {
    // 销毁
    this.popMessage&&this.popMessage.destroy()
  }

  clickHandle = () =>{
    this.popMessage = pop(Message,{
      className: 'xx',
      content: '这是一个Message'
    })({
      className: 'yy',
      layer:true,
      autoClose: 500
      animeType: 'slideLeft'
    })
  }
  render() {
    return <div onClick={this.clickHandle}> </div>;
  }
}
```

## params

`一级参数`

| 参数       |     | 描述       |      类型      | 默认值 |
| ---------- | --- | :--------- | :------------: | :----: |
| component  |     | 指定组件   | ReactComponent |        |
| properties |     | 组件 props |     object     |        |

`二级参数` `settings`
| 参数 | 子属性 | 描述 | 类型 | 默认值 |
| ---------- | --- | :--------- | :------------: | :----: |
| settings | className | 组件包裹的样式 | ReactComponent | |
| | container | 指定输出容器， 默认为 body | DOM node | |
| | animeType | 动画方式。<br> 可选值: `slideDown`, `slideUp`, `slideLeft`, `slideRight` | string | `slideDown` |
| | layer | 有无蒙层 | boolean | |
| | layerClassName | 蒙层额外样式 | string | |
| | autoClose | 自动关闭的等候时间 | number | |
| | onClose | 关闭事件句柄，`return false` 可以阻止关闭事件 | function | |

## APIs

| 属性      | 子属性 | 描述                            |   类型   | 默认值 |
| --------- | ------ | :------------------------------ | :------: | :----: |
| className |        | 顶层样式 class                  |  string  |        |
| icon      |        | 图标                            |   node   |        |
| content   |        | 内容                            |   node   |        |
| onClose   |        | 关闭事件， 为空时不显示关闭按钮 | function |        |
