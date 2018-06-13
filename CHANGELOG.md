
## 1.4.0 (2018/6/13)
### feature
- 新增dialog组件 
### bug fix 
- 修复了初始化脚本的一个引用异常
### refactor
- pop方法不再接受两个参数，而是直接接受一个实例化的组件作为参数
- Message组件从props.content接收内容，修改为props.children接收
- 自动初始化脚本，现在会额外初始化一份readme.md
### docs
- 修改了上述改动的相应文档
- 修复几个文档的文案异常

## 1.3.3 (2018/6/11)
- 删除了nwb-sass包
- 修复node v10.x支持

## 1.3.2 (2018/6/11)
- 修复文档错误

## 1.3.1 (2018/6/11)
- 修复文档错误
- 增加peerDependencies

## 1.3.0 (2018/6/11)

- 新增pop方法
- 新增pubSub方法
- 新增Message组件
- 新增自动初始化组件脚本
- 提取公用Hoc方法

TODO: dialog组件


## 1.1.0 (2018/6/8)

- 新增btn组件
- 优化layout组件
    - 增加布尔类型支持，允许设置header,aside,main,footer为false以控制显隐。


## 1.0.0 (2018/6/7)

- 项目初始化
- 新增Layout组件