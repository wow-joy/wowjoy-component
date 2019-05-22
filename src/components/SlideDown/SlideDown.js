import React, { PureComponent } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import ControllSwitchHoc from "../../tools/Hoc/ControllSwitchHoc";

const Wrap = styled.div`
  ${p => p.defaultStyles};
`;
const Content = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;
`;
const SubContent = styled.div`
  display: none;
  transition: 0.4s;
`;
const Control = styled.i`
  display: flex;
  align-items: center;
  position: relative;
  margin-left: 8px;
  cursor: pointer;
  &::after {
    content: "";
    transition: 0.3s;
    border-left: 6px solid currentColor;
    border-top: 4px solid transparent;
    border-bottom: 4px solid transparent;
    width: 0;
    height: 0;
    display: inline-block;
    transform: rotateZ(0deg);
    ${p => p.isActive && `transform: rotateZ(90deg);`};
    vertical-align: middle;
  }
`;
class SlideDown extends PureComponent {
  state = {
    inited: false
  };
  subNode;
  wrapNode;
  onBlur = e => {
    const { onBlur, isActive, onChange } = this.props;
    if (!this.subNode) {
      return;
    }

    if (isActive && !this.wrapNode.contains(e.target)) {
      if (onBlur && onBlur(e) === false) {
        return;
      }
      onChange && onChange(false);
    }
  };
  componentDidMount() {
    this.setState({
      inited: true
    });
    if (this.props.isActive) {
      this.subNode.style.display = "block";
    }
    setTimeout(() => {
      window.addEventListener("click", this.onBlur);
    });
  }
  componentWillReceiveProps(nexrProps) {
    const nextValue = nexrProps.isActive;
    if (this.props.isActive === nextValue) {
      return;
    }
    if (nextValue) {
      this.slideDown(this.subNode);
    } else {
      this.slideUp(this.subNode);
    }
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.onBlur);
  }

  render() {
    const {
      defaultStyles,
      className,
      content,
      children,
      isActive,
      ControlComponent
    } = this.props;
    const ControlIcon = ControlComponent || Control;
    return (
      <Wrap
        className={`${className} ${isActive ? "open" : ""}`}
        defaultStyles={defaultStyles}
        ref={el => (this.wrapNode = el)}
      >
        <Content onClick={this.handleClick} className={"wjc-slideDown-content"}>
          {content}
          {children && (
            <ControlIcon
              ref={el => {
                this.popControl = el;
              }}
            />
          )}
        </Content>
        {children && (
          <SubContent
            className={"wjc-slieDown-subContent"}
            ref={el => {
              this.subNode = el;
            }}
            inited={this.state.inited}
            onTransitionEnd={this.transitionEndHandle}
            onClick={this.onSubClick}
          >
            {children}
          </SubContent>
        )}
      </Wrap>
    );
  }
  transitionEndHandle = e => {
    let isSlideDown = false;
    if (e.target.style.height === "0px") {
      e.target.style = undefined;
    } else {
      e.target.style.overflow = "visible";
      e.target.style.height = "";
      isSlideDown = true;
    }
    const { onTransitionEnd } = this.props;
    onTransitionEnd && onTransitionEnd(isSlideDown);
  };
  slideDown = targetNode => {
    const propsOnChange = this.props.onChange;
    if (propsOnChange && propsOnChange(true) === false) {
      return;
    }

    targetNode.style.display = "block";
    targetNode.style.overflow = "hidden";
    targetNode.style.height = 0;
    targetNode.style.height = targetNode.scrollHeight + "px";
  };
  slideUp = targetNode => {
    const propsOnChange = this.props.onChange;
    if (propsOnChange && propsOnChange(false) === false) {
      return;
    }
    targetNode.style.overflow = "hidden";
    const cHeight = targetNode.clientHeight + "px";
    requestAnimationFrame(() => {
      targetNode.style.height = cHeight;
      requestAnimationFrame(() => (targetNode.style.height = 0));
    });
  };
  handleClick = e => {
    if (!this.subNode) {
      return false;
    }
    const { onChange } = this.props;
    if (onChange && onChange(!this.props.isActive) === false) {
      return;
    }
  };
  onSubClick = e => {
    const { onSubClick } = this.props;
    if (onSubClick && onSubClick(e) === false) {
      return;
    }
  };
}
SlideDown.propTypes = {
  className: PropTypes.string,
  defaultStyles: PropTypes.string,
  content: PropTypes.node,
  onChange: PropTypes.func,
  onSubClick: PropTypes.func,
  onTransitionEnd: PropTypes.func,
  onBlur: PropTypes.func,
  isActive: PropTypes.bool,
  ControlComponent: PropTypes.oneofType([PropTypes.func, PropTypes.object])
};
export default ControllSwitchHoc({
  value: "isActive",
  defaultValue: "defaultIsActive"
})(SlideDown);
