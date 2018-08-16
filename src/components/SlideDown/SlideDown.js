import React, { PureComponent } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Wrap = styled.div``;
const Content = styled.div``;
const SubContent = styled.div`
  display: none;
  transition: 0.4s;
  ${p => p.isActive && `display: block`};
`;
class SlideDown extends PureComponent {
  state = {
    isActive: false,
    inited: false
  };
  subNode;
  subHeight;
  componentDidMount() {
    this.subHeight = this.subNode.scrollHeight;
    this.setState({
      inited: true
    });
  }

  render() {
    const { content, children } = this.props;
    return (
      <Wrap className={this.state.isActive ? "active" : null}>
        <Content onClick={this.handleClick}>{content}</Content>
        <SubContent
          innerRef={el => {
            this.subNode = el;
          }}
          isActive={this.state.isActive}
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
    targetNode.style.display = "block";
    targetNode.style.overflow = "hidden";
    targetNode.style.height = 0;

    targetNode.style.height = targetNode.scrollHeight + "px";
  };
  slideUp = targetNode => {
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

    const nextState = !this.state.isActive;
    const propsOnChange = this.props.onChange;

    if (nextState) {
      this.slideDown(this.subNode);
    } else {
      this.slideUp(this.subNode);
    }
    propsOnChange && propsOnChange(nextState);
    this.setState({
      isActive: nextState
    });
  };
}
SlideDown.propTypes = {
  className: PropTypes.string,
  defaultStyles: PropTypes.string,
  content: PropTypes.node,
  onChange: PropTypes.node,
  value: PropTypes.bool,
};
export default SlideDown;
