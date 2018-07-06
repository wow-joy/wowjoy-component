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

| 属性          | 描述                                                                |  类型  | 默认值 |
| ------------- | :------------------------------------------------------------------ | :----: | :----: |
| styles        | 顶层样式 class                                                      | string |        |
| defaultStyles | 顶层默认样式                                                        | string |        |
| header        | 页眉。为空时默认不显示（下同）                                      |  node  |        |
| asideLeft     | 左侧导航。 自定义样式时请使用 [postion=left] 作为 css 选择器的标记  |  node  |        |
| main          | 主体内容                                                            |  node  |        |
| asideRight    | 右侧导航。 自定义样式时请使用 [postion=right] 作为 css 选择器的标记 |  node  |        |
| footer        | 页脚                                                                |  node  |        |
