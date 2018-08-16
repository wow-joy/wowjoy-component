import React, { PureComponent } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Pop from "../Pop";
import ScrollBox from "../ScrollBox";
import ControllSwitchHoc from "../../tools/Hoc/ControllSwitchHoc";

const Wrap = styled.div`
  position: relative;
`;
const Content = styled.div`
  background: #eaeaea;
  display: flex;
  align-items: center;
`;
const PopControl = styled.div`
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
const PopContent = styled(Pop)`
  overflow: visible;
  left: 100%;
  top: 100%;
  right: auto;
  bottom: auto;
  & > div {
    transform-origin: 0 0;
    pointer-events: all;
  }
`;
class PopOut extends PureComponent {
  state = {
    isActive: undefined,
    inited: false,
    container: undefined
  };
  componentDidMount() {
    this.setState({
      container: this.popControl
    });
    // window.onClick = e=>{
    //   e.target.
    // }
    window.addEventListener("click", this.close);
  }
  wrap;
  popControl;
  render() {
    const { content, children } = this.props;
    return (
      <Wrap
        className={this.state.isActive ? "active" : null}
        innerRef={el => {
          this.wrap = el;
        }}
      >
        <Content onClick={this.handleClick}>
          {content}
          {children && (
            <PopControl
              isActive={this.state.isActive}
              innerRef={el => {
                this.popControl = el;
              }}
            >
              <PopContent
                visible={this.state.isActive}
                container={this.state.container}
                layer={false}
                translate={"translate(0,0)"}
              >
                <ScrollBox visible={this.state.isActive}>{children}</ScrollBox>
              </PopContent>
            </PopControl>
          )}
        </Content>
      </Wrap>
    );
  }

  handleClick = e => {
    if (!this.props.children) {
      return false;
    }
    const nextState = !this.state.isActive;
    const propsOnChange = this.props.onChange;

    propsOnChange && propsOnChange(nextState);
    this.setState({
      isActive: nextState
    });
  };
  close = e => {
    if (this.wrap.contains(e.target) || this.state.isActive === undefined) {
      return;
    }
    this.setState({
      isActive: false
    });
  };
}

export default PopOut;
