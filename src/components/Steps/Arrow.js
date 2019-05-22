import React, { PureComponent } from "react";
import styled from "styled-components";

const statusStyles = {
  finish: {
    color: "#fff",
    backgroundColor: "#28BEA3"
  },
  process: {
    color: "#fff",
    backgroundColor: "#28BEA3"
  },
  wait: {
    color: "rgba(0, 0, 0, 0.25)",
    backgroundColor: "#68D1BE"
  }
};

const Wrap = styled.div`
  height: 30px;
  color: #fff;
  background-color: ${props => props.currentColor};
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-left: -15px;
  overflow: hidden;
  transition: background-color 0.3s, border-color 0.3s;
  &:not(:last-child) {
    &::before {
      content: "";
      display: block;
      width: 30px;
      height: 30px;
      transform: rotate(45deg);
      position: absolute;
      right: 8px;
      top: 0;
      z-index: 2;
      background-color: ${props => props.currentColor};
      transition: inherit;
    }

    &::after {
      content: "";
      display: block;
      width: 30px;
      height: 30px;
      transform: rotate(45deg);
      position: absolute;
      right: 6px;
      top: 0;
      z-index: 1;
      background-color: #fff;
      transition: inherit;
    }
  }
`;

class Arrow extends PureComponent {
  render() {
    const {
      defaultStyles,
      className,
      description,
      color,
      current,
      status
    } = this.props;
    return (
      <Wrap
        defaultStyles={defaultStyles}
        className={`wjc-steps-item wjc-steps-${status} wjc-steps-arrow ${className ||
          ""}  ${current ? "current" : ""}`}
        currentColor={color || statusStyles[status].backgroundColor}
      >
        {description}
      </Wrap>
    );
  }
}

export default Arrow;
