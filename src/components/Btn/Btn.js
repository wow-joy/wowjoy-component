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
  ${props=>props.styles}
`;
class Btn extends PureComponent {
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
    const { styles, children, className } = this.props;
    return (
      <Button styles={styles} onClick={this.clickHandle} className={className}>
        {children}
      </Button>
    );
  }
}

Btn.propTypes = {
  className: PropTypes.string,
  styles: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
  to: PropTypes.string
};
export default withRouter(Btn);
