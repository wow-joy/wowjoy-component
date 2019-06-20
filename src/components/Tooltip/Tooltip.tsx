import * as React from "react";
import { createPortal, findDOMNode } from "react-dom";
import styled, { css, keyframes, Keyframes } from "styled-components";
import getPlacements, { placement, getPlacement } from "./placements";
import ControllSwitchHoc from "../../tools/Hoc/ControllSwitchHoc";
import { ARROW_WIDTH, ARROW_HEIGHT } from "./constant";

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

const TriggerBox = styled.span<{ className: string }>`
  display: inline-block;
`;
const Layer = styled.div<{ defaultStyles: string; className: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`;

const Content = styled.div<{
  visible: boolean;
  enterAnimation: Keyframes;
  leaveAnimation: Keyframes;
  defaultStyles: string;
}>`
  position: absolute;
  max-width: 300px;
  ${p =>
    p.visible &&
    css`
      animation: ${p.enterAnimation || enterAnimation} 0.1s forwards;
    `}
  ${p =>
    !p.visible &&
    css`
      animation: ${p.leaveAnimation || leaveAnimation} 0.1s forwards;
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

interface Props {
  title: React.ReactNode;
  children: React.ReactNode;
  defaultStyles?: string;
  className?: string;
  enterAnimation?: Keyframes;
  leaveAnimation?: Keyframes;
  placement?: placement;
  getContainer?: () => HTMLElement;
  theme?: string;
  visible?: boolean;
  autoAdjustOverflow?: boolean;
  arrowPointAtCenter?: boolean;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  onVisibleChange?: (visible: boolean) => void;
}
interface State {
  contentRect: { width: number; height: number };
  triggerRect: {
    width: number;
    height: number;
    x: number;
    y: number;
    scrollX: number;
    scrollY: number;
  };
}

class Tooltip extends React.PureComponent<Props, State> {
  static defaultProps = {
    arrowPointAtCenter: false,
    autoAdjustOverflow: true,
    defaultVisible: false,
    shouldFirstAnimation: false,
    mouseEnterDelay: 0.1,
    mouseLeaveDelay: 0.1,
    placement: "top" as placement,
    theme: "dark"
  };
  constructor(props: Props) {
    super(props);
    this.state = {
      contentRect: { width: 0, height: 0 },
      triggerRect: { x: 0, y: 0, width: 0, height: 0, scrollX: 0, scrollY: 0 }
    };
    this.getPlacement = getPlacements(props.placement, {
      autoAdjustOverflow: props.autoAdjustOverflow,
      arrowPointAtCenter: props.arrowPointAtCenter
    });
    this.setScrollOffset();
  }
  getPlacement: getPlacement;
  childrenRef: HTMLElement;
  layerRef: HTMLElement;
  contentRef: HTMLElement;
  innerRef: HTMLElement;
  enterTimer: number;
  leaveTimer: number;
  triggerNode: HTMLElement | Element | Text;
  documentScrollTop: number;
  documentScrollLeft: number;
  componentDidMount() {
    if (this.props.visible) {
      this.contentRef.style.display = "block";
      this.setContentRect();
    } else {
      this.contentRef.style.display = "none";
    }
    this.setTriggerRect();
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.visible !== this.props.visible) {
      if (nextProps.visible) {
        this.contentRef.style.display = "block";
        this.setContentRect();
      }
    }
  }
  did = false;
  componentDidUpdate() {
    if (!this.did) {
      this.did = true;
      this.setTriggerRect();
    } else {
      this.did = false;
    }
  }

  setScrollOffset = () => {
    this.documentScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    this.documentScrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
  };

  setContentRect = () => {
    this.setState({
      contentRect: {
        width: this.contentRef.clientWidth,
        height: this.contentRef.clientHeight
      }
    });
  };

  getTriggerNode() {
    if (!this.triggerNode) {
      this.triggerNode = findDOMNode(this.childrenRef);
    }
    return this.triggerNode;
  }

  setTriggerRect = () => {
    const { x, y, height, width } = (this.getTriggerNode() as any).getBoundingClientRect();
    this.setState({
      triggerRect: {
        scrollX: x + this.documentScrollLeft,
        scrollY: y + this.documentScrollTop,
        x,
        y,
        height,
        width
      }
    });
  };

  get currentPlace() {
    return this.getPlacement({
      triggerRect: this.state.triggerRect,
      contentRect: this.state.contentRect
    });
  }

  getPopPositionStyle = (contentOffset: number[]) => {
    if (!this.contentRef) return ``;
    return `
      left: ${contentOffset[0]}px;
      top: ${contentOffset[1]}px;
    `;
  };

  onMouseEnter = () => {
    this.leaveTimer && clearTimeout(this.leaveTimer);
  };
  onMouseLeave = () => {
    this.enterTimer && clearTimeout(this.enterTimer);
    this.props.onVisibleChange && this.props.onVisibleChange(false);
  };
  onAnimationEnd = () => {
    if (!this.props.visible) {
      this.contentRef.style.display = "none";
    }
  };

  onChildrenMouseEnter = () => {
    this.setScrollOffset();
    this.setTriggerRect();
    clearTimeout(this.leaveTimer);
    this.enterTimer = setTimeout(() => {
      this.props.onVisibleChange && this.props.onVisibleChange(true);
      this.enterTimer = null;
    }, this.props.mouseEnterDelay * 1000);
  };
  onChildrenMouseLeave = () => {
    clearTimeout(this.enterTimer);
    this.leaveTimer = setTimeout(() => {
      this.props.onVisibleChange && this.props.onVisibleChange(false);
      this.leaveTimer = null;
    }, this.props.mouseLeaveDelay * 1000);
  };

  getChildren = () => {
    const { children } = this.props;
    let triggerProps = {
      onMouseEnter: this.onChildrenMouseEnter,
      onMouseLeave: this.onChildrenMouseLeave
    };
    if (typeof children === "string" || React.Children.count(children) > 1) {
      return (
        <TriggerBox
          className="wjc-tooltip-triggerbox"
          ref={ref => (this.childrenRef = ref)}
          {...triggerProps}
        >
          {children}
        </TriggerBox>
      );
    }
    // @ts-ignore
    return React.cloneElement(children, {
      ...triggerProps,
      ref: (node: any) => {
        this.childrenRef = node;
        // @ts-ignore
        const { ref } = children;
        if (typeof ref === "function") {
          ref(node);
        }
      }
    });
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
      visible
    } = this.props;
    const {
      arrowStyle,
      borderDerectionClass,
      popBoxStyle,
      transformOrigin,
      contentOffset
    } = this.currentPlace;
    return (
      <React.Fragment>
        {this.getChildren()}
        {createPortal(
          <Layer
            ref={ref => (this.layerRef = ref)}
            defaultStyles={defaultStyles}
            className={`wjc-tooltip-layer ${placement ? `wjc-tooltip-${placement}` : ""} ${
              className ? className : ""
            }`}
          >
            <Content
              ref={ref => (this.contentRef = ref)}
              className={`wjc-tooltip-conent`}
              defaultStyles={`
                ${this.getPopPositionStyle(contentOffset)}
                ${popBoxStyle}
                transform-origin: ${transformOrigin};
              `}
              enterAnimation={enterAnimation}
              leaveAnimation={leaveAnimation}
              visible={visible}
              onMouseEnter={this.onMouseEnter}
              onMouseLeave={this.onMouseLeave}
              onAnimationEnd={this.onAnimationEnd}
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
          getContainer ? getContainer() : document.body
        )}
      </React.Fragment>
    );
  }
}

export default ControllSwitchHoc({
  value: "visible",
  defaultValue: "defaultVisible",
  onChange: "onVisibleChange"
})(Tooltip);
