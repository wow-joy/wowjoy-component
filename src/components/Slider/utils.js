import { findDOMNode } from "react-dom";

export function isEventFromHandler(e, handles) {
  try {
    return Object.keys(handles).some(
      key => e.target === findDOMNode(handles[key])
    );
  } catch (err) {
    return false;
  }
}

export function getMousePosition(e, vertical = false) {
  return vertical ? e.clientY : e.pageX;
}

export function getHandleCenterPosition(node, vertical = false) {
  const rect = node.getBoundingClientRect();
  return vertical
    ? rect.top + rect.height * 0.5
    : window.pageXOffset + rect.left + rect.width * 0.5;
}

export function isValueOutOfRange(value, { min, max }) {
  return value < min || value > max;
}

export function ensureValueInRange(val, { max, min }) {
  if (val <= min) {
    return min;
  }
  if (val >= max) {
    return max;
  }
  return val;
}

export function getPrecision(step) {
  const stepString = step.toString();
  let precision = 0;
  if (stepString.indexOf(".") >= 0) {
    precision = stepString.length - stepString.indexOf(".") - 1;
  }
  return precision;
}

export function getClosestPoint(val, { step, min, max }) {
  const maxSteps = Math.floor((max - min) / step);
  const steps = Math.min((val - min) / step, maxSteps);
  const closestPoint = Math.round(steps) * step + min;
  return parseFloat(closestPoint.toFixed(getPrecision(step)));
}
