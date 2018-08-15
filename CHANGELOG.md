## 2.2.1 (2018/8/15)

### bug fix

- 修复pop组件的遗留分号， 新增translate接口 方便定位元素

### docs

- 更新pop组件的文档
## 2.2.0 (2018/8/6)

### feature

- 新增Select组件

### docs

- 新增Select组件的文档

## 2.1.0 (2018/7/31)

### feature

- 新增Table组件

### docs

- 新增Table组件的文档


## 2.0.1 (2018/7/9)

### bug fix

- 修复Pop组件初始化时无法设置为显示

# 2.0.0 (2018/7/9)
<b>因为发生重大破坏性变更 提前升至2.x</b>
## breaking changes
- 删除sass-loader, 全面迁移至`styled-components`
- 重构所有className API, 新增`defaultStyles`字段传递默认样式
- 删除css-modules
- 重构pop方法, 修改组件实现, 删除了动画的接口
- Layout 组件重构, 简化API, 统一HOC实现

### bug fix

- 重构Btn组件的`withRouter`Hoc, 仅当to属性有值时才会引用 (与pop方法冲突))

### feature

- 新增Pop组件, 与轻提示的`pop`方法分离, 允许外部可控, 使用`createPortal`实现, 更符合react官方文档的实现

### docs

- 修改了所有的文档


## 1.6.1 (2018/6/29)

### refactor

- 更新svgr依赖到 `@svgr/webpack@^2.0.0`

 
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
