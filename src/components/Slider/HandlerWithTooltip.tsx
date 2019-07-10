import * as React from "react";
import { SimpleTooltip as Tooltip } from "../../components/Tooltip";
import Handler, { StyledHandler } from "./Handler";

interface Props {
  value: number;
  className: string;
  dragging: boolean;
  vertical: boolean;
  tooltipVisible: boolean;
  tooltipPlacement: string;
  tipFormatter: (value: number) => React.ReactNode;
  getTooltipPopupContainer: () => HTMLElement;
  disabled: boolean;
  positionStyle: React.CSSProperties;
  handlerStyle: string;
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
      vertical,
      disabled,
      positionStyle,
      handlerStyle
    } = this.props;
    const { visible, clickFocused } = this.state;

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
        defaultStyles={handlerStyle}
        arrowMargin={6}
      >
        <Handler
          {...{ className, vertical, dragging, disabled }}
          handleFocusChange={(visible: boolean) => this.setState({ clickFocused: visible })}
          ref={ref => (this.handlerRef = ref)}
        />
      </Tooltip>
    );
  }
}
