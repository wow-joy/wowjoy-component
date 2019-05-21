import React, { PureComponent } from "react";
import Tooltip from "../../components/Tooltip";
import Handler from "./Handler";

export default class HandlerWithTooltip extends PureComponent {
  state = {
    visible: false,
    clickFocused: false
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      setTimeout(() => {
        this.tooltipRef.setTriggerRect();
      }, 0);
    }
  }

  handleMouseEnter = () => {
    this.setState({ visible: true });
  };

  handleMouseLeave = () => {
    this.setState({ visible: false });
  };

  setHandlerRef = refName => node => {
    this[refName] = node;
  };

  render() {
    const {
      value,
      title,
      className,
      tooltipTitle,
      tipFormatter,
      dragging,
      tooltipVisible,
      ...restProps
    } = this.props;
    const { visible, clickFocused } = this.state;
    return (
      <Tooltip
        visible={tooltipVisible === undefined ? visible || dragging : tooltipVisible}
        title={tipFormatter ? tipFormatter(value) : value}
        forwardRef={this.setHandlerRef("tooltipRef")}
      >
        <Handler
          {...restProps}
          className={`wjc-slider-handler ${className || ""}`}
          handleFocusChange={e => this.setState({ clickFocused: e })}
          ref={this.setHandlerRef("handlerRef")}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        />
      </Tooltip>
    );
  }
}
