import * as React from "react";
import { Btn } from "@src";
import { Snack } from "@src";
import { SnackType } from "@src/components/Snack/Snack";
import styled from "styled-components";

Snack.config({
  top: 500,
  duration: 1000
});

const Wrap = styled.div`
  margin: 40px;
`;

const Space = styled.span`
  display: inline-block;
  margin: 0 10px;
`;
const Button = styled(Btn)<{ bgColor?: string }>`
  color: #fff;
  background: ${p => p.bgColor || "#06aea6"};
`;

class Demo extends React.PureComponent {
  handleClick = (type: SnackType) => () => {
    Snack[type](type, 5000).then(res => {
      console.log(res);
    });
  };
  handleBeforeClick = () => {
    Snack.info("set 5000, close 2000", 5000).then((res: any) => {
      setTimeout(res.props.onClose, 2000);
    });
  };
  destroy = () => {
    Snack.destroy();
  };
  render() {
    return (
      <Wrap>
        <Button bgColor="#3ac9a8" onClick={this.handleClick("success")}>
          success
        </Button>
        <Space />
        <Button bgColor="#f36969" onClick={this.handleClick("error")}>
          error
        </Button>
        <Space />
        <Button bgColor="#45a8e6" onClick={this.handleClick("info")}>
          info
        </Button>
        <Space />
        <Button bgColor="#ff9b54" onClick={this.handleClick("warning")}>
          warning
        </Button>
        <Space />
        <Button bgColor="#ff9b54" onClick={this.handleBeforeClick}>
          this can close before!
        </Button>
        <Space />
        <Button onClick={this.destroy}>destroy</Button>
      </Wrap>
    );
  }
}

export default Demo;
