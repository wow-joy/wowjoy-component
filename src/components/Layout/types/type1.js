const style = `
  &>header{
    background: #06AEA6;
    position: fixed;
    top: 0;
  }
  &>.wj-aside__left {
    width: 230px;
    height: 100vh;
    background: #f4f5f6;
    left:0;
    top: 64px;
    position: fixed;
  }
  &>article {
    margin-top: 76px;
    margin-left: 243px;
    width: calc(100% - 256px);
    min-height: calc(100vh - 76px);
    background: #f4f5f6;
  }
`;
const initSetting = {
  defaultStyles: style,
  header: "顶部",
  asideLeft: "导航",
  main: "内容"
};
export default initSetting;
