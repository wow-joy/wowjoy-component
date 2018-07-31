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
  keyStr: "table1",
  columnRenders: [
      (dataItem, index, colKey) => <td key={colKey}><input defaultValue={dataItem['name']}></input></td>,
      (dataItem, index, colKey) => <td key={colKey}><input defaultValue={dataItem['age']}></input></td>,
      (dataItem, index, colKey) => <td key={colKey}>{dataItem['address']}</td>,
  ]
};

const Foo = () => <Table {...PROPS}></Table>
```

## APIs

| 属性          | 描述                                                                                                                                                                                                                                                                                                                                               |  类型  | 默认值 |
| ------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :----: |
| className     | 顶层样式 class                                                                                                                                                                                                                                                                                                                                     | string |        |
| defaultStyles | 顶层默认样式                                                                                                                                                                                                                                                                                                                                       | string |        |
| data          | 数据源 <br/> 格式：以行为基准,[{},{}], 每个对象描述一行的数据                                                                                                                                                                                                                                                                                      | array  |        |
| columnRenders | 列渲染函数列表 <br/> 格式：以列为基准, [()=>\<td\>\<\/td\>,()=>\<td\>\<\/td\>], 每个函数描述每列的渲染结果 <br/> 说明：数组中的每一项都是函数,必须返回 td 包装的组件 <br/> 参数：`(dataItem: 本列数据源, index：列下标, colKey：key,直接作为key值传递给渲染组件)`<br/> 例子：(dataItem, index, colKey) => \<td key={colKey}>{dataItem.name}\<\/td> | array  |        |
| keyStr        | 每个列表的 key 前缀唯一标识, 请确保每个渲染页内的所有 table 组件的 keyStr 不同                                                                                                                                                                                                                                                                     | string |        |
