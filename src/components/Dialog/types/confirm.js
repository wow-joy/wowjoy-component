import style from "./confirm.scss";
import React from "react";
import {Type2} from "../../Btn";
const Btn = props =><Type2 {...props} className={`${props.className} ${style.btn}`}>{props.children}</Type2>
const initSetting = {
  className: style.wrap,
  header:false,
  btns: [Btn, Btn],
  btnsText: ['确认', '取消'],
};
export default initSetting;
