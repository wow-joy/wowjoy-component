# Pop

Pop 组件

## 使用

- 基础用法

```
import React from 'react'
import { Pop, Dialog } from 'wowjoy-component'

const Foo = () => <Pop>
    <Dialog></Dialog>
</Pop>
```

## APIs

| 属性          | 描述                                                                                                                                       |     类型     |    默认值     |
| ------------- | :----------------------------------------------------------------------------------------------------------------------------------------- | :----------: | :-----------: |
| className     | 顶层样式 class                                                                                                                             |    string    |               |
| defaultStyles | 顶层默认样式                                                                                                                               |    string    |               |
| children      | 被弹出内容                                                                                                                                 |     node     |               |
| visible       | 是否可见                                                                                                                                   |     bool     |               |
| container     | 弹出到的目标 Dom<br> 特殊说明：若目标 dom 在当前组件内且发生首次动画异常，请在`componentDidMount`后更新此属性，因为初始化时 dom 尚未被挂载 |   DomNode    | document.body |
| layer         | 是否显示覆盖灰层                                                                                                                           |     bool     |     true      |
| onClose       | 灰层点击回调， return false 会阻止关闭。                                                                                                   |     func     |               |
| autoClose     | 自动关闭时间                                                                                                                               | number, bool |     false     |
| translate     | 内容弹出定位;其余样式请使用 css 选择器修改; example: `translate(0,0)`                                                                      |    string    |               |
