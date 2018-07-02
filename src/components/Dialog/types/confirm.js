import React from "react";
import { Type2 } from "../../Btn";
const styles = {
  wrap: `
    width: 300px;
    padding-bottom: 18px;
  `,
  btn: `
    min-width: 90px;
    height: 26px;
    line-height: 26px;
  `
};
const Btn = props => (
  <Type2 {...props} styles={`${props.styles} ${style.btn}`}>
    {props.children}
  </Type2>
);
const initSetting = {
  styles: styles.wrap,
  header: false,
  btns: [Btn, Btn],
  btnsText: ["确认", "取消"]
};
export default initSetting;
