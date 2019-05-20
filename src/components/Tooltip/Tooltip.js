import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { createPortal, findDOMNode } from "react-dom";
import styled, { css, keyframes } from "styled-components";
import getPlacements from "./placements";
import ControllSwitchHoc from "./ControllSwitchHoc";
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

const TriggerBox = styled.span`
  display: inline-block;
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

const Inner = styled.div`
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

class Tooltip extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      contentRect: { width: 0, height: 0 },
      triggerRect: { x: 0, y: 0, width: 0, height: 0 }
    };
    this.getPlacement = getPlacements(props.placement, {
      autoAdjustOverflow: props.autoAdjustOverflow,
      arrowPointAtCenter: props.arrowPointAtCenter
    });
    this.setScrollOffset();
  }
  layerRef;
  contentRef;
  innerRef;
  enterTimer;
  leaveTimer;
  triggerNode;
  componentDidMount() {
    if (this.props.visible) {
      this.contentRef.style.display = "block";
      this.setContentRect();
    } else {
      this.contentRef.style.display = "none";
    }
    this.setTriggerRect();
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.visible !== this.props.visible) {
      if (nextProps.visible) {
        this.contentRef.style.display = "block";
        this.setContentRect();
      }
      if (this.props.isControlled) {
        this.props.onVisibleChange && this.props.onVisibleChange(nextProps.visible);
      }
    }
    this.setTriggerRect();
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
    const { x, y, height, width } = this.getTriggerNode().getBoundingClientRect();
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
    this.props.onVisibleChange && this.props.onVisibleChange(false);
  };
  onAnimationEnd = e => {
    if (!this.props.visible) {
      this.contentRef.style.display = "none";
    }
  };

  onChildrenMouseEnter = e => {
    this.setScrollOffset();
    this.setTriggerRect();
    clearTimeout(this.leaveTimer);
    this.enterTimer = setTimeout(() => {
      this.props.onVisibleChange && this.props.onVisibleChange(true);
      this.enterTimer = null;
    }, this.props.mouseEnterDelay * 1000);
  };
  onChildrenMouseLeave = e => {
    clearTimeout(this.enterTimer);
    this.leaveTimer = setTimeout(() => {
      this.props.onVisibleChange && this.props.onVisibleChange(false);
      this.leaveTimer = null;
    }, this.props.mouseLeaveDelay * 1000);
  };

  getChildren = () => {
    const { children, isControlled } = this.props;
    let triggerProps = isControlled
      ? {}
      : {
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
    return React.cloneElement(this.props.children, {
      ...triggerProps,
      ref: node => {
        this.childrenRef = node;
        const { ref } = this.props.children;
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
export default ControllSwitchHoc({
  value: "visible",
  defaultValue: "defaultVisible",
  onChange: "onVisibleChange"
})(Tooltip);
