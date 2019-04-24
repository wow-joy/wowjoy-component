
const initSetting = {
  defaultStyles: `display: flex;
  flex-direction: column;
  &>nav {
    position: relative;
    &::after{
      content: '';
      width: 100%;
      left: 0;
      right: 0;
      position: absolute;
      bottom: 0;
      height: 1px;
      background: #dbdbdb;
    }
    &>span {
      display: inline-block;
      position: relative;
      padding: 16px 30px;
      font-size: 16px;
      text-align: center;
      cursor: pointer;
      &::after {
        display: none;
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        background: #06AEA6;
        height: 3px;
        box-shadow: 0 -1 1px #06AEA6
      }
      &:global(.active){
        &::after{
          display: block;
        }
      }
    }
  }
  &>section{
    background: #f8f8f8;
  }`,
};
export default initSetting;
