import * as React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
interface ButtonProps {
  defaultStyles?: string;
}
const Button = styled.span<ButtonProps>`
  height: 36px;
  padding: 0 20px;
  border: 1px solid transparent;
  font-size: 14px;
  cursor: pointer;
  display: inline-block;
  align-items: center;
  line-height: 36px;
  user-select: none;
  ${props => props.defaultStyles};
`;
export interface BtnBaseProps {
  onClick?: (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => boolean | void;
  to?: string | false;
  history?: { push: (arg0: string) => void };
  defaultStyles?: string;
  className?: string;
}
class BtnBase extends React.PureComponent<BtnBaseProps, {}> {
  clickHandle = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const { onClick, to } = this.props;
    if (onClick && onClick(e) === false) {
      return;
    }
    if (to) {
      this.props.history.push(to);
    }
  };
  render() {
    const { defaultStyles, children, className } = this.props;
    return (
      <Button
        defaultStyles={defaultStyles}
        onClick={this.clickHandle}
        className={"wjc-btn " + className || ""}
      >
        {children}
      </Button>
    );
  }
}

export interface BtnProps extends BtnBaseProps {
  children?: React.ReactNode;
}
class Btn extends React.PureComponent<BtnProps, {}> {
  render() {
    if (this.props.to) {
      const RouteBtn = withRouter(BtnBase as any);
      return <RouteBtn {...this.props} />;
    }
    return <BtnBase {...this.props} />;
  }
}

export default Btn;
