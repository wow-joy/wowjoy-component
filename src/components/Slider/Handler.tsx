import * as React from "react";
import styled from "styled-components";

export const StyledHandler = styled.div.attrs<{ positionStyle: React.CSSProperties }>(props => ({
  style: props.positionStyle
}))<{
  className: string;
  vertical: boolean;
  disabledSlider?: boolean;
  tabIndex?: number;
  clickFocused: boolean;
  positionStyle?: React.CSSProperties;
  defaultStyles: string;
}>`
  // position: absolute;
  width: 14px;
  height: 14px;
  background-color: #fff;
  border-radius: 50%;
  cursor: pointer;
  transition: border-color 0.3s, box-shadow 0.6s;
  ${p =>
    p.disabledSlider
      ? `border: 2px solid rgba(0,0,0,0.25);cursor: not-allowed;`
      : `border: 2px solid #91d5ff;`}
  ${p => p.clickFocused && `outline: none; box-shadow:0 0 0 5px rgba(24,144,255,0.2);`}

  &:focus {
    outline: none;
    box-shadow: 0 0 0 5px rgba(24, 144, 255, 0.2);
  }
  ${p => p.defaultStyles}
`;

interface Props {
  className?: string;
  vertical?: boolean;
  disabled?: boolean;
  tabIndex?: number;
  dragging: boolean;
  handleFocusChange?: (visible: boolean) => void;
  style?: React.CSSProperties;
  positionStyle?: React.CSSProperties;
  handlerStyle?: string;
}

class Handler extends React.PureComponent<Props, { clickFocused: boolean }> {
  state = {
    clickFocused: false
  };
  handlerNode: HTMLDivElement;
  componentDidMount() {
    document.addEventListener("mouseup", this.handleMouseUp);
  }

  componentWillUnmount() {
    document.removeEventListener("mouseup", this.handleMouseUp);
  }

  setClickFocus(focused: boolean) {
    this.setState({ clickFocused: focused });
    this.props.handleFocusChange && this.props.handleFocusChange(focused);
  }

  handleMouseUp = () => {
    this.setClickFocus(document.activeElement === this.handlerNode);
  };

  handleMouseDown = () => {
    this.clickFocus();
  };

  handleBlur = () => {
    this.setClickFocus(false);
  };

  handleKeyDown = () => {
    this.setClickFocus(false);
  };

  clickFocus = () => {
    this.setClickFocus(true);
    this.focus();
  };

  clickBlur = () => {
    this.setClickFocus(false);
    this.blur();
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
      disabled,
      tabIndex,
      positionStyle,
      handlerStyle,
      style
    } = this.props;
    const { clickFocused } = this.state;

    let _tabIndex = tabIndex || 0;
    if (disabled || tabIndex === null) {
      _tabIndex = null;
    }

    return (
      <StyledHandler
        ref={ref => (this.handlerNode = ref)}
        // onBlur={this.handleBlur}
        defaultStyles={handlerStyle}
        onMouseDown={this.handleMouseDown}
        {...{
          className,
          style,
          positionStyle,
          clickFocused,
          vertical,
          disabledSlider: disabled,
          ...(disabled ? {} : { tabIndex: _tabIndex })
        }}
      />
    );
  }
}

export default Handler;
