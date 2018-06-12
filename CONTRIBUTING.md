## 前提

[Node.js](http://nodejs.org/) >= v8.x

## 安装 

- `git clone git@github.com:wow-joy/wowjoy-component.git`
- `npm install` or  `yarn`

## Demo 开发

- `npm start` 启动一个热重载站点运行在 [http://localhost:3000](http://localhost:3000)
- `npm run create -- [name]` 自动初始化一个名为`[name]`的组件
## 测试
**测试功能暂未完善**
- `npm test` will run the tests once.

- `npm run test:coverage` will run the tests and produce a coverage report in `coverage/`.

- `npm run test:watch` will run the tests on every change.

## 构建

- `npm run build` 构建发布到NPM的组件。

- `npm run clean` 删除已构建资源.

## 发布
- `npm publish` 发布到npm

## 项目结构
```
WOWJOY-COMPONENT
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── .travis.yml
├── .CONTRIBUTING.md
├── .nwb.config.js
├── demo    // 组件展示目录
│   ├── src
|   |   ├── index.js
|   |   ├── Home
|   |   ├── List
│   |   └── Detail
│   └── dist     // 压缩打包构建目录
├── es      // es5打包构建目录
├── lib     // es6打包构建目录
├── tests
└── src     // 组件开发目录
    ├── media   // 静态资源库
    ├── tools   // 工具函数库
    └── components  // 组件库
```
## 开发说明
- `src/components` 目录下编写组件
- 注册到 `src/index.js`
- 启动项目后，在 http://localhost:3000/detail/[name] 可以查看到组件实例 name为编写的组件名
- 在 `demo/src/Detail/index.js` 上修改组件的props查看运行效果

## 规范
- 纯组件编写尽量使用 `PureComponent`
- 请注意添加 `PropType` 检测 `props` 的数据类型
- 组件编写完后，尽可能添加 `README.md`
- 单个组件长度不应该超过500行， 请注意组件拆分
- 无硬性兼容需求，不使用iconfon，使用svg作为替代方案  
- 含有内嵌children， 或是props有传递DOM node的组件，css样式，禁止使用tagname的后代选择器，请使用子元素选择器进行替代。


## 注意事项
- 新增开发依赖， 请添加到 `devDependencies` 字段内
- 暂未添加less支持
