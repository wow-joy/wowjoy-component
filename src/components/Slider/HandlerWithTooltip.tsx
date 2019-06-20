import * as React from "react";
import Tooltip from "../../components/Tooltip";
import Handler from "./Handler";

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

  handlerRef: any;
  tootipRef: any;

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

    return (
      <Tooltip
        visible={
          tooltipVisible === undefined ? dragging || clickFocused || visible : tooltipVisible
        }
        placement={tooltipPlacement}
        title={tipFormatter ? tipFormatter(value) : value}
        ref={ref => (this.tootipRef = ref)}
        onVisibleChange={this.handleVisibleChange}
        getContainer={getTooltipPopupContainer}
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
