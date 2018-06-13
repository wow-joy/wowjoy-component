# pop

弹出工具

## 使用

- 基础用法

```
import React, { Component } from "react";
import { Message_info as Message } from 'wowjoy-component'
import pop from "wowjoy-component/lib/tools/pop";

class Foo  extends Component {

  componentWillUnmount() {
    // 销毁
    this.popMessage&&this.popMessage.destroy()
  }

  clickHandle = () =>{
    this.popMessage = pop(<Message className='xx'> 这是一个Message </Message>)({
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

## Params

`一级参数`

| 参数      |     | 描述     |      类型      | 默认值 |
| --------- | --- | :------- | :------------: | :----: |
| component |     | 指定组件 | ReactComponent |        |

`二级参数` `settings`

| 参数     | 子属性         | 描述                                                           |      类型      |   默认值    |
| -------- | -------------- | :------------------------------------------------------------- | :------------: | :---------: |
| settings | className      | 组件包裹的样式                                                 | ReactComponent |             |
|          | container      | 指定输出容器， 默认为 body                                     |    DOM node    |             |
|          | animeShow      | 动画方式。<br> 可选值: `slide`+ `(Down|In|Left|Right)` + `In`  |     string     | `slideDown` |
|          | animeHide      | 动画方式。<br> 可选值: `slide`+ `(Down|In|Left|Right)` + `Out` |     string     | `slideDown` |
|          | layer          | 有无蒙层                                                       |    boolean     |             |
|          | layerClassName | 蒙层额外样式                                                   |     string     |             |
|          | autoClose      | 自动关闭的等候时间                                             |     number     |             |
|          | onClose        | 关闭事件句柄，`return false` 可以阻止关闭事件                  |    function    |             |

## Return {ref,show,hide,destroy}

| 属性    |     | 描述                                 |   类型   | 默认值 |
| ------- | --- | :----------------------------------- | :------: | :----: |
| ref     |     | 返回内部组件 ref，注意这是个异步赋值 |  string  |        |
| show    |     | 弹层临时显示                         | function |        |
| hide    |     | 弹层临时显示                         | function |        |
| destroy |     | 弹层销毁                             | function |        |
