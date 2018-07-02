const style = {
  header: `
    background: #06AEA6;
    position: fixed;
    top: 0;
  `,
  asideLeft: `
    width: 230px;
    height: 100vh;
    background: #f4f5f6;
    left:0;
    top: 64px;
    position: fixed;
  `,
  main: `
    margin-top: 76px;
    margin-left: 243px;
    width: calc(100% - 256px);
    min-height: calc(100vh - 76px);
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
  }
};
export default initSetting;
