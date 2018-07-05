import React from "react";
import { Type1 } from "../../Btn";
import styled from "styled-components";

const Btn = styled(Type1)`
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
  btns: [Btn],
  btnsText: ["确认"]
};
export default initSetting;
