# createForm

表单构建工具组合

## 使用

- 基础用法

```
import React, { Component } from "react";
import { createForm } from "wowjoy-component/lib/tools";

class Foo  extends Component {
  state = {
    value: 0
  }
  submit=()=>{
    const { formHandle } = this.props;
    ajax.post(formHandle.getter())
  }

  render() {
    const { formHandle, bindForm } = this.props;
    return (
      <input
        {...bindForm({
          name: "xx",
          //onChange: e => this.setState({value: e.target.value}),
          //value: this.state.value,
          onChange: e => console.log(e.target.value),
          defaultValue:  this.state.value,
          rules: v => v === '1'
        })}
        type="text"
      />
    );
  }
}

export default createForm(Detail);
```

## Params

- createForm

  | 参数      |     | 描述     |      类型      | 默认值 |
  | --------- | --- | :------- | :------------: | :----: |
  | component |     | 指定组件 | ReactComponent |        |

## Apis

- formHandle

  | 方法     | 参数     | 描述                                                                          |   类型   | 默认值  |
  | -------- | -------- | :---------------------------------------------------------------------------- | :------: | :-----: |
  | getter   |          | 获取指定`name`控件的`property`属性<br>例: `formHandle.getter('age', 'rules')` | function |         |
  |          | name     | 指定控件的`name`, 为空时， 返回所有绑定的控件的值(`object`)                   |  string  |         |
  |          | property | 指定控件的`property` ;可选值: `value | rules`                                 |  string  | `value` |
  | validate |          | 检测指定组件是否通过校验(`boolean`)                                           | function |         |
  |          | name     | 指定控件的`name`, 为空时， 返回所有绑定的控件的校验结果(`object`)             |  string  |         |

- bindForm

  ```
  bindForm方法只是为react原生控件的onChange增加了监听事件, 收集控件的name和value, 并额外增加了rules的属性。原生控件的行为不会有任何改变, rules也不会被传递给控件
  ```

  | 参数      | 子属性       | 描述                                                                                                      |      类型      | 默认值 |
  | --------- | ------------ | :-------------------------------------------------------------------------------------------------------- | :------------: | :----: |
  | userProps | name         | 输入控件的命名                                                                                            |     string     |        |
  |           | rules        | 校验规则 接受一个参数: value                                                                              |    function    |        |
  |           | value        | 控件的值; 受控组件; _与 defaultValue 互斥_[https://reactjs.org/docs/forms.html#controlled-components]     | string\|number |
  |           | defaultValue | 非受控组件的初始值, 允许为空; _与 value 互斥_ [https://reactjs.org/docs/forms.html#controlled-components] | string\|number |
  |           | onChange     | 控件值修改事件                                                                                            |    function    |        |
