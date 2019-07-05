import * as React from "react";
import { SimpleTooltip as Tooltip } from "../../components/Tooltip";
import Handler, { StyledHandler } from "./Handler";

interface Props {
  value: number;
  className: string;
  dragging: boolean;
  vertical: boolean;
  offset: number;
  tooltipVisible: boolean;
  tooltipPlacement: string;
  tipFormatter: (value: number) => React.ReactNode;
  getTooltipPopupContainer: () => HTMLElement;
  disabled: boolean;
}

interface State {
  visible: boolean;
  clickFocused: boolean;
}

export default class HandlerWithTooltip extends React.PureComponent<Props, State> {
  state = {
    visible: false,
    clickFocused: false
  };

  handlerRef: Handler;

  handleVisibleChange = (visible: boolean) => {
    this.setState({ visible });
  };

  render() {
    const {
      value,
      className,
      tipFormatter,
      dragging,
      tooltipVisible,
      tooltipPlacement,
      getTooltipPopupContainer,
      offset,
      vertical,
      disabled
    } = this.props;
    const { visible, clickFocused } = this.state;
    const positionStyle = vertical ? { bottom: `${offset}%` } : { left: `${offset}%` };

    return (
      <Tooltip
        visible={
          tooltipVisible === undefined ? dragging || clickFocused || visible : tooltipVisible
        }
        placement={tooltipPlacement}
        title={tipFormatter ? tipFormatter(value) : value}
        onVisibleChange={this.handleVisibleChange}
        getContainer={getTooltipPopupContainer}
        style={{ ...positionStyle, position: "absolute" }}
        className={"wjc-slider-tooltip-handler"}
        defaultStyles={
          vertical
            ? `margin-left: -5px;margin-bottom: -7px;`
            : `margin-top: -5px;margin-left: -7px;`
        }
        arrowMargin={6}
      >
        <Handler
          {...{ className, vertical, offset, dragging, disabled }}
          handleFocusChange={(visible: boolean) => this.setState({ clickFocused: visible })}
          ref={ref => (this.handlerRef = ref)}
        />
      </Tooltip>
    );
  }
}
