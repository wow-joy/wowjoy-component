import style from "./confirm.scss";
import React from "react";
import {Type1} from "../../Btn";
const Btn = props =><Type1 {...props} className={`${props.className} ${style.btn}`}>{props.children}</Type1>
const initSetting = {
  className: style.wrap,
  header:false,
  btns: [Btn],
  btnsText: ['确认'],
};
export default initSetting;
