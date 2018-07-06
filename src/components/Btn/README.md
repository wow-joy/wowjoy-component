# Layout

按钮组件

## 使用

- 基础用法

```
import React from 'react'
import { Btn, Btn_1} from 'wowjoy-component'

const Foo = () => <Btn to={'/list'} > 跳转到list </Btn>
const Foo1 = () => <Btn_1 onClick={()=>console.log(1)} > 点击打印1 </Btn>
```

- Hoc 自定义默认状态

```
// file A
import React from 'react'
import { Btn }  from 'wowjoy-component/lib/components/Btn'
import { Hoc } from 'wowjoy-component/lib/tools'

const setting = {
  defaultStyles: `background: #06aea6;
    color: #fff;
    &:hover{
      background: #1AC3BB;
    }
    &:active{
      background: #3E8A86;
    }`
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

| 属性          | 子属性 | 描述                                                                                                                                                               |   类型   | 默认值 |
| ------------- | ------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------: | :----: |
| className     |        | 顶层样式 class                                                                                                                                                     |  string  |        |
| defaultStyles |        | 顶层默认样式                                                                                                                                                       |  string  |        |
| children      |        | 内容                                                                                                                                                               |   node   |        |
| to            |        | 路由跳转                                                                                                                                                           |  string  |        |
| onClick       |        | 点击事件。 <br>先于路由跳转执行，若要先执行路由跳转后执行点击事件，使用异步方式（_谨慎使用，异步方式不确定性太高_）<br>`return false` 会阻止`to`中设定的路由跳转。 | function |        |
