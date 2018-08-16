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
    inited: false
  };
  componentDidMount() {
    window.addEventListener("click", this.onBlur);
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
        <Content onClick={this.handleClick}>
          {content}
          {true && (
            <PopControl
              isActive={value}
              innerRef={el => {
                this.popControl = el;
              }}
            >
              {this.popControl && (
                <PopContent
                  visible={value}
                  container={this.popControl}
                  layer={false}
                  translate={"translate(0,0)"}
                >
                  <ScrollBox visible={value}>{children}</ScrollBox>
                </PopContent>
              )}
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
