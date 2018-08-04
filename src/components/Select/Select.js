import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";

const Wrap = styled.div`
  user-select: none;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  height: 100%;
  width: 100%;
  background: #fff;
  padding: 8px 10px;
  position: relative;
  cursor: pointer;
  ${p =>
    p.active &&
    `
    box-shadow: inset 0 0 4px #06AEA6;
    border-color: #06AEA6
  `} &::after {
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
const slideDown = keyframes`
  from{ transform: scaleY(0.8); opacity: 0};
  to{ transform: scaleY(1); opacity: 1};
`;
const slideUp = keyframes`
  from{ transform: scaleY(1); opacity: 1};
  to{ transform: scaleY(0.8); opacity: 0};
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
  animation: ${p => (p.visible ? slideDown : slideUp)} 0.3s forwards;
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
    dropDownVisible: false,
    value:  this.props.initValue || false
  };
  blur = e => {
    if(this.props.onBlur&& (this.props.onBlur() === false)){
      return 
    }
    this.setState({
      dropDownVisible: false
    })
  }
  componentDidMount() {
    window.addEventListener('click', this.blur)
  }
  
  componentWillReceiveProps(nextProps) {
    if (this.state.value === false && nextProps.initValue) {
      this.setState({
        value: nextProps.initValue
      });
    }
  }

  componentWillUnmount(){
    window.removeEventListener('click', this.blur)
  }
  toggleDropDownMenu = e => {
    e.stopPropagation()
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

  selectOption = (optionItem, index) => e => {
    const { type = "radio" } = this.props;
    if (
      this.props.onSelect &&
      this.props.onSelect(optionItem, index) === false
    ) {
      return;
    }

    if (type === "radio") {
      this.setState({
        value: optionItem.value,
        dropDownVisible: false
      });
    }
    if (type === "checkbox") {
      const toggleValue = (prevState, value) => {
          const findedIndex = prevState.value.findIndex(ele=>ele === value);
          let midVal = [...prevState.value];
          findedIndex >= 0 ? midVal.splice(findedIndex, 1) : midVal.push(value);
          return {
            value: midVal
          };
      };
      this.setState(prevState => {
        if (prevState.value === false) {
          return [optionItem.value]
        } else {
          return toggleValue(prevState, optionItem.value);
        }
      });
    }

    this.props.onChange(optionItem, index);
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
      options,
      type = "radio"
    } = this.props;
    const InputNode = inputRender;
    const inputNodeValue =
      type === "checkbox"
        ? (this.state.value || []).map(ele =>
            options.find(option => option.value === ele)
          )
        : options.find(ele => ele.value === this.state.value);

    return (
      <Wrap
        defaultStyles={defaultStyles}
        className={className}
        onClick={this.toggleDropDownMenu}
        active={this.state.dropDownVisible}
      >
        <InputNode value={inputNodeValue} />
        <DropDown
          innerRef={el => {
            this.dropDownNode = el;
          }}
          visible={this.state.dropDownVisible}
          onClick={this.stopPropagation}
          onAnimationEnd={this.animationEndHandle}
        >
          {options.map((optionItem, index) => (
            <Option key={index} onClick={this.selectOption(optionItem, index)}>
              {optionItem.labelRender ? optionItem.labelRender(type!=="checkbox"?this.state.value === optionItem.value: this.state.value.includes(optionItem.value)) : optionItem.label}
            </Option>
          ))}
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
  initValue: PropTypes.oneOfType([PropTypes.array, PropTypes.number, PropTypes.string]),
  type: PropTypes.oneOf(["radio", "checkbox"]),
  onBlur: PropTypes.func,
};
export default Select;
