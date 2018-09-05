const style = `
  &>header{
    background: #06AEA6;
    position: fixed;
    top: 0;
  }
  &>.wj-aside__left{
    width: 180px;
    height: 100vh;
    background: #f4f5f6;
    left:0;
    top: 64px;
    position: fixed;
  }
  &>.wj-aside__right{
    width: 180px;
    height: 100vh;
    background: #f4f5f6;
    right:0;
    top: 64px;
    position: fixed;
  }
  &>article{
    margin-top: 64px;
    margin-left: 201px;
    width: calc(100% - 402px);
    min-height: calc(100vh - 64px);
    background: #f4f5f6;
  }`;

const initSetting = {
  defaultStyles: style,
  header: "顶部",
  asideLeft: "导航",
  main: "内容",
  asideRight: "电梯导航"
};
export default initSetting;
