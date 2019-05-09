import PropTypes from "prop-types";
import React, { Component, PureComponent } from "react";
import { createPortal, findDOMNode } from "react-dom";
import styled, { css, keyframes } from "styled-components";
import getPlacements from "./placements";

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

const Layer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`;

const Content = styled.div`
  position: absolute;
  max-width: 300px;
  ${p =>
    p.shouldAnimation &&
    p.visible &&
    css`
      animation: ${p.enterAnimation || enterAnimation} 0.1s forwards;
    `}
  ${p =>
    p.shouldAnimation &&
    !p.visible &&
    css`
      animation: ${p.leaveAnimation || leaveAnimation} 0.1s forwards;
    `}
  ${p => p.defaultStyles}
`;

const Inner = styled.div`
  width: max-content;
  max-width: 100%;
  padding: 6px 8px;
  word-break: break-word;
  min-height: 30px;
  border-radius: 3px;
  ${p =>
    p.theme === "dark"
      ? `background-color: rgba(0, 0, 0, 0.5);box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);color: #ffffff;`
      : `background: #FFFFFF;box-shadow: 0 0 4px 0 rgba(0,0,0,0.20);`}
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
    border: 6px solid transparent;
    ${p =>
      `border-${p.borderDerectionClass}-color: ${
        p.theme === "dark" ? "rgba(0, 0, 0, 0.4)" : "#fff"
      };`}
    ${p => `border-${p.borderDerectionClass}-width`}: 5px;
    position: absolute;
    transition: 0.1s;
    ${p => p.arrowStyle}
  }
`;

class Tooltip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.defaultVisible || false
    };
    this.isConentMount = props.defaultVisible || props.visible;
    this.getPlacement = getPlacements(props.placement, {
      autoAdjustOverflow: props.autoAdjustOverflow,
      arrowPointAtCenter: props.arrowPointAtCenter
    });
    this.shouldFirstAnimation = props.shouldFirstAnimation || false;
    this.childrenRef = React.createRef();
  }
  layerRef;
  contentRef;
  innerRef;
  enterTimer;
  leaveTimer;
  isContentFirstMount = false;
  triggerRect = { x: 0, y: 0, width: 0, height: 0 };
  contentRect = { width: 0, height: 0 };

  componentDidMount() {
    if (this.props.defaultVisible || this.props.visible) {
      this.setAndDisplayContent();
      this.forceUpdate();
    } else {
      this.contentRef && (this.contentRef.style.display = "none");
    }
    this.setTriggerRect();
  }

  componentWillUpdate(nextProps, nextState) {
    if (!this.contentRef && !this.isConentMount) {
      this.isContentFirstMount = true;
      this.isConentMount = true;
    }
    if (nextProps.visible === undefined) {
      // 非受控
      if (nextState.visible !== this.state.visible) {
        nextState.visible && this.setAndDisplayContent();
      }
    } else {
      // 受控
      this.state.visible = nextProps.visible; // render前同步props到state,下面都用this.state.visible
      if (nextProps.visible !== this.props.visible) {
        nextProps.visible && this.setAndDisplayContent();
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    this.shouldFirstAnimation = true;
    if (this.isContentFirstMount) {
      this.setAndDisplayContent();
      this.isContentFirstMount = false;
      this.forceUpdate();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.state.visible !== nextState.visible ||
      this.props.visible !== nextProps.visible
    ) {
      return true;
    }
    return false;
  }

  toggleVisible = bool => {
    this.setState({ visible: bool });
  };

  setAndDisplayContent = () => {
    if (this.contentRef) {
      this.contentRef.style.display = "block";
      this.contentRect = {
        width: this.contentRef.clientWidth,
        height: this.contentRef.clientHeight
      };
    }
  };

  setTriggerRect = () => {
    if (this.childrenRef.current) {
      const childrenNode = findDOMNode(this.childrenRef.current);
      if (childrenNode) {
        const { x, y, height, width } = childrenNode.getBoundingClientRect();
        const documentScrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        this.triggerRect = {
          x,
          y: y + documentScrollTop,
          height,
          width
        };
      }
    }
  };

  getCurrentPlace() {
    return this.getPlacement({
      triggerRect: this.triggerRect,
      contentRect: this.contentRect
    });
  }

  getPopPositionStyle = contentOffset => {
    if (!this.contentRef) return ``;
    return `
      left: ${contentOffset[0]}px;
      top: ${contentOffset[1]}px;
    `;
  };

  onMouseEnter = e => {
    this.leaveTimer && clearTimeout(this.leaveTimer);
  };
  onMouseLeave = e => {
    this.enterTimer && clearTimeout(this.enterTimer);
    this.toggleVisible(false);
  };
  onAnimationStart = e => {
    const { onVisibleChange } = this.props;
    onVisibleChange && this.state.visible && onVisibleChange(true);
  };
  onAnimationEnd = e => {
    const { onVisibleChange } = this.props;
    if (!this.state.visible) {
      this.contentRef.style.display = "none";
      onVisibleChange && onVisibleChange(false);
    }
  };

  onChildrenMouseEnter = e => {
    clearTimeout(this.leaveTimer);
    this.enterTimer = setTimeout(() => {
      this.toggleVisible(true);
      this.enterTimer = null;
    }, this.props.mouseEnterDelay * 1000);
  };
  onChildrenMouseLeave = e => {
    clearTimeout(this.enterTimer);
    this.leaveTimer = setTimeout(() => {
      this.toggleVisible(false);
      this.leaveTimer = null;
    }, this.props.mouseLeaveDelay * 1000);
  };

  render() {
    const {
      defaultStyles,
      className,
      overlayClassName,
      overlayStyles,
      children,
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
    } = this.getCurrentPlace();
    return (
      <React.Fragment>
        {React.cloneElement(
          React.Children.only(children),
          visible !== undefined
            ? { ref: this.childrenRef }
            : {
                onMouseEnter: this.onChildrenMouseEnter,
                onMouseLeave: this.onChildrenMouseLeave,
                ref: this.childrenRef
              }
        )}
        {(this.state.visible || this.isConentMount) &&
          createPortal(
            <Layer
              ref={ref => (this.layerRef = ref)}
              defaultStyles={defaultStyles}
              className={`wjy-tooltip-layer wjy-tooltip-${placement} ${
                className ? className : ""
              }`}
            >
              <Content
                ref={ref => (this.contentRef = ref)}
                className={`wjy-tooltip-conent ${
                  overlayClassName ? overlayClassName : ""
                }`}
                defaultStyles={`
                  ${this.getPopPositionStyle(contentOffset)}
                  ${popBoxStyle}
                  transform-origin: ${transformOrigin};
                  ${overlayStyles || ""}
                `}
                firstAnimation={false}
                enterAnimation={enterAnimation}
                leaveAnimation={leaveAnimation}
                visible={this.state.visible}
                shouldAnimation={this.shouldFirstAnimation}
                onMouseEnter={this.onMouseEnter}
                {...(visible !== undefined
                  ? {}
                  : { onMouseLeave: this.onMouseLeave })}
                onAnimationStart={this.onAnimationStart}
                onAnimationEnd={this.onAnimationEnd}
              >
                <Inner
                  ref={ref => (this.innerRef = ref)}
                  className={`wjy-tooltip-inner`}
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

Tooltip.defaultProps = {
  arrowPointAtCenter: false,
  autoAdjustOverflow: true,
  defaultVisible: false,
  shouldFirstAnimation: false,
  mouseEnterDelay: 0.1,
  mouseLeaveDelay: 0.1,
  placement: "top",
  theme: "dark"
};

Tooltip.propTypes = {
  className: PropTypes.string,
  defaultStyles: PropTypes.string,
  overlayClassName: PropTypes.string,
  overlayStyles: PropTypes.string,
  mouseEnterDelay: PropTypes.number,
  mouseLeaveDelay: PropTypes.number,
  placement: PropTypes.oneOf([
    "top",
    "left",
    "right",
    "bottom",
    "topLeft",
    "leftTop",
    "rightTop",
    "topRight",
    "leftBottom",
    "bottomLeft",
    "bottomRight",
    "rightBottom"
  ]),
  enterAnimation: PropTypes.object,
  leaveAnimation: PropTypes.object,
  defaultVisible: PropTypes.bool,
  getContainer: PropTypes.func,
  onVisibleChange: PropTypes.func,
  shouldFirstAnimation: PropTypes.bool,
  theme: PropTypes.oneOf(["dark", "light"])
};
export default Tooltip;
