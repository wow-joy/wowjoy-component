import React, { PureComponent } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import ControllSwitchHoc from "../../tools/Hoc/ControllSwitchHoc";

const Wrap = styled.div``;
const Content = styled.div`
  cursor: pointer;
`;
const SubContent = styled.div`
  display: none;
  transition: 0.4s;
`;
class SlideDown extends PureComponent {
  state = {
    inited: false
  };
  subNode;
  subHeight;

  wrapNode;
  blur = e => {
    if (!this.wrapNode.contains(e.target)) {
      const { onBlur } = this.props;
      if (onBlur && onBlur() === false) {
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
    window.addEventListener("click", this.blur);
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.blur);
  }

  render() {
    const { content, children, value } = this.props;
    return (
      <Wrap
        className={value ? "active" : null}
        innerRef={el => (this.wrapNode = el)}
      >
        <Content onClick={this.handleClick}>{content}</Content>
        <SubContent
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
