import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

const Button = styled.span`
  height: 36px;
  padding: 0 20px;
  border: 1px solid transparent;
  font-size: 14px;
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
  line-height: 36px;
  user-select: none;
  ${props => props.defaultStyles};
`;
class BtnBase extends PureComponent {
  clickHandle = e => {
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
class Btn extends PureComponent {
  render() {
    if (this.props.to) {
      const RouteBtn = withRouter(BtnBase);
      return <RouteBtn {...this.props} />;
    }
    return <BtnBase {...this.props} />;
  }
}
Btn.propTypes = {
  className: PropTypes.string,
  defaultStyles: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
  to: PropTypes.string
};
export default Btn;
