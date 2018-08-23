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
  subHeight;

  wrapNode;
  onBlur = e => {
    const { onBlur, value } = this.props;
    if (value && !this.wrapNode.contains(e.target)) {
      if (onBlur && onBlur(e) === false) {
        return;
      }
      this.slideUp(this.subNode);
    }
  };
  componentDidMount() {
    this.subHeight = this.subNode.scrollHeight;
    this.setState({
      inited: true
    });
    if (this.props.value) {
      this.subNode.style.display = "block";
    }
    setTimeout(() => {
      window.addEventListener("click", this.onBlur);
    });
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.onBlur);
  }

  render() {
    const { defaultStyles, className, content, children, value } = this.props;

    return (
      <Wrap
        className={`${className} ${value ? "active" : null}`}
        defaultStyles={defaultStyles}
        innerRef={el => (this.wrapNode = el)}
      >
        <Content onClick={this.handleClick} className={"wjc-slieDown-content"}>
          {content}
          {children && (
            <Control
              isActive={value}
              innerRef={el => {
                this.popControl = el;
              }}
            />
          )}
        </Content>
        <SubContent
          className={"wjc-slieDown-subContent"}
          innerRef={el => {
            this.subNode = el;
          }}
          inited={this.state.inited}
          onTransitionEnd={this.transitionEndHandle}
        >
          {children}
        </SubContent>
      </Wrap>
    );
  }
  transitionEndHandle = e => {
    if (e.target.style.height === "0px") {
      e.target.style = undefined;
    } else {
      e.target.style.overflow = "visible";
      e.target.style.height = "";
    }
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
    targetNode.style.height = targetNode.clientHeight + "px";
    targetNode.style.overflow = "hidden";
    setTimeout(() => {
      targetNode.style.height = 0;
    });
  };
  handleClick = e => {
    if (!this.props.children) {
      return false;
    }

    const nextValue = !this.props.value;

    if (nextValue) {
      this.slideDown(this.subNode);
    } else {
      this.slideUp(this.subNode);
    }
  };
}
SlideDown.propTypes = {
  className: PropTypes.string,
  defaultStyles: PropTypes.string,
  content: PropTypes.node,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.bool
};
export default ControllSwitchHoc({
  value: "isActive",
  defaultValue: "defaultIsActive"
})(SlideDown);
