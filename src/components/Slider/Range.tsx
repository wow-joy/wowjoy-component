import * as React from "react";
import styled from "styled-components";
import ControllSwitchHoc from "../../tools/Hoc/ControllSwitchHoc";
import HandleValue from "./handleValueHoc";
import Handler, { StyledHandler } from "./Handler";
import Track, { StyledTrack } from "./Track";
import HandlerWithTooltip from "./HandlerWithTooltip";
import {
  getMousePosition,
  getHandleCenterPosition,
  getClosestPoint,
  ensureValueInRange,
  isEventFromHandler,
  getKeyboardValueMutator
} from "./utils";

function noop() {}

const Rail = styled.div`
  position: absolute;
  background-color: #f5f5f5;
  border-radius: 2px;
  transition: background-color 0.3s;
`;
const MarkBox = styled.div`
  position: absolute;
  background: transparent;
`;
const MarkText = styled.div`
  position: absolute;
  display: inline-block;
  color: rgba(0, 0, 0, 0.45);
  text-align: center;
  word-break: keep-all;
  cursor: pointer;
`;
const Mark = styled.div.attrs<{ positionStyle: React.CSSProperties }>(props => ({
  style: props.positionStyle
}))<{ isActive: boolean; positionStyle: React.CSSProperties }>`
  position: absolute;
  width: 8px;
  height: 8px;
  margin-left: -4px;
  background-color: #fff;
  border: 2px solid #e8e8e8;
  border-radius: 50%;
  cursor: pointer;
  border-color: ${p => (p.isActive ? "#8cc8ff" : "#e8e8e8")};
`;

interface Wrap {
  marks?: boolean;
  isDragging?: boolean;
  vertical?: boolean;
  disabledSlider?: boolean;
  defaultStyles?: string;
}

export const Wrap = styled.div<Wrap>`
  box-sizing: border-box;
  padding: 0;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  line-height: 1.5;
  list-style: none;
  position: relative;
  cursor: pointer;
  touch-action: none;
  ${p =>
    p.vertical
      ? `width: 12px;
  height: 100%;
  padding: 0 4px;`
      : `height: 12px;
  width: 100%;
  padding: 4px 0;
  margin: 14px 6px 10px;`}
  margin-bottom: ${p => (p.marks ? "25px" : "15px")};
  ${p => p.isDragging && "user-select:none;"}

  ${Rail} {
    ${p => (p.vertical ? `width: 4px;height: 100%;` : `width: 100%;height: 4px;`)}
  }

  &:hover {
    ${Rail} {
      background-color: #e1e1e1;
    }
  }

  ${MarkBox}{
    ${p => (p.vertical ? `width: 4px;height: 100%;` : `width: 100%;height: 4px;`)}
    ${Mark}{
      ${p => (p.vertical ? `left: 2px;` : `top: -2px;`)}
    }
    ${MarkText}{
      ${p =>
        p.vertical
          ? `transform: translateY(-50%);left: 10px;`
          : `transform: translateX(-50%);top: 10px;`}
    }
  }

  ${p =>
    p.disabledSlider &&
    `
    ${StyledHandler},${Mark}{
      background-color: #fff;
      border-color: rgba(0,0,0,0.25) !important;
      box-shadow: none;
      cursor: not-allowed;
    }
    ${StyledTrack}{
      background-color: rgba(0,0,0,0.25);
    }
  `}

  ${props => props.defaultStyles};
`;

export interface Props {
  className: string;
  defaultStyles: string;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  vertical?: boolean;
  included?: boolean;
  marks?: Record<string, string | { label: React.ReactNode; style: React.CSSProperties }>;
  value: number[];
  tooltipVisible?: boolean;
  tooltipPlacement: string;
  tipFormatter?: (value: number) => React.ReactNode;
  getTooltipPopupContainer: () => HTMLElement;
  onChange: (value: number | number[]) => void;
  onAfterChange: (value: number | number[]) => void;
  onFocus: (e: React.FocusEvent) => void;
  onBlur: (e: React.FocusEvent) => void;
}
interface State {
  dragging: boolean;
  handler: number | null;
  recent: number | null;
}

class Range extends React.PureComponent<Props, State> {
  static defaultProps = {
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
    vertical: false,
    included: true,
    marks: {}
  };
  constructor(props: Props) {
    super(props);
    this.state = {
      dragging: false,
      handler: null, // 当前控制第几个handler
      recent: null
    };
    if (process.env.NODE_ENV === "development") {
      const { step, max, min } = props;
      if ((step && !Number.isInteger(step)) || !isFinite(max - min)) {
        console.error(
          "Slider[max] - Slider[min] (%s) should be a multiple of Slider[step] (%s)",
          max - min,
          step
        );
      }
    }
  }
  prevMovedHandleIndex: number;
  sliderRef: HTMLDivElement | null;
  handlerRefs: any[] = [];
  clickOnSlider = false;

  componentWillUnmount() {
    this.removeDocumentEvent();
  }

  addDocumentEvent() {
    document.addEventListener("mouseup", this.onDocumentMouseUp, false);
    document.addEventListener("mousemove", this.onMove, false);
  }

  removeDocumentEvent() {
    document.removeEventListener("mousemove", this.onMove, false);
    document.removeEventListener("mouseup", this.onDocumentMouseUp, false);
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

  calcOffset(value: number) {
    const { min, max } = this.props;
    const ratio = (value - min) / (max - min);
    return ratio * 100;
  }

  calcValue(offset: number) {
    const { vertical, min, max } = this.props;
    const ratio = Math.abs(Math.max(offset, 0) / this.sliderLength);
    const value = vertical ? (1 - ratio) * (max - min) + min : ratio * (max - min) + min;
    return value;
  }

  calcValueByPos(position: number) {
    const { min, max } = this.props;
    const offset = position - this.sliderStart;
    const value = ensureValueInRange(this.calcValue(offset), { min, max });
    return value;
  }

  getClosestHandler(val: number) {
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

  onMouseDown = (e: React.MouseEvent) => {
    this.clickOnSlider = true;
    const { vertical } = this.props;
    let position = getMousePosition(e, vertical);
    if (isEventFromHandler(e, this.handlerRefs)) {
      const handlePosition = getHandleCenterPosition(e.target, vertical);
      position = handlePosition;
    }
    this.removeDocumentEvent();
    this.onStart(position);
    this.addDocumentEvent();
  };

  onStart = (position: number) => {
    const { value, step, min, max, marks } = this.props;
    let newValue = this.calcValueByPos(position);
    const closestValue = getClosestPoint(newValue, { step, min, max, marks });
    const closestHandler = this.getClosestHandler(newValue);
    this.handlerRefs.forEach((ref, i) => i !== closestHandler && ref.clickBlur());
    this.prevMovedHandleIndex = closestHandler;
    this.setState({
      dragging: true,
      handler: this.prevMovedHandleIndex,
      recent: this.prevMovedHandleIndex
    });
    if (value[closestHandler] !== closestValue) {
      this.changeBoundValue(closestValue);
    }
  };

  changeBoundValue(nextValue: number) {
    const { value, onChange } = this.props;
    const handler = /* this.state.handler || */ this.prevMovedHandleIndex;
    // const handler = this.state.handler === null ? this.state.recent : this.state.handler;
    const prevValue = value[handler];
    if (nextValue === prevValue) return;
    const newValue = [...value];
    newValue[handler] = nextValue;
    newValue.sort((a, b) => a - b); // 不排序的话滑块位置交叉改变位置后，点击滑动条会影响获取就近值
    const nextHandler = newValue.indexOf(nextValue);
    this.prevMovedHandleIndex = nextHandler;
    this.setState({ handler: nextHandler });
    const changeValue = newValue.length === 1 ? newValue[0] : newValue;
    onChange && onChange(changeValue);
    return changeValue;
  }

  onMove = (e: MouseEvent) => {
    if (!this.sliderRef) {
      this.onEnd();
      return;
    }
    e.stopPropagation();
    e.preventDefault();
    const { vertical, step, min, max, marks } = this.props;
    const handlerOffset = getMousePosition(e, vertical);
    const currentValue = this.calcValueByPos(handlerOffset);
    let closestValue = getClosestPoint(currentValue, { step, min, max, marks });
    const oldValue = this.props.value[this.state.handler];
    if (closestValue == oldValue) return;
    this.changeBoundValue(closestValue);
  };

  onEnd = (isStopDrag = true) => {
    // this.prevMovedHandleIndex = null;
    const { onAfterChange, value } = this.props;
    this.state.dragging && onAfterChange && onAfterChange(value);
    isStopDrag && this.setState({ dragging: false, handler: null });
  };

  onDocumentMouseUp = () => {
    this.removeDocumentEvent();
    this.onEnd();
  };

  onMouseUp = () => {
    this.removeDocumentEvent();
    if (this.handlerRefs[this.prevMovedHandleIndex]) {
      this.handlerRefs[this.prevMovedHandleIndex].clickFocus();
    }
  };

  onKeyboard(e: React.KeyboardEvent) {
    const { handler, recent } = this.state;
    const { min, max, onAfterChange } = this.props;
    const valueMutator = getKeyboardValueMutator(e);
    if (valueMutator) {
      e.stopPropagation();
      e.preventDefault();
      const oldValue = this.props.value[handler === null ? recent : handler];
      let value = valueMutator(oldValue, this.props);
      value = ensureValueInRange(value, { min, max });
      if (value === oldValue) return;
      const newValue = this.changeBoundValue(value);
      onAfterChange && onAfterChange(newValue);
      this.props.value.length === 1 && this.onEnd();
    }
  }

  onKeyDown = (e: React.KeyboardEvent) => {
    if (this.sliderRef && isEventFromHandler(e, this.handlerRefs)) {
      this.onKeyboard(e);
    }
  };

  onFocus = (e: React.FocusEvent) => {
    const { onFocus, vertical } = this.props;
    if (isEventFromHandler(e, this.handlerRefs)) {
      const handlerPosition = getHandleCenterPosition(e.target, vertical);
      this.onStart(handlerPosition);
      e.stopPropagation();
      e.preventDefault();
      onFocus && onFocus(e);
    }
  };

  onBlur = (e: React.FocusEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const { onBlur } = this.props;
    this.onEnd();
    onBlur && onBlur(e);
  };

  getHandlerProps = (v: number, i: number) => {
    const { vertical, tooltipVisible, disabled } = this.props;
    const offset = this.calcOffset(v);
    const positionStyle = vertical ? { bottom: `${offset}%` } : { left: `${offset}%` };
    const handlerStyle = vertical
      ? `margin-left: -5px;margin-bottom: -7px;`
      : `margin-top: -5px;margin-left: -7px;`;
    return {
      key: i,
      className: `wjc-slider-handler wjc-slider-handler-${i + 1}`,
      vertical,
      value: v,
      disabled,
      positionStyle,
      handlerStyle,
      dragging: this.state.handler === i,
      tooltipVisible
    };
  };

  getHandlers = () => {
    const { tipFormatter, value, tooltipPlacement, getTooltipPopupContainer } = this.props;

    return value.map((v, i) => {
      if (tipFormatter === null) {
        return (
          <Handler
            key={i}
            ref={ref => (this.handlerRefs[i] = ref)}
            style={{ position: "absolute" }}
            {...this.getHandlerProps(v, i)}
          />
        );
      } else {
        return (
          <HandlerWithTooltip
            key={i}
            ref={ref => {
              if (!ref) return;
              this.handlerRefs[i] = ref.handlerRef;
            }}
            tipFormatter={tipFormatter}
            tooltipPlacement={tooltipPlacement}
            getTooltipPopupContainer={getTooltipPopupContainer}
            {...this.getHandlerProps(v, i)}
          />
        );
      }
    });
  };

  getTracks = () => {
    const { value, min, included, vertical } = this.props;
    const handlers = included && value.length === 1 ? [min, ...value] : value;
    const offsets = handlers.map(v => this.calcOffset(v));
    return handlers.slice(0, -1).map((v, i) => {
      return (
        <Track
          key={i}
          className={`wjc-slider-track-${i + 1}`}
          offset={offsets[i]}
          length={offsets[i + 1] - offsets[i]}
          vertical={vertical}
        />
      );
    });
  };

  getMarks = () => {
    const { marks, vertical, included, value: currentValve } = this.props;
    return Object.keys(marks).map((value, i) => {
      const isActive = included
        ? currentValve.length > 1
          ? currentValve[currentValve.length - 1] >= +value && currentValve[0] <= +value
          : currentValve[0] >= +value
        : false;
      const data = marks[value];
      const positionStyle = { [vertical ? "bottom" : "left"]: this.calcOffset(+value) + "%" };
      if (typeof data === "object") {
        return (
          <Mark
            key={value}
            isActive={isActive}
            className={`wjc-slider-dot ${isActive ? "wjc-slider-dot-active" : ""}`}
            positionStyle={{ ...data.style, ...positionStyle }}
          >
            <MarkText className={`wjc-slider-mark-text`}>{data.label}</MarkText>
          </Mark>
        );
      } else {
        return (
          <Mark
            key={value}
            className={`wjc-slider-dot wjc-slider-dot-${i + 1} ${
              isActive ? "wjc-slider-dot-active" : ""
            }`}
            isActive={isActive}
            positionStyle={positionStyle}
          >
            <MarkText className={`wjc-slider-mark-text`}>{data}</MarkText>
          </Mark>
        );
      }
    });
  };

  render() {
    const { className, defaultStyles, disabled, vertical, marks, included } = this.props;

    return (
      <Wrap
        ref={ref => (this.sliderRef = ref)}
        defaultStyles={defaultStyles}
        className={`wjc-slider ${marks ? "wjc-slider-with-marks" : ""} ${
          disabled ? `wjc-slider-disabled` : ""
        } ${vertical ? "wjc-slider-vertical" : ""} ${className || ""}`}
        onMouseDown={disabled ? noop : this.onMouseDown}
        onMouseUp={disabled ? noop : this.onMouseUp}
        onKeyDown={disabled ? noop : this.onKeyDown}
        onFocus={disabled ? noop : this.onFocus}
        onBlur={disabled ? noop : this.onBlur}
        disabledSlider={disabled}
        vertical={vertical}
        marks={Object.keys(marks).length > 0}
        isDragging={this.state.handler !== null}
      >
        <Rail className={`wjc-slider-rail`} />
        {included && this.getTracks()}
        {marks && <MarkBox className={`wjc-slider-markbox`}>{this.getMarks()}</MarkBox>}
        {this.getHandlers()}
      </Wrap>
    );
  }
}

export default ControllSwitchHoc({
  value: "value",
  defaultValue: "defaultValue"
})(HandleValue(Range));
