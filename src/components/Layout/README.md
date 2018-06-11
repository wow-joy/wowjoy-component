# Layout

基础布局框架

## 使用

- 基础用法

```
import React from 'react'
import { Layout_1 as Layout } from 'wowjoy-component'
/* import { Type1 as Layout } from 'wowjoy-component/lib/components/Layout' */  // 按需加载

const Foo = () => <Layout />
```

- Hoc 自定义默认状态

```
// file A
import React from 'react'
import Layout, { Hoc } from 'wowjoy-component/lib/components/Layout'
import style from './style.scss'

const setting = {
    header: {
        className: style.header,
        content: 2
    }
}

const A = () => Hoc(setting)(Layout)

//输出A为默认配置
export default A
```
```
// file B
import React from 'react'
import A from './A.js'

const B=()=><A header={{content: <span>2</span> }}/>
```

## APIs

| 属性 | 子属性 | 描述 | 类型 | 默认值 | 
| - | - | :- | :-: | :-: | 
| className | | 顶层样式class | string | |
| header | | 页眉。为空时默认不显示（下同）| object | |
|   | className | 样式 | string | |
|   | content | 内容 | node | |
| asideLeft | | 左侧导航 | object | |
|   | className | 样式 | string | |
|   | content | 内容 | node | |
| main | | 主体内容 | object | |
|   | className | 样式 | string | |
|   | content | 内容 | node | |
| asideRight | | 右侧导航 | object | |
|   | className | 样式 | string | |
|   | content | 内容 | node | |
| footer | | 页脚 | object | |
|   | className | 样式 | string | |
|   | content | 内容 | node | |

