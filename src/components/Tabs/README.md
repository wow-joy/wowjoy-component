# Tabs

Tabs 组件

## 使用

- 基础用法

```
import React from 'react'
import Tabs from 'wowjoy-component'
import Tabs from 'wowjoy-component/lib/Tabs'

const Foo = () => <Tabs controllers={[1, 2, 3].map(ele => <span key={1}>{ele}</span>)} >
     <span>X</span>
     <span>Y</span>
     <span>Z</span>
</Tabs>
```

## APIs

| 属性         | 子属性 | 描述                                                                               |  类型  | 默认值 |
| ------------ | ------ | :--------------------------------------------------------------------------------- | :----: | :----: |
| className    |        | 顶层样式 class                                                                     | string |        |
| children     |        | 内容                                                                               |  node  |        |
| controllers  |        | tabs 控制节点数组                                                                  | array  |        |
| useHover     |        | 是否使用 hover 切换 tab                                                            |  bool  | false  |
| hideOthers   |        | 选中项外的其他项是否也渲染，仅隐藏                                                 |  bool  | false  |
| initValue |        | 默认的 index \n`只有初始化生效，数据回填时使用请注意增加好前置loading防止提前渲染` |  bool  | false  |
| value        |        | 当前的 index \n`value改变时 只有不同与当前的index才会生效并触发onChage`            |  bool  | false  |
| onChange     |        | tabIndex 改变事件`(event, value)=>{}`, `event`仅当事件触发时会传递                 |  func  |        |
