import * as React from "react";
import { createPortal } from "react-dom";
import styled, { css, keyframes, Keyframes } from "styled-components";
import { ARROW_HEIGHT, ARROW_WIDTH } from "./constant";
import createTip from "./createTip";
import { ComplexProps } from "./tooltip";
import getPlacements, { GetPlacement, placement, CurrentPlace } from "./placements";

const enterAnimation = keyframes`
  0%{
    transform: scale(0.8);
    opacity:0;
  }
  100%{
    transform: scale(1);
    opacity: 1;
  }
`;
const leaveAnimation = keyframes`
  0%{
    transform: scale(1);
    opacity:1;
  }
  100%{
    transform: scale(0.8);
    opacity:0;
  }
`;

const TriggerBox = styled.span`
  display: inline-block;
  cursor: pointer;
`;
const Layer = styled.div<{ defaultStyles: string; className: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`;

const Content = styled.div.attrs<{ contentOffset: number[] }>(props => ({
  style: {
    left: props.contentOffset[0],
    top: props.contentOffset[1]
  }
}))<{
  visible: boolean;
  enterAnimation: Keyframes;
  leaveAnimation: Keyframes;
  defaultStyles: string;
  contentDisplay: "none" | "block";
  contentOffset: number[];
}>`
  display: ${p => p.contentDisplay};
  position: absolute;
  max-width: 300px;
  ${p =>
    p.visible
      ? css`
          animation: ${p.enterAnimation || enterAnimation} 0.3s forwards;
        `
      : css`
          animation: ${p.leaveAnimation || leaveAnimation} 0.3s forwards;
        `}
  ${p => p.defaultStyles}
`;

const Inner = styled.div<{
  theme: string;
  borderDerectionClass: string;
  arrowStyle: string;
}>`
  width: max-content;
  max-width: 100%;
  padding: 6px 8px;
  word-break: break-word;
  min-height: 30px;
  border-radius: 3px;
  ${p =>
    p.theme === "dark"
      ? `background-color: rgba(0, 0, 0, 0.5);box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.3);color: #ffffff;`
      : `background: #FFFFFF;box-shadow: 0 0 4px 0 rgba(0,0,0,0.3);`}
  font-family: "STHeitiSC-Light";
  font-size: 12px;
  letter-spacing: 0;
  line-height: 20px;
  text-align: left;
  display: flex;
  align-items: center;
  ::before {
    content: "";
    display: inline-block;
    width: 0;
    height: 0;
    border-color: transparent;
    border: ${ARROW_WIDTH}px solid transparent;
    ${p =>
      `border-${p.borderDerectionClass}-color: ${
        p.theme === "dark" ? "rgba(0, 0, 0, 0.4)" : "#fff"
      };`}
    ${p => `border-${p.borderDerectionClass}-width: ${ARROW_HEIGHT}px`};
    position: absolute;
    transition: 0.1s;
    ${p => p.arrowStyle}
  }
`;

interface State {
  currentPlace: Partial<CurrentPlace>;
}

class ComplexTooltip extends React.PureComponent<ComplexProps, State> {
  static defaultProps = {
    arrowPointAtCenter: false
  };
  constructor(props: ComplexProps) {
    super(props);
    this.state = {
      currentPlace: {
        contentOffset: [0, 0],
        transformOrigin: "",
        arrowStyle: ""
      }
    };
  }
  getPlacement: GetPlacement;
  layerRef: HTMLElement;
  innerRef: HTMLElement;

  componentWillReceiveProps(nextProps: ComplexProps) {
    if (
      this.compareRect(nextProps.contentRect, this.props.contentRect) ||
      this.compareRect(nextProps.triggerRect, this.props.triggerRect)
    ) {
      this.setState({
        currentPlace: getPlacements(nextProps.placement, {
          arrowPointAtCenter: nextProps.arrowPointAtCenter,
          arrowMargin: nextProps.arrowMargin
        })({
          triggerRect: nextProps.triggerRect,
          contentRect: nextProps.contentRect
        })
      });
    }
  }

  compareRect = <T extends {}>(rect1: T, rect2: T): boolean => {
    return Object.keys(rect1).some(key => rect1[key as keyof T] !== rect2[key as keyof T]);
  };

  getChildren = () => {
    const {
      children,
      className,
      childrenMouseEnter,
      childrenMouseLeave,
      triggerRef,
      style
    } = this.props;
    let triggerProps = {
      style,
      onMouseEnter: childrenMouseEnter,
      onMouseLeave: childrenMouseLeave,
      ref: triggerRef
    };
    if (typeof children === "string" || React.Children.count(children) > 1) {
      return (
        <TriggerBox
          className={`wjc-tooltip-triggerbox ${className ? className : ""}`}
          {...triggerProps}
        >
          {children}
        </TriggerBox>
      );
    }
    return React.cloneElement(children as React.ReactElement, triggerProps);
  };

  render() {
    const {
      defaultStyles,
      className,
      title,
      enterAnimation,
      leaveAnimation,
      placement,
      getContainer,
      theme,
      visible,
      onAnimationEnd,
      tipMouseEnter,
      tipMouseLeave,
      contentDisplay
    } = this.props;
    const {
      arrowStyle,
      borderDerectionClass,
      popBoxStyle,
      transformOrigin,
      contentOffset
    } = this.state.currentPlace;

    return (
      <React.Fragment>
        {this.getChildren()}
        {createPortal(
          <Layer
            ref={ref => (this.layerRef = ref)}
            defaultStyles={defaultStyles}
            className={`wjc-tooltip-layer ${className || ""} ${
              placement ? `wjc-tooltip-${placement}` : ""
            }`}
          >
            <Content
              ref={this.props.contentRef}
              className={`wjc-tooltip-conent`}
              defaultStyles={`
                ${popBoxStyle || ""}
                ${transformOrigin && `transform-origin: ${transformOrigin};`}
              `}
              contentOffset={contentOffset}
              enterAnimation={enterAnimation}
              leaveAnimation={leaveAnimation}
              visible={visible}
              contentDisplay={contentDisplay}
              onMouseEnter={tipMouseEnter}
              onMouseLeave={tipMouseLeave}
              onAnimationEnd={onAnimationEnd}
            >
              <Inner
                ref={ref => (this.innerRef = ref)}
                className={`wjc-tooltip-inner`}
                arrowStyle={arrowStyle}
                borderDerectionClass={borderDerectionClass}
                theme={theme}
              >
                {title}
              </Inner>
            </Content>
          </Layer>,
          (getContainer && getContainer()) || document.body
        )}
      </React.Fragment>
    );
  }
}

export default createTip(ComplexTooltip);
