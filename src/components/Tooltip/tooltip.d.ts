import * as React from "react";
import { Keyframes } from "styled-components";

export interface TriggerRect {
  width: number;
  height: number;
  left: number;
  top: number;
  scrollX: number;
  scrollY: number;
}
export interface contentRect {
  width: number;
  height: number;
}

export interface BaseProps {
  title: React.ReactNode;
  children: React.ReactNode;
  defaultStyles?: string;
  className?: string;
  placement?: placement;
  theme?: "light" | "dark";
  visible?: boolean;
  autoAdjustOverflow?: boolean;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  onVisibleChange?: (visible: boolean) => void;
  duration?: number;
  arrowMargin?: number;
  style: React.CSSProperties;
}

export interface HocProps {
  contentRef: React.RefObject<HTMLDivElement>;
  triggerRef: (ref: HTMLElement) => void;
  tipMouseEnter: (e: React.MouseEvent) => void;
  tipMouseLeave: (e: React.MouseEvent) => void;
  onAnimationEnd: (e: React.AnimationEvent) => void;
  childrenMouseEnter: (e: React.MouseEvent) => void;
  childrenMouseLeave: (e: React.MouseEvent) => void;
  contentDisplay: "none" | "block";
  contentRect: contentRect;
  triggerRect: TriggerRect;
  setTriggerRect: () => void;
  setContentRect: () => void;
}

export type SimpleProps = BaseProps &
  HocProps & {
    noWrapper: boolean;
  };

export type ComplexProps = BaseProps &
  HocProps & {
    getContainer?: () => HTMLElement;
    arrowPointAtCenter?: boolean;
    enterAnimation?: Keyframes;
    leaveAnimation?: Keyframes;
  };
