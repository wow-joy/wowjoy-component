# Dialog

对话框组件

_建议结合 `pop` 工具使用_ [https://github.com/wow-joy/wowjoy-component/tree/master/src/tools/pop]

## 使用

- 基础用法

```
import React from 'react'
import Btn, { Btn_1} from 'wowjoy-component'
/* import { Type1 as Btn } from 'wowjoy-component/lib/components/Btn' */  // 按需加载

const Foo = () => <Btn to={'/list'} > 跳转到list </Btn>
const Foo1 = () => <Btn_1 onClick={()=>console.log(1)} > 点击打印1 </Btn>
```

- Hoc 自定义默认状态

```
// file A
import React from 'react'
import Btn, { Hoc } from 'wowjoy-component/lib/components/Btn'
import style from './style.scss'

const setting = {
  className: style.btn,
}

const A = () => Hoc(setting)(Btn)

//输出A为默认配置
export default A
```

```
// file B
import React from 'react'
import A from './A.js'

const B=()=><A onClick={()=>alert(1)}>点击alert1</A>
```

## APIs

| 属性         | 子属性 | 描述                                                                                                                                                                                                                         |      类型      |      默认值      |
| ------------ | ------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------: | :--------------: |
| className    |        | 顶层样式 class                                                                                                                                                                                                               |     string     |                  |
| header       |        | 标题组件渲染函数: 例如 ()=><Foo\><\/Foo> ;<br/> 当值为`false`时不显示标题;为空时显示默认标题                                                                                                                                 | func \|\| bool |                  |
| headerText   |        | 标题文本                                                                                                                                                                                                                     |     string     |                  |
| children     |        | 组件包裹内容                                                                                                                                                                                                                 |      node      |                  |
| btns         |        | 按钮节点数组, 请在数组中传递 function 而不是已经实例化的组件:<br/> 例如 [ props =><Foo {...props}>{props.children}<\/Foo>] props 可以拿到默认设定的`onClick`, `className`<br/>与`Btn`组件结合使用，可以直接传入[Btn_1,Btn_2] |     array      |                  |
| btnsText     |        | 按钮文案数组: 数组个数控制按钮数量                                                                                                                                                                                           |     array      | ["提交", "取消"] |
| onClick      |        | 点击事件。包含组件内除关闭按钮外的所有按钮。 接受两个参数`(event,index)`<br/> `event`: 点击事件<br/>`index`: 被点击按钮的下标<br/> `return false`可以阻止组件被关闭                                                           |      func      |                  |
| showCloseBtn |        | 是否显示关闭按钮                                                                                                                                                                                                             |      bool      |       true       |
