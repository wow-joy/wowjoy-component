import * as React from "react";
import { Badge } from "@src";
import styled from "styled-components";

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
  render() {
    return (
      <Wrap>
        <Badge count={100}>
          <A href="#" />
        </Badge>
        <Space />
        <Badge dot>
          <A href="#" />
        </Badge>
        <Space />
        <Badge dot />
        <Space />
        <Badge status="success" />
        <Badge status="error" />
      </Wrap>
    );
  }
}

export default Demo;
