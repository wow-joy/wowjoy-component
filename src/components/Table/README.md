# Table

Table 组件

## 使用

- 基础用法

```
import React from 'react'
import { Table } from 'wowjoy-component'

const PROPS = {
  data: [
    {
      name: "foo1",
      age: 22,
      address: "Tokyo No. 1 Lake Park",
    },
    {
      name: "foo2",
      age: 23,
      address: "Tokyo No. 2 Lake Park",
    },
    {
      name: "foo3",
      age: 24,
      address: "Tokyo No. 3 Lake Park",
    }
  ],
  columnRenders: [
      (dataItem, index, colKey) => <td key={colKey}><input defaultValue={dataItem['name']}></input></td>,
      (dataItem, index, colKey) => <td key={colKey}><input defaultValue={dataItem['age']}></input></td>,
      (dataItem, index, colKey) => <td key={colKey}>{dataItem['address']}</td>,
  ]
};

const Foo = () => <Table {...PROPS}></Table>
```

## APIs

| 属性          | 描述                                                          | 类型   | 默认值 |
| ------------- | :------------------------------------------------------------ | :----: | :----: |
| className     | 顶层样式 class                                                | string |        |
| defaultStyles | 顶层默认样式                                                  | string |        |
| data          | 数据源 <br/> 格式：以行为基准,[{},{}], 每个对象描述一行的数据 | array  |        |
| columns       | 列渲染函数列表 <br/> 格式：以列为基准 [{id, render,title}]    | array  |        |
| onRowClick    | 点击事件     (rowEle, rowIndex)=>{}                           | func   |        |
