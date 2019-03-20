# Layout

基础布局框架

## 使用

- 基础用法

```
import React from 'react'
import { Layout_1 as Layout } from 'wowjoy-component'

const Foo = () => <Layout />
```

- Hoc 自定义默认状态

```
// file A
import React from 'react'
import { Layout } from 'wowjoy-component/'
import { Hoc } from 'wowjoy-component/lib/tools'

const setting = {
    header: {
        styles: style.header,
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

| 属性          | 描述                           |  类型  | 默认值 |
| ------------- | :----------------------------- | :----: | :----: |
| styles        | 顶层样式 class                 | string |        |
| defaultStyles | 顶层默认样式                   | string |        |
| header        | 页眉。为空时默认不显示（下同） |  node  |        |
| asideLeft     | 左侧导航。                     |  node  |        |
| children      | 主体内容                       |  node  |        |
| asideRight    | 右侧导航。                     |  node  |        |
| footer        | 页脚                           |  node  |        |

## classApi

| class                     | 描述     |
| ------------------------- | :------- |
| wjc-layout                | 主体     |
| wjc-layout-header         | 顶部     |
| wjc-layout-center         | 内容区域 |
| wjc-layout-aside\_\_left  | 左侧导航 |
| wjc-layout-aside\_\_right | 右侧导航 |
| wjc-layout-footer         | 页脚     |
