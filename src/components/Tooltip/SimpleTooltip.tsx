import * as React from "react";
import styled, { css, keyframes } from "styled-components";
import { ARROW_HEIGHT, ARROW_OFFSET, ARROW_WIDTH } from "./constant";
import createTip from "./createTip";
import { direction, formatPlacement, placement, reverse, shadowOffset } from "./placements";
import { SimpleProps } from "./tooltip";

enum axisDirection {
  top = "left",
  bottom = "left",
  left = "top",
  right = "top"
}
enum axisTransform {
  top = "translateX",
  bottom = "translateX",
  left = "translateY",
  right = "translateY"
}
function getTransform(axisX: direction, axisY: direction | undefined) {
  let originX, originY;
  if (axisX === "left" || axisX === "right") {
    originX = axisX === "left" ? `calc(100% + ${ARROW_HEIGHT}px)` : `-${ARROW_HEIGHT}px`;
    originY = !axisY
      ? "0px"
      : axisY === "top"
      ? `${ARROW_OFFSET + ARROW_WIDTH}px`
      : `calc(100% - ${ARROW_OFFSET + ARROW_WIDTH}px)`;
  }
  if (axisX === "top" || axisX === "bottom") {
    originX = !axisY
      ? "0px"
      : axisY === "left"
      ? `${ARROW_OFFSET + ARROW_WIDTH}px`
      : `calc(100% - ${ARROW_OFFSET + ARROW_WIDTH}px)`;
    originY = axisX === "top" ? `calc(100% + ${ARROW_HEIGHT}px)` : `-${ARROW_HEIGHT}px`;
  }
  return [originX, originY];
}

const enterAnimation = (extraCss: string = "") => keyframes`
  0%{
    transform: scale(0.8) ${extraCss};
    opacity:0;
  }
  100%{
    transform: scale(1) ${extraCss};
    opacity: 1;
  }
`;

const leaveAnimation = (extraCss: string = "") => keyframes`
  0%{
    transform: scale(1) ${extraCss};
    opacity:1;
  }
  100%{
    transform: scale(0.8) ${extraCss};
    opacity:0;
  }
`;

const Content = styled.div<{
  visible: boolean;
  theme: "light" | "dark";
  contentDisplay: "none" | "block";
  axisX: direction;
  axisY: direction;
  transformOrign: string[];
  duration: number;
  arrowMargin: number;
}>`
  display: ${p => p.contentDisplay};
  position: absolute;
  width: max-content;
  max-width: 300px;
  padding: 6px 8px;
  word-break: break-word;
  min-height: 30px;
  border-radius: 3px;
  ${p =>
    p.theme === "dark"
      ? `background-color: rgba(0, 0, 0, 0.5);box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.3);color: #ffffff;`
      : `background: #FFFFFF;box-shadow: 0 0 4px 0 rgba(0,0,0,0.3);`}
  font-size: 12px;
  letter-spacing: 0;
  line-height: 20px;
  text-align: left;
  transform-origin: ${p => p.transformOrign.join(" ")};
  ${p => {
    const reverseDir = reverse[p.axisX];
    return `
      ${reverseDir}: 100%;
      margin-${reverseDir}: ${ARROW_HEIGHT + p.arrowMargin}px;
    `;
  }}
  ${p => (p.axisY ? `${p.axisY}: 0px;` : `${axisDirection[p.axisX]}: 50%;`)}
  ${p =>
    p.visible
      ? css`
          animation: ${enterAnimation(p.axisY ? "" : `${axisTransform[p.axisX]}(-50%)`)}
            ${p.duration}s forwards;
        `
      : css`
          animation: ${leaveAnimation(p.axisY ? "" : `${axisTransform[p.axisX]}(-50%)`)}
            ${p.duration}s forwards;
        `}
  ::before {
    content: "";
    display: inline-block;
    width: 0;
    height: 0;
    border: 6px solid transparent;
    ${p => `border-${p.axisX}-color: ${p.theme === "dark" ? `rgba(0, 0, 0, 0.4)` : "#fff"}`};
    ${p => `border-${p.axisX}-width`}: 5px;
    ${p => `filter: drop-shadow(${shadowOffset[p.axisX].join(" ")} 1px rgba(0, 0, 0, 0.1));`}
    position: absolute;
    transition: 0.1s;
    ${p => p.axisX}: 100%;
    ${p =>
      p.axisY
        ? `${p.axisY}: ${ARROW_OFFSET}px;`
        : `
          transform: ${axisTransform[p.axisX]}(-50%);
          ${axisDirection[p.axisX]}:50%
        `};
  }
`;

const TriggerBox = styled.span`
  display: inline-block;
  cursor: pointer;
`;

const Wrap = styled.span<{ tipText: React.ReactNode; placement: placement; defaultStyles: string }>`
  position: relative;
  display: inline-block;
  ${p => p.defaultStyles}
`;

const NoWrapper = styled.span`
  .noWrapper {
    background-color: red;
  }
`;

interface State {
  axisX: direction;
  axisY: direction;
  transformOrigin: string[];
}

class SimpleTooltip extends React.PureComponent<SimpleProps, State> {
  static defaultProps = {
    noWrapper: false
  };
  constructor(props: SimpleProps) {
    super(props);
    const [axisX, axisY] = formatPlacement(props.placement);
    const transformOrigin = getTransform(axisX, axisY);
    this.state = { axisX, axisY, transformOrigin };
  }

  axisX: direction;
  axisY: direction;
  transformOrigin: string[];
  enterTimer: any;
  leaveTimer: any;

  componentDidMount() {
    this.setPosition(this.props.placement);
  }

  componentWillReceiveProps(nextProps: SimpleProps) {
    if (nextProps.placement !== this.props.placement) {
      this.setPosition(nextProps.placement);
    }
  }

  setPosition = (placement: placement) => {
    const [axisX, axisY] = formatPlacement(placement);
    const transformOrigin = getTransform(axisX, axisY);
    this.setState({ axisX, axisY, transformOrigin });
  };

  getChildren = () => {
    const { children, childrenMouseEnter, childrenMouseLeave, triggerRef } = this.props;
    const triggerProps = {
      onMouseEnter: childrenMouseEnter,
      onMouseLeave: childrenMouseLeave,
      ref: triggerRef
    };
    if (typeof children === "string" || React.Children.count(children) > 1) {
      return (
        <TriggerBox className={`wjc-tooltip-triggerbox`} {...triggerProps}>
          {children}
        </TriggerBox>
      );
    }
    return React.cloneElement(children as React.ReactElement, triggerProps);
  };

  render() {
    const {
      children,
      className,
      defaultStyles,
      title,
      placement,
      visible,
      contentRef,
      onAnimationEnd,
      tipMouseEnter,
      tipMouseLeave,
      contentDisplay,
      duration,
      noWrapper,
      style,
      arrowMargin,
      theme
    } = this.props;
    const { axisX, axisY, transformOrigin } = this.state;

    if (noWrapper) {
      const A = styled(props => children as React.ReactElement)`
        background-color: red;
      `;
      return React.createElement(A, {});
      // React.cloneElement(children as React.ReactElement, {
      //   className: "noWrapper",
      //   ref: triggerRef
      // })
    }
    return (
      <Wrap
        tipText={title}
        placement={placement}
        className={`wjc-tooltip ${className || ""}`}
        defaultStyles={defaultStyles}
        style={style}
      >
        {this.getChildren()}
        <Content
          className={`wjc-tooltip-content`}
          ref={contentRef}
          visible={visible}
          axisX={axisX}
          axisY={axisY}
          transformOrign={transformOrigin}
          onMouseEnter={tipMouseEnter}
          onMouseLeave={tipMouseLeave}
          onAnimationEnd={onAnimationEnd}
          contentDisplay={contentDisplay}
          duration={duration}
          arrowMargin={arrowMargin}
          theme={theme}
        >
          {title}
        </Content>
      </Wrap>
    );
  }
}

export default createTip(SimpleTooltip);
