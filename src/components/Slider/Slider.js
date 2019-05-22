import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ControllSwitchHoc from "../../tools/Hoc/ControllSwitchHoc";
import Tooltip from "../../components/Tooltip";
import Handler from "./Handler";
import {
  getMousePosition,
  getHandleCenterPosition,
  getClosestPoint,
  ensureValueInRange
} from "./utils";

const COLOR = "#91d5ff";
const DISABLED_COLOR = "rgba(0,0,0,0.25)";

const Rail = styled.div`
  position: absolute;
  width: 100%;
  height: 4px;
  background-color: #f5f5f5;
  border-radius: 2px;
  transition: background-color 0.3s;
  left: 0%;
`;
const Track = styled.div`
  position: absolute;
  height: 4px;
  border-radius: 4px;
  transition: background-color 0.3s ease;
`;
const Ruler = styled.div`
  position: absolute;
  width: 100%;
  height: 4px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    transparent 99%,
    red 99%,
    red 100%
  );
  background-size: ${p => p.frame};
`;

const Wrap = styled.div`
  margin-bottom: 50px;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  line-height: 1.5;
  list-style: none;
  position: relative;
  height: 12px;
  margin: 14px 6px 80px; // TODO: 后面变回14px 6px 10px
  padding: 4px 0;
  cursor: pointer;
  touch-action: none;
  width: 600px;
  margin-left: 200px;

  &:hover {
    ${Rail} {
      background-color: #e1e1e1;
    }
  }

  ${Track} {
    width: ${p => p.offset}%;
    background-color: ${p => (p.disabled ? DISABLED_COLOR : COLOR)};
  }

  ${props => props.defaultStyles};
`;

class Slider extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dragging: false
    };
  }

  sliderRef;
  tooltipRef;
  componentDidMount() {
    this.addDocumentEvent();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      setTimeout(() => {
        this.tooltipRef && this.tooltipRef.setTriggerRect();
      }, 0);
    }
  }

  componentWillUnmount() {
    this.removeDocumentEvent();
  }

  addDocumentEvent() {
    document.addEventListener("mouseup", this.onEnd, false);
    document.addEventListener("mousemove", this.onMove, false);
  }

  removeDocumentEvent() {
    document.removeEventListener("mousemove", this.onMove, false);
    document.removeEventListener("mouseup", this.onEnd, false);
  }

  get sliderLength() {
    if (!this.sliderRef) {
      return 0;
    }
    const rect = this.sliderRef.getBoundingClientRect();
    return this.props.vertical ? rect.height : rect.width;
  }

  get sliderStart() {
    if (!this.sliderRef) {
      return 0;
    }
    const rect = this.sliderRef.getBoundingClientRect();
    return this.props.vertical ? rect.top : rect.left + window.pageXOffset;
  }

  get value() {
    const { value, min, max } = this.props;
    return ensureValueInRange(value, { min, max });
  }

  get offset() {
    const { value, max } = this.props;
    return (this.value / max) * 100;
  }

  calcValue(offset) {
    const { vertical, min, max } = this.props;
    const ratio = Math.abs(Math.max(offset, 0) / this.sliderLength);
    const value = vertical
      ? (1 - ratio) * (max - min) + min
      : ratio * (max - min) + min;
    return value;
  }

  calcValueByPos(position) {
    const { min, max } = this.props;
    const offset = position - this.sliderStart;
    const value = ensureValueInRange(this.calcValue(offset), { min, max });
    return value;
  }

  onMouseDown = e => {
    const { value, step, min, max, onChange, vertical } = this.props;
    let position = getMousePosition(e, vertical);
    if (false) {
      // 点击在滑动块上需要重新获取滑动块中心点位置，因为鼠标不一定直接点在中心点
      // TODO: 后面可能需要用到这个drageOffset
      const handlePosition = getHandleCenterPosition(e.target, vertical);
      console.log({ handlePosition, position });
      this.dragOffset = position - handlePosition;
      position = handlePosition;
    } else {
      // 点在轴上
      this.dragOffset = 0;
    }

    let newValue = this.calcValueByPos(position);
    newValue = getClosestPoint(newValue, { step, min, max });

    // ----------------------
    this.setState({ dragging: true });
    if (value !== newValue) {
      onChange && onChange(newValue);
    }
  };

  onMove = e => {
    if (this.props.disabled || !this.state.dragging) return;
    const { sliderLength, sliderStart } = this;
    const handlerOffset = getMousePosition(e, this.props.vertical);


    if (
      handlerOffset < sliderStart ||
      handlerOffset > sliderStart + sliderLength
    ) {
      console.log(handlerOffset, sliderStart, sliderLength);
      return;
    }
    const { step, min, max } = this.props;
    const currentValue = ((handlerOffset - sliderStart) / sliderLength) * max;
    const closestValue = getClosestPoint(currentValue, { step, min, max });
    if (closestValue !== this.value) {
      this.props.onChange && this.props.onChange(closestValue);
    }
  };

  onEnd = e => {
    this.setState({ dragging: false });
  };

  getHandler = () => {
    const { tipFormatter, vertical, min, max, value } = this.props;
    if (tipFormatter === null) {
      return (
        <Handler
          className={`wjc-slider-handler`}
          {...{ vertical, min, max, value, offset: this.offset }}
        />
      );
    } else {
      return (
        <Tooltip
          visible
          ref={ref => (this.tooltipRef = ref)}
          title={tipFormatter ? tipFormatter(this.value) : this.value}
        >
          <Handler {...{ vertical, min, max, value, offset: this.offset }} />
        </Tooltip>
      );
    }
  };

  render() {
    const {
      children,
      className,
      defaultStyles,
      value = 0,
      min,
      max,
      step,
      disabled
    } = this.props;
    return (
      <Wrap
        ref={ref => (this.sliderRef = ref)}
        defaultStyles={defaultStyles}
        className={className}
        onMouseDown={this.onMouseDown}
        offset={this.offset}
        disabled={disabled}
      >
        <Rail className={`wjc-slider-rail`} />
        <Track className={`wjc-slider-track`} />
        <Ruler
          className={`wjc-slider-ruler`}
          frame={`${(step / max) * 100}%`}
        />
        {this.getHandler()}
        {children}
      </Wrap>
    );
  }
}

Slider.defaultProps = {
  defaultValue: 0,
  min: 0,
  max: 100,
  step: 1,
  disabled: false,
  vertical: false
};
Slider.propTypes = {
  className: PropTypes.string,
  defaultStyles: PropTypes.string,
  tipFormatter: PropTypes.func
};
export default ControllSwitchHoc({
  value: "value",
  defaultValue: "defaultValue"
})(Slider);
