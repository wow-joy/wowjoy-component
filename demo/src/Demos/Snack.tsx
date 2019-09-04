import * as React from "react";
import { Btn_1 } from "@src";
import { Snack } from "@src";
import { SnackType } from "@src/components/Snack/Snack";
import styled from "styled-components";

Snack.config({
  top: 500,
  duration: 1000
})

const Wrap = styled.div`
  margin: 40px;
`;
const A = styled.a`
  width: 42px;
  height: 42px;
  border-radius: 4px;
  background: #eee;
  display: inline-block;
  vertical-align: middle;
`;
const Space = styled.span`
  display: inline-block;
  margin: 0 10px;
`;

class Demo extends React.PureComponent {
  handleClick = (type: SnackType) => () => {
    Snack[type](type);
  };
  render() {
    return (
      <Wrap>
        <Btn_1 onClick={this.handleClick("success")}>success</Btn_1>
        <Space />
        <Btn_1 onClick={this.handleClick("error")}>error</Btn_1>
      </Wrap>
    );
  }
}

export default Demo;
