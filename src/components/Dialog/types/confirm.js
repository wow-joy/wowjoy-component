import React from "react";
import { Type2 } from "../../Btn";
import styled from "styled-components";

const Btn = styled(Type2)`
  min-width: 90px;
  height: 26px;
  line-height: 26px;
`;
const initSetting = {
  defaultStyles: `
  width: 300px;
  padding-bottom: 18px;
`,
  header: false,
  btns: [Btn, Btn],
  btnsText: ["确认", "取消"]
};
export default initSetting;
