const style = {
  header: `
    background: #06AEA6;
    position: fixed;
    top: 0;
  `,
  asideLeft: `
    width: 180px;
    height: 100vh;
    background: #f4f5f6;
    left:0;
    top: 64px;
    position: fixed;
  `,
  asideRight: `
    width: 180px;
    height: 100vh;
    background: #f4f5f6;
    right:0;
    top: 64px;
    position: fixed;
  `,
  main: `
    margin-top: 64px;
    margin-left: 201px;
    width: calc(100% - 402px);
    min-height: calc(100vh - 64px);
    background: #f4f5f6;
  `
};
const initSetting = {
  header: {
    styles: style.header,
    content: "顶部"
  },
  asideLeft: {
    styles: style.asideLeft,
    content: "导航"
  },
  main: {
    styles: style.main,
    content: "内容"
  },
  asideRight: {
    styles: style.asideRight,
    content: "电梯导航"
  }
};
export default initSetting;
