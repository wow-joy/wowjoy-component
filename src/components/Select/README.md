# Select

Select 组件

## 使用

- 基础用法

```
import React from 'react'
import { Select } from 'wowjoy-component'

const PROPS = {
  defaultValue: "x1",
  onChange: value => console.log(value),
  inputRender: ({value}) => (
    <div>
      {value.label}
    </div>
  ),
  onBlur: () => false,
  options: [
    {
      label: <span>x1</span>,
      labelRender: isActive => (
        <span>{isActive ? "x1 is active" : "x1 not active"}</span>
      ),
      value: "x1"
    },
    {
      label: "x2",
      value: "x2"
    },
    {
      label: "x3",
      value: "x3"
    },
    {
      label: "x4",
      value: "x4"
    },
    {
      label: "x5",
      value: "x5"
    }
  ]
};
const Foo = () => <Select {...PROPS}></Select>
```

## APIs

| 属性          | 描述                                                                                   |         类型          | 默认值 |
| ------------- | :------------------------------------------------------------------------------------- | :-------------------: | :----: |
| className     | 顶层样式 class                                                                         |        string         |        |
| defaultStyles | 顶层默认样式                                                                           |        string         |        |
| children      | 内容                                                                                   |         node          |        |
| options       | options 选项数据                                                                       |         array         |        |
| inputRender   | 被选中的展示内容<br/> params:({value}) 被选中的数据                                    |         func          |        |
| defaultValue     | 初始化值                                                                               | array\|number\|string |        |
| type          | 类型 单选\|复选<br/> 根据 type `radio|checkbox`,value 会展现为 `string\| array`        | 'radio'\| 'checkbox'  |        |
| onChange      | 值改变事件<br/> params: (value, index, optionItem)                                     |         func          |        |
| onBlur        | 失焦事件<br/> params: (event) <br/>`return false` 会阻止关闭下拉框                     |         func          |        |
| onSelect      | 选择事件<br/> params: (optionItem, index) <br/>`return false` 会阻止数据存储及后续事件 |         func          |        |
