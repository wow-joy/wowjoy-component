import React, { PureComponent } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Pop from "../Pop";
import ScrollBox from "../ScrollBox";
import ControllSwitchHoc from "../../tools/Hoc/ControllSwitchHoc";

const Wrap = styled.div`
  position: relative;
  ${p => p.defaultStyles};
`;
const Content = styled.div`
  display: flex;
  align-items: center;
`;
const PopControl = styled.i`
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
    marginLeft: "0"
  };
  componentDidMount() {
    window.addEventListener("click", this.onBlur);
    this.popControl&&this.setState({
      marginLeft: `${this.popControl.offsetLeft -
        this.popControl.parentNode.clientWidth}px`
    });
  }
  componentWillUnmount() {
    window.removeEventListener("click", this.onBlur);
  }
  wrapNode;
  popControl;
  render() {
    const { className, defaultStyles, content, children, value } = this.props;
    return (
      <Wrap
        className={`${className} ${value ? "active" : null}`}
        defaultStyles={defaultStyles}
        innerRef={el => {
          this.wrapNode = el;
        }}
      >
        <Content onClick={this.handleClick} className={"wjc-popOut-content"}>
          {content}
          {children && (
            <PopControl
              isActive={value}
              innerRef={el => {
                this.popControl = el;
              }}
            />
          )}
        </Content>
        <PopContent
          className={"wjc-popOut-subContent"}
          visible={value}
          container={false}
          layer={false}
          translate={"translate(0,0)"}
          defaultStyles={`margin-left: ${this.state.marginLeft}`}
        >
          <ScrollBox visible={value}>{children}</ScrollBox>
        </PopContent>
      </Wrap>
    );
  }

  handleClick = e => {
    if (!this.props.children) {
      return false;
    }

    const { onChange, value } = this.props;
    const nextValue = !value;
    onChange && onChange(nextValue);
  };

  onBlur = e => {
    const { onBlur, value, onChange } = this.props;
    if (value && !this.wrapNode.contains(e.target)) {
      if (onBlur && onBlur(e) === false) {
        return;
      }
      onChange && onChange(false);
    }
  };
}

PopOut.propTypes = {
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
})(PopOut);
