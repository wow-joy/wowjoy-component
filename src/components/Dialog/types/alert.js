import React from "react";
import { Type1 } from "../../Btn";
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
  <Type1 {...props} styles={`${props.styles} ${styles.btn}`}>
    {props.children}
  </Type1>
);
const initSetting = {
  styles: styles.wrap,
  header: false,
  btns: [Btn],
  btnsText: ["确认"]
};
export default initSetting;
