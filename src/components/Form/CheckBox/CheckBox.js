import React, { Component } from "react";
import ControllSwitchHoc from "../../../tools/Hoc/ControllSwitchHoc";
import styled from "styled-components";
const Wrap = styled.span`
  display: inline-block;
  border: 2px solid #b3b3b3;
  width: 16px;
  cursor: pointer;
  height: 16px;
  position: relative;
  ${p => p.defaultStyles};
`;

class CheckBox extends React.PureComponent {
  ClickHandle = e => {
    const { value = "", onChange } = this.props;
    onChange(value && value !== "half-checked" ? "" : true, e);
  };
  getClass = value => {
    if (value === "half-active") {
      return "half-active";
    }
    if (value) {
      return "active";
    }
    return "";
  };
  render() {
    const { defaultStyles, className, value = "" } = this.props;
    return (
      <Wrap
        defaultStyles={defaultStyles}
        className={`${className} ${this.getClass(value)}`}
        onClick={this.ClickHandle}
      />
    );
  }
}

export default ControllSwitchHoc()(CheckBox);
