import React, { PureComponent } from "react";
import styled from "styled-components";

const StyledHandler = styled.div`
  position: absolute;
  ${p =>
    p.vertical ? `margin-left: -5px;margin-bottom: -7px;` : `margin-top: -5px;margin-left:-7px;`}
  width: 14px;
  height: 14px;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0;
  cursor: pointer;
  transition: border-color 0.3s, box-shadow 0.6s;
  ${p =>
    p.disabled
      ? `border: 2px solid rgba(0,0,0,0.25);cursor: not-allowed;`
      : `border: 2px solid #91d5ff;`}
  ${p => p.clickFocused && `outline: none; box-shadow:0 0 0 5px rgba(24,144,255,0.2);`}

  &:focus {
    outline: none;
    box-shadow: 0 0 0 5px rgba(24, 144, 255, 0.2);
  }
`;

class Handler extends PureComponent {
  state = {
    clickFocused: false
  };

  componentDidMount() {
    document.addEventListener("mouseup", this.handleMouseUp);
  }

  componentWillUnmount() {
    document.removeEventListener("mouseup", this.handleMouseUp);
  }

  setHandleRef = node => {
    this.handlerNode = node;
  };

  setClickFocus(focused) {
    this.setState({ clickFocused: focused });
    this.props.handleFocusChange && this.props.handleFocusChange(focused);
  }

  handleMouseUp = () => {
    if (document.activeElement === this.handlerNode) {
      this.setClickFocus(true);
    } else {
      this.setClickFocus(false);
    }
  };

  handleMouseDown = () => {
    this.clickFocus();
  };

  handleBlur = () => {
    this.props.dragging && this.setClickFocus(false);
  };

  handleKeyDown = () => {
    this.setClickFocus(false);
  };

  clickFocus = () => {
    this.setClickFocus(true);
    this.focus();
  };

  focus() {
    this.handlerNode.focus();
  }

  blur() {
    !this.props.dragging && this.handlerNode.blur();
  }

  render() {
    const {
      className,
      vertical,
      offset,
      disabled,
      min,
      max,
      value,
      tabIndex,
      dragging,
      ...restProps
    } = this.props;
    const { clickFocused } = this.state;

    let _tabIndex = tabIndex || 0;
    if (disabled || tabIndex === null) {
      _tabIndex = null;
    }

    const postionStyle = vertical ? { bottom: `${offset}%` } : { left: `${offset}%` };
    return (
      <StyledHandler
        className={`wjc-slider-handler ${className || ""}`}
        ref={this.setHandleRef}
        tabIndex={_tabIndex}
        onBlur={this.handleBlur}
        onMouseDown={this.handleMouseDown}
        style={postionStyle}
        {...{
          vertical,
          clickFocused,
          ...restProps
        }}
      />
    );
  }
}

export default Handler;
