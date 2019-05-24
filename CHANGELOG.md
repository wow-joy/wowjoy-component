## 3.5.8 (2019/5/24)

### bugfix

- 修改 ts 构建脚本
- 修复 ts 测试用例

## 3.5.0 (2019/5/23)

### feature

- Typescript 迁移

### bugfix

- 修复 Btn Pagination 垂直居中

## 3.4.2 (2019/5/22)

### feature

- ScrollBox 添加 `resize` 事件监听

## 3.4.1 (2019/5/21)

### bugfix

- ScrollBox 优化组件结构
- ScrollBox 修复滚动条出现判断条件

## 3.4.0 (2019/5/21)

### Breaking changes

- ScrollBox 组件重构 api 更新
- Demo 展示逻辑修改

### bugfix

- Btn 组件 props 覆盖问题
- Step 组件低版本浏览器适配
- SwitchControlHoc 修复 ref 传递问题

### todo

- Slider

## 3.3.2 (2019/5/17)

### feature

- 优化 SlideDown 动画效果

## 3.3.1 (2019/5/17)

### feature

- 优化 SlideDown 动画效果
- 增加 SlideDown 下拉按钮修改的 api

## 3.3.0 (2019/5/13)

### feature

- 新增 Tooltip 组件

## 3.2.1 (2019/5/6)

### bugfix

- 修复 svg 依赖引入 bug
- 修改样式

## 3.2.0 (2019/4/30)

### feature

- 新增 Steps 组件
- 新增 Badge 组件

## 3.1.14 (2019/4/28)

### feature

- select 组件 新增 `focus` `blur` 方法
- select 组件 新增 `onFocus` 钩子
- pagination 组件 每页数量选择新增输入框

## 3.1.7 (2019/3/20)

### bugfix

- 修复 layout 的 className 错误
- 修改 layout 的 api 错误

- 修复 message 的 className 错误
- 修改 message 的 onClick 错误

### feature

- 增加 layout 的 test
- 增加 message 的 test

### doc

- 修改 layout 的 文档

## 3.1.6 (2019/3/15)

### bugfix

- 移除固定颜色改为主题配置

## 3.1.3 (2019/3/15)

### bugfix

- 依赖迁移

## 3.1.2 (2019/3/15)

### bugfix

- Tools.Hoc 修复了 className 会携带 undefined 的 bug
- Dialog 修复了 header 类型错误 的 bug

## 3.1.1 (2019/3/15)

### bugfix

- Tools.Hoc 修复了 className 会携带 undefined 的 bug

## 3.1.0 (2019/1/22)

### feature

- Btns,Pagination,Dialog 增加 test
- Table 增加 tr,td className

## 3.0.0 (2018/11/27)

### Breaking changes

- Upgrade `styled-components@4.x` ; (click here to read what changed: https://www.styled-components.com/docs/faqs#what-do-i-need-to-do-to-migrate-to-v4);

### bugfix

- select 组件增加空判断

## 2.6.5 (2018/11/7)

### bugfix

- 修复 table 组件 data 错误

## 2.6.4 (2018/11/6)

### feature

- table 新增 onRowClick 事件

## 2.6.3 (2018/10/31)

### feature

- select 增加 class api

## 2.6.2 (2018/10/19)

### bugfix

- 修复 pagination onChange, pageSize 取值错误

## 2.6.1 (2018/10/17)

### bugfix

- 修复 pagination onChange,onPageSizeChange 的空判断

## 2.6.0 (2018/10/17)

### feature

- rewrite ControllSwitchHoc ,优化命名传递
- 优化 ControllSwitchHoc 改变而引发的命名替换
- pagination 组件增加每页数量改变事件 并允许外设每页数量

### doc

- 更新 pagination 文档

## 2.5.2 (2018/10/10)

### bugfix

- 修复 ScrollBox 样式无法传递

## 2.5.1 (2018/10/9)

### bugfix

- 修复 ScrollBox 样式丢失

## 2.5.0 (2018/10/8)

### feature

- ScrollBox 新增 webkit 优化

## 2.4.10 (2018/9/20)

### bugfix

- 修复 pagination 组件 字段错误

## 2.4.9 (2018/9/20)

### bugfix

- 修复因为 Pop 组件更新而引起的 PopOut 组件异常

## 2.4.8 (2018/9/20)

### bugfix

- 修复因为 Pop 组件更新而引起的 PopOut 组件异常

## 2.4.7 (2018/9/19)

### bugfix

- 修复多个 Pop 组件在同一页面内会引起的动画异常

## 2.4.6 (2018/9/14)

### bugfix

- 修改 Pop 组件的点击事件监听为捕获阶段

## 2.4.5 (2018/9/13)

### feature

- 优化 Pop 组件 Dialog 组件， 增加 classApi

### doc

- Pop 组件 Dialog 组件， 增加 classApi

## 2.4.4 (2018/9/12)

### bugfix

- 修复 popout 动画异常

## 2.4.3 (2018/9/12)

### feature

- 优化 Layout 组件的结构

## 2.4.2 (2018/9/6)

### feature

- 完善 Pagination 组件 classApi
- 优化 Pagination 组件 的部分样式

## 2.4.1 (2018/9/6)

### feature

- 完善 Pagination 组件 classApi

### docs

- 完善 Pagination classApi 文档

## 2.4.0 (2018/9/5)

### feature

- 新增 Pagination 组件
- 优化 Select 组件的控制方式

### bug fix

- 修复 Layout 组件的异常 attrs

### docs

- 新增 Pagination 文档
- 修复 Layout 文档

## 2.3.15 (2018/8/31)

### bug fix

- 修复 SlideDown 组件的.wjc-slieDown-content class 拼写错误

## 2.3.14 (2018/8/30)

### bug fix

- 修复 SlideDown 组件的 onblur 事件不受 value 控制

## 2.3.13 (2018/8/30)

### bug fix

- 修复 SlideDown 组件的 value 不完全控制 bug

## 2.3.12 (2018/8/29)

### bug fix

- clear console.log

## 2.3.11 (2018/8/29)

### feature

- SlideDown 组件增加动画结束事件
- ScrollBox 组件新增 hover 开关, 修改最大高度接口名称

## 2.3.10 (2018/8/27)

### feature

- SlideDown, PopOut 组件增加子菜单点击功能

## 2.3.9 (2018/8/27)

### bug fix

- PopOut 组件增加打开时获得子列表定位的功能

## 2.3.8 (2018/8/27)

### bug fix

- v2.3.7 publish fail

## 2.3.7 (2018/8/27)

### bug fix

- PopOut 空判断添加

## 2.3.6 (2018/8/23)

### bug fix

- PopOut, SlideDown 的错误按钮设计

## 2.3.5 (2018/8/21)

### bug fix

- 修复 ControllSwitchHoc 路径错误

## 2.3.4 (2018/8/21)

### bug fix

- 修复 ControllSwitchHoc 无法调用

## 2.3.3 (2018/8/20)

### bug fix

- 修复 SlideDown 路由跳转进入异常展示

## 2.3.1 (2018/8/17)

### bug fix

- 修复 PopOut 组件初始化动画失效
- 修复 Pop 组件初始化动画失效
- 修复 ControllSwitchHoc 未导出

### docs

- 更新 Pop 组件的文档

## 2.3.0 (2018/8/16)

### bug fix

- 修复 Pop 组件初始化动画失效

### feature

- 新增 ScrollBox 滚动条组件
- 新增 SlideDown 平滑下拉组件
- 新增 PopOut 弹出菜单组件
- 新增 ControllSwitchHoc 高阶函数，根据输入选择返回受控或非受控组件
- 迁移 Pop 组件到 ControllSwitchHoc 管理

### docs

- 更新 pop 组件的文档
- 新增 ScrollBox 组件的文档
- 新增 SlideDown 组件的文档
- 新增 PopOut 组件的文档

## 2.2.2 (2018/8/16)

### bug fix

- 修复 pop 组件设置`layer:flase`时引起得无法点击异常

### docs

- 更新 pop 组件的文档

## 2.2.1 (2018/8/15)

### bug fix

- 修复 pop 组件的遗留分号， 新增 translate 接口 方便定位元素

### docs

- 更新 pop 组件的文档

## 2.2.0 (2018/8/6)

### feature

- 新增 Select 组件

### docs

- 新增 Select 组件的文档

## 2.1.0 (2018/7/31)

### feature

- 新增 Table 组件

### docs

- 新增 Table 组件的文档

## 2.0.1 (2018/7/9)

### bug fix

- 修复 Pop 组件初始化时无法设置为显示

# 2.0.0 (2018/7/9)

<b>因为发生重大破坏性变更 提前升至 2.x</b>

## breaking changes

- 删除 sass-loader, 全面迁移至`styled-components`
- 重构所有 className API, 新增`defaultStyles`字段传递默认样式
- 删除 css-modules
- 重构 pop 方法, 修改组件实现, 删除了动画的接口
- Layout 组件重构, 简化 API, 统一 HOC 实现

### bug fix

- 重构 Btn 组件的`withRouter`Hoc, 仅当 to 属性有值时才会引用 (与 pop 方法冲突))

### feature

- 新增 Pop 组件, 与轻提示的`pop`方法分离, 允许外部可控, 使用`createPortal`实现, 更符合 react 官方文档的实现

### docs

- 修改了所有的文档

## 1.6.1 (2018/6/29)

### refactor

- 更新 svgr 依赖到 `@svgr/webpack@^2.0.0`

## 1.6.0 (2018/6/29)

### feature

- 新增 tabs 组件

### docs

- 新增 tabs 的说明文档

## 1.5.0 (2018/6/20)

### feature

- 新增 form 方法

### docs

- 新增 form 的说明文档

## 1.4.0 (2018/6/13)

### feature

- 新增 dialog 组件

### bug fix

- 修复了初始化脚本的一个引用异常

### refactor

- pop 方法不再接受两个参数，而是直接接受一个实例化的组件作为参数
- Message 组件从 props.content 接收内容，修改为 props.children 接收
- 自动初始化脚本，现在会额外初始化一份 readme.md

### docs

- 修改了上述改动的相应文档
- 修复几个文档的文案异常

## 1.3.3 (2018/6/11)

- 删除了 nwb-sass 包
- 修复 node v10.x 支持

## 1.3.2 (2018/6/11)

- 修复文档错误

## 1.3.1 (2018/6/11)

- 修复文档错误
- 增加 peerDependencies

## 1.3.0 (2018/6/11)

- 新增 pop 方法
- 新增 pubSub 方法
- 新增 Message 组件
- 新增自动初始化组件脚本
- 提取公用 Hoc 方法

TODO: dialog 组件

## 1.1.0 (2018/6/8)

- 新增 btn 组件
- 优化 layout 组件
  - 增加布尔类型支持，允许设置 header,aside,main,footer 为 false 以控制显隐。

## 1.0.0 (2018/6/7)

- 项目初始化
- 新增 Layout 组件
