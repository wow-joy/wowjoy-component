import * as React from "react";
import { CheckCircle } from "@src/components/Icon";
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
        <CheckCircle style={{color: 'red'}} />
        <Space />
      </Wrap>
    );
  }
}

export default Demo;
