import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ControllSwitchHoc from "./ControllSwitchHoc";
import Handler from "./Handler";
import Track from "./Track";
import HandlerWithTooltip from "./HandlerWithTooltip";
import {
  getMousePosition,
  getHandleCenterPosition,
  getClosestPoint,
  ensureValueInRange,
  isEventFromHandler
} from "./utils";

const Rail = styled.div`
  position: absolute;
  background-color: #f5f5f5;
  border-radius: 2px;
  transition: background-color 0.3s;
`;

const Ruler = styled.div`
  position: absolute;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, transparent 0%, transparent 99%, red 99%, red 100%);
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
  cursor: pointer;
  touch-action: none;
  margin-left: 200px;
  ${p =>
    p.vertical
      ? `width: 12px;
  height: 100%;
  margin: 6px 10px;
  padding: 0 4px;`
      : `height: 12px;
  width: 100%;
  padding: 4px 0;
  margin: 14px 6px 10px;`}

  ${Rail} {
    ${p => (p.vertical ? `width: 4px;height: 100%;` : `width: 100%;height: 4px;`)}
  }

  &:hover {
    ${Rail} {
      background-color: #e1e1e1;
    }
  }

  ${props => props.defaultStyles};
`;

class Range extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      dragging: false,
      handler: null // 当前控制第几个handler
    };
  }

  sliderRef;
  handlerRefs = [];
  componentDidMount() {
    console.log(this.handlerRefs);
    this.addDocumentEvent();
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

  getOffset(value = this.value) {
    const { max } = this.props;
    return (value / max) * 100;
  }

  calcOffset(value) {
    const { min, max } = this.props;
    const ratio = (value - min) / (max - min);
    return ratio * 100;
  }

  calcValue(offset) {
    const { vertical, min, max } = this.props;
    const ratio = Math.abs(Math.max(offset, 0) / this.sliderLength);
    const value = vertical ? (1 - ratio) * (max - min) + min : ratio * (max - min) + min;
    return value;
  }

  calcValueByPos(position) {
    const { min, max } = this.props;
    const offset = position - this.sliderStart;
    const value = ensureValueInRange(this.calcValue(offset), { min, max });
    return value;
  }

  getClosestBound(val) {
    const { value } = this.props;
    let closestBound = 0;
    for (let i = 1; i < value.length - 1; ++i) {
      if (val > value[i]) {
        closestBound = i;
      }
    }
    if (Math.abs(value[closestBound + 1] - val) < Math.abs(value[closestBound] - val)) {
      closestBound += 1;
    }
    return closestBound;
  }

  onMouseDown = e => {
    const { value, step, min, max, vertical } = this.props;
    let position = getMousePosition(e, vertical);
    console.log({ position });
    if (isEventFromHandler(e, this.handlerRefs)) {
      // 点击在滑动块上需要重新获取滑动块中心点位置，因为鼠标不一定直接点在中心点
      const handlePosition = getHandleCenterPosition(e.target, vertical);
      position = handlePosition;
    } else {
      // 点在轴上
    }

    let newValue = this.calcValueByPos(position);
    const closestValue = getClosestPoint(newValue, { step, min, max });
    // ----------------------
    const closestBound = this.getClosestBound(newValue);
    this.prevMovedHandleIndex = closestBound;
    this.setState({
      dragging: true,
      handler: this.prevMovedHandleIndex,
      recent: this.prevMovedHandleIndex
    });

    this.handlerRefs[this.prevMovedHandleIndex].clickFocus();

    this.removeDocumentEvent();
    if (value !== closestValue) {
      this.changeBoundValue(closestValue, closestBound);
    }
    this.addDocumentEvent();
  };

  changeBoundValue(nextValue) {
    const { value, onChange } = this.props;
    const handler = /* this.state.handler || */ this.prevMovedHandleIndex;
    const prevValue = value[handler];
    if (nextValue === prevValue) return;
    const newValue = [...value];
    newValue[handler] = nextValue;
    newValue.sort((a, b) => a - b); // 不排序的话滑块位置交叉改变位置后，点击滑动条会影响获取就近值
    const nextHandler = newValue.indexOf(nextValue);
    this.prevMovedHandleIndex = nextHandler;
    this.setState({ handler: nextHandler });
    onChange && onChange(newValue);
  }

  onMove = e => {
    if (this.props.disabled || !this.state.dragging) return;
    const { sliderLength, sliderStart } = this;
    const { vertical } = this.props;
    const handlerOffset = getMousePosition(e, vertical);
    this.handlerOffset = handlerOffset;
    if (handlerOffset < sliderStart || handlerOffset > sliderStart + sliderLength) {
      return;
    }
    const { step, min, max } = this.props;
    const currentValue = vertical
      ? (1 - (handlerOffset - sliderStart) / sliderLength) * max
      : ((handlerOffset - sliderStart) / sliderLength) * max;
    const closestValue = getClosestPoint(currentValue, { step, min, max });
    const oldValue = this.props.value[this.state.handler];
    if (closestValue == oldValue) return;
    this.changeBoundValue(closestValue);
  };

  onEnd = e => {
    this.setState({ dragging: false, handler: null });
  };

  onMouseUp = () => {
    if (this.handlerRefs[this.prevMovedHandleIndex]) {
      this.handlerRefs[this.prevMovedHandleIndex].clickFocus();
    }
    this.setState({ handler: null });
  };

  getHandlerProps = (v, i) => {
    const { vertical, min, max, tooltipVisible } = this.props;
    return {
      key: i,
      vertical,
      min,
      max,
      value: v,
      offset: this.getOffset(v),
      dragging: this.state.handler === i,
      tooltipVisible
    };
  };

  getHandlers = () => {
    const { tipFormatter, value } = this.props;

    return value.map((v, i) => {
      if (tipFormatter === null) {
        return (
          <Handler
            key={i}
            className={`wjc-slider-handler-${i + 1}`}
            ref={ref => (this.handlerRefs[i] = ref)}
            {...this.getHandlerProps(v, i)}
          />
        );
      } else {
        return (
          <HandlerWithTooltip
            key={i}
            className={`wjc-slider-handler-${i + 1}`}
            ref={ref => {
              if (!ref) return;
              this.handlerRefs[i] = ref.handlerRef;
            }}
            value={this.value[i]}
            tipFormatter={tipFormatter}
            {...this.getHandlerProps(v, i)}
          />
        );
      }
    });
  };

  getTracks = () => {
    const { value, included, vertical } = this.props;
    const offsets = value.map(v => this.calcOffset(v));
    return value.slice(0, -1).map((v, i) => {
      return (
        <Track
          key={i}
          className={`wjc-slider-track-${i + 1}`}
          included={included}
          offset={offsets[i]}
          length={offsets[i + 1] - offsets[i]}
          vertical={vertical}
        />
      );
    });
  };

  render() {
    const { className, defaultStyles, disabled, vertical, step, max } = this.props;

    return (
      <Wrap
        ref={ref => (this.sliderRef = ref)}
        defaultStyles={defaultStyles}
        className={className}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        offset={this.offset}
        disabled={disabled}
        vertical={vertical}
      >
        <Rail className={`wjc-slider-rail`} />
        <Ruler className={`wjc-slider-ruler`} frame={`${(step / max) * 100}%`} />
        {this.getTracks()}
        {this.getHandlers()}
      </Wrap>
    );
  }
}

Range.defaultProps = {
  min: 0,
  max: 100,
  step: 1,
  disabled: false,
  vertical: false,
  included: true,
  vertical: false
};
Range.propTypes = {
  className: PropTypes.string,
  defaultStyles: PropTypes.string,
  tipFormatter: PropTypes.func
};
export default ControllSwitchHoc({
  value: "value",
  defaultValue: "defaultValue"
})(Range);
