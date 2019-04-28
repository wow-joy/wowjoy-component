import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled, { keyframes, css } from "styled-components";
import ControllSwitchHoc from "../../tools/Hoc/ControllSwitchHoc";
const defaultColor = "#06aea6";
const Wrap = styled.div`
  user-select: none;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  height: 100%;
  width: 100%;
  background: #fff;
  padding: 0 10px;
  position: relative;
  cursor: pointer;
  ${p => {
    const color = p.theme.mainColor || defaultColor;
    if (p.active) {
      return `
         box-shadow: inset 0 0 4px ${color};
         border-color: ${color};`;
    }
  }};
  &::after {
    content: "";
    border-top: 4px solid #999;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    display: block;
    position: absolute;
    right: 10px;
    top: 0;
    bottom: 0;
    height: 0;
    margin: auto;
    cursor: pointer;
  }

  ${props => props.defaultStyles};
`;
const Content = styled.div`
  display: flex;
  align-items: center;
`;
const slideDown = keyframes`
  from{ transform: scaleY(0.8); opacity: 0};
  to{ transform: scaleY(1); opacity: 1};
`;

const slideUp = keyframes`
  from{ transform: scaleY(1); opacity: 1};
  to{ transform: scaleY(0.8); opacity: 0};
`;

const slideDownAnime = css`
  animation: ${slideDown} 0.3s forwards;
`;
const slideUpAnime = css`
  animation: ${slideUp} 0.3s forwards;
`;

const DropDown = styled.ul`
  border: 1px solid #eaeaea;
  box-shadow: 0px 1px 3px #eaeaea;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  width: 100%;
  margin-top: 2px;
  background: #fff;
  transform-origin: 0 0;
  display: none;
  ${p => (p.visible ? slideDownAnime : slideUpAnime)};
`;
const Option = styled.li`
  padding: 6px 10px;
  width: 100%;
  display: block;
  &:hover {
    background: #fffbe0;
  }
`;

class Select extends PureComponent {
  state = {
    dropDownVisible: false
  };
  blur = e => {
    if (this.props.onBlur && this.props.onBlur() === false) {
      return;
    }
    this.setState({
      dropDownVisible: false
    });
  };
  componentDidMount() {
    window.addEventListener("click", this.blur);
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.blur);
  }
  focus = () => {
    const { onFocus } = this.props;
    if (onFocus && onFocus() === false) {
      return;
    }
    this.setState(prevState => {
      if (!prevState.dropDownVisible) {
        this.dropDownNode.style.display = "block";
      }
      return {
        dropDownVisible: true
      };
    });
  };
  blur = () => {
    const { onBlur } = this.props;
    if (onBlur && onBlur() === false) {
      return;
    }
    this.setState(prevState => {
      return {
        dropDownVisible: false
      };
    });
  };

  toggleDropDownMenu = e => {
    e.stopPropagation();
    const { onFocus, onBlur } = this.props;
    if (!this.state.dropDownVisible) {
      if (onFocus && onFocus(e) === false) {
        return;
      }
    } else {
      if (onBlur && onBlur(e) === false) {
        return;
      }
    }
    this.setState(prevState => {
      if (!prevState.dropDownVisible) {
        this.dropDownNode.style.display = "block";
      }

      return {
        dropDownVisible: !prevState.dropDownVisible
      };
    });
  };

  stopPropagation = e => e.stopPropagation();

  getNextValue = (optionItem, type) => {
    if (type === "radio") {
      return optionItem.value;
    }
    if (type === "checkbox") {
      const toggleValue = (prevProps, value) => {
        const findedIndex = prevProps.value.findIndex(ele => ele === value);
        let midVal = [...prevProps.value];
        findedIndex >= 0 ? midVal.splice(findedIndex, 1) : midVal.push(value);
        return midVal;
      };
      return this.props.value === false
        ? [optionItem.value]
        : toggleValue(this.props, optionItem.value);
    }
  };

  selectOption = (optionItem, index) => e => {
    const { type = "radio" } = this.props;
    if (
      this.props.onSelect &&
      this.props.onSelect(optionItem, index) === false
    ) {
      return;
    }

    const nextValue = this.getNextValue(optionItem, type);

    this.props.onChange(nextValue, index, optionItem);

    if (type === "radio") {
      this.setState({
        dropDownVisible: false
      });
    }
  };

  animationEndHandle = () => {
    if (!this.state.dropDownVisible) {
      this.dropDownNode.style.display = "none";
    }
  };

  render() {
    const {
      className,
      defaultStyles,
      inputRender,
      options = [],
      type = "radio",
      children
    } = this.props;
    const InputNode = inputRender;
    const inputNodeValue =
      type === "checkbox"
        ? (this.props.value || []).map(ele =>
            options.find(option => option.value === ele)
          )
        : options.find(ele => ele.value === this.props.value);
    const checkIsActive = value => {
      return type !== "checkbox"
        ? this.props.value === value
        : this.props.value.includes(value);
    };
    return (
      <Wrap
        defaultStyles={defaultStyles}
        className={`wjc-select ${className} ${
          this.state.dropDownVisible ? "open" : ""
        }`}
        onClick={this.toggleDropDownMenu}
        active={this.state.dropDownVisible}
      >
        <Content>{InputNode && <InputNode value={inputNodeValue} />}</Content>
        <DropDown
          className={"wjc-select-list"}
          ref={el => {
            this.dropDownNode = el;
          }}
          visible={this.state.dropDownVisible}
          onClick={this.stopPropagation}
          onAnimationEnd={this.animationEndHandle}
        >
          {options.map((optionItem, index) => (
            <Option
              key={optionItem.value}
              className={checkIsActive(optionItem.value) ? "active" : ""}
              onClick={this.selectOption(optionItem, index)}
            >
              {optionItem.labelRender
                ? optionItem.labelRender(checkIsActive(optionItem.value))
                : optionItem.label}
            </Option>
          ))}
          {children}
        </DropDown>
      </Wrap>
    );
  }
}

Select.propTypes = {
  className: PropTypes.string,
  defaultStyles: PropTypes.string,
  options: PropTypes.array,
  inputRender: PropTypes.func,
  onFocus: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.number,
    PropTypes.string
  ]),
  onChange: PropTypes.func,
  type: PropTypes.oneOf(["radio", "checkbox"]),
  onBlur: PropTypes.func
};
export default ControllSwitchHoc({
  value: "value",
  defaultValue: "defaultValue"
})(Select);
