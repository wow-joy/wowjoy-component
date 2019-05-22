# Badge

Badge 组件

## 使用

-基础用法

```
import React from 'react';
import {Badge} from 'wowjoy-component';

const Foo=()=><Badge />
```

## APIs

|     属性      |                                  描述                                  |                          类型                           | 默认值 |
| :-----------: | :--------------------------------------------------------------------: | :-----------------------------------------------------: | :----: |
|   className   |                             顶层样式 class                             |                         string                          |        |
| defaultStyles |                              顶层默认样式                              |                         string                          |        |
|   children    |                                  内容                                  |                          node                           |        |
|     color     |                    自定义小圆点的颜色 string-3.16.0                    |
|     count     | 展示的数字，大于 overflowCount 时显示为\${overflowCount}+，为 0 时隐藏 |                         number                          |   -    |
|      dot      |                       不展示数字，只有一个小红点                       |                         boolean                         | false  |
|    offset     |                   设置状态点的位置偏移，格式为[x,y]                    |                     [number,number]                     |   -    |
| overflowCount |                            展示封顶的数字值                            |                         number                          |   99   |
|   showZero    |                     当数值为 0 时，是否展示 Badge                      |                         boolean                         | false  |
|    status     |                          设置 Badge 为状态点                           | Enum{'success','processing,'default','error','warning'} |   ''   |
|     text      |             在设置了 status 的前提下有效，设置状态点的文本             |                         string                          |   ''   |
| title [TODO]  |                    设置鼠标放在状态点上时显示的文字                    |                         string                          | count  |
