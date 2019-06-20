import * as React from "react";
import { findDOMNode } from "react-dom";

type marks = Record<
  string,
  number | string | { label: React.ReactNode; style: React.CSSProperties }
>;

export function isEventFromHandler(
  e: React.MouseEvent | React.KeyboardEvent | React.FocusEvent,
  handles: any
) {
  try {
    return Object.keys(handles).some(key => e.target === findDOMNode(handles[key]));
  } catch (err) {
    console.error(err);
    return false;
  }
}

export function getMousePosition(e: MouseEvent | React.MouseEvent, vertical = false) {
  return vertical ? e.clientY : e.pageX;
}

export function getHandleCenterPosition(node: EventTarget, vertical = false) {
  const rect = (node as Element).getBoundingClientRect();
  return vertical
    ? rect.top + rect.height * 0.5
    : window.pageXOffset + rect.left + rect.width * 0.5;
}

export function isValueOutOfRange(value: number, { min, max }: { min: number; max: number }) {
  return value < min || value > max;
}

export function ensureValueInRange(val: number, { min, max }: { min: number; max: number }) {
  if (val <= min) {
    return min;
  }
  if (val >= max) {
    return max;
  }
  return val;
}

export function getPrecision(step: number) {
  const stepString = step.toString();
  let precision = 0;
  if (stepString.indexOf(".") >= 0) {
    precision = stepString.length - stepString.indexOf(".") - 1;
  }
  return precision;
}

export function getClosestMark(marks: marks, val: number) {
  const points = Object.keys(marks);
  let index = points.findIndex(a => (a as any) > val);
  if (Math.abs(+points[index - 1] - val) < Math.abs(+points[index] - val)) {
    index -= 1;
  }
  return parseFloat(points[index]);
}

export function getClosestPoint(
  val: number,
  { min, max, step, marks }: { min: number; max: number; step: number; marks: marks }
) {
  if (step === null) {
    step = max - min;
  }
  const maxSteps = Math.floor((max - min) / step);
  const steps = Math.min((val - min) / step, maxSteps);
  const closestPoint = Math.round(steps) * step + min;
  let closestValue = parseFloat(closestPoint.toFixed(getPrecision(step)));
  if (marks) {
    const closestMark = getClosestMark(marks, val);
    if (Math.abs(val - closestValue) > Math.abs(val - closestMark)) {
      closestValue = closestMark;
    }
  }
  return closestValue;
}

export function calculateNextValue(func: "increase" | "decrease", val: number, props: any) {
  const operations = {
    increase: (a: string | number, b: number) => +a + b,
    decrease: (a: string | number, b: number) => +a - b
  };
  const operate = operations[func];
  const { min, step } = props;
  const indexToGet = operate(Object.keys(props.marks).indexOf(JSON.stringify(val)), 1);
  const keyToGet = Object.keys(props.marks)[indexToGet];
  if (props.step) {
    const calcStartValue = func === "increase" ? Math.floor : Math.ceil;
    return operate(calcStartValue((val - min) / step), 1) * step + min;
  } else if (!!Object.keys(props.marks).length && !!props.marks[keyToGet]) {
    return +keyToGet;
  }
  return val;
}

const keyCode = {
  UP: 38,
  LEFT: 37,
  RIGHT: 39,
  DOWN: 40,
  HOME: 36,
  END: 35,
  PAGE_UP: 33,
  PAGE_DOWN: 34
};

type valueMutator = (value: number, props: any) => number;
export function getKeyboardValueMutator(e: React.KeyboardEvent): valueMutator {
  switch (e.keyCode) {
    case keyCode.UP:
    case keyCode.RIGHT:
      return (value, props) => calculateNextValue("increase", value, props);
    case keyCode.DOWN:
    case keyCode.LEFT:
      return (value, props) => calculateNextValue("decrease", value, props);
    case keyCode.END:
      return (value, props) => props.max;
    case keyCode.HOME:
      return (value, props) => props.min;
    case keyCode.PAGE_UP:
      return (value, props) => value + props.step * 2;
    case keyCode.PAGE_DOWN:
      return (value, props) => value - props.step * 2;
    default:
      return undefined;
  }
}
