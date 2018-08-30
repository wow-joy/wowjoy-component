# ScrollBox

ScrollBox 组件

## 使用

- 基础用法

```
import React from 'react'
import { ScrollBox } from 'wowjoy-component'

const Foo = () => <ScrollBox>这里是要滚动的内容</ScrollBox>
```

## APIs

| 属性          | 描述                                                                                   |  类型  | 默认值 |
| ------------- | :------------------------------------------------------------------------------------- | :----: | :----: |
| className     | 顶层样式 class                                                                         | string |        |
| defaultStyles | 顶层默认样式                                                                           | string |        |
| children      | 内容                                                                                   |  node  |        |
| maxHeight     | 最大高度 <br>                                                                          | string |  '300px'   |
| hoverControl  | 是否 hover 才显示滚动条                                                                |  bool  | false  |
| visible       | 是否可见，因为需要获取内容高度，当父组件改变 `display:'none' | other`时， 请传递该参数 |  bool  |        |

## Pointer

当内容元素实时更新时 请考虑 forseUpdate 更新 scrollBox 所在的组件。 暂未想到监听实时内容高度变化的方案。

## TODO

- 增加支持横向滚动
