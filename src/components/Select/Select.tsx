import * as React from "react";
import styled, { keyframes, css } from "styled-components";
import ControllSwitchHoc from "../../tools/Hoc/ControllSwitchHoc";
const defaultColor = "#06aea6";
interface WrapProps {
  defaultStyles?: string;
  active?: boolean;
  theme?: { mainColor: string };
}
const Wrap = styled.div<WrapProps>`
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
  ${(p: { visible?: boolean }) => (p.visible ? slideDownAnime : slideUpAnime)};
`;
const Option = styled.li`
  padding: 6px 10px;
  width: 100%;
  display: block;
  &:hover {
    background: #fffbe0;
  }
`;
export interface Props {
  className?: string;
  defaultStyles?: string;
  options?: Array<{
    labelRender?: (checkIsActive: boolean) => React.ReactNode;
    value?: any;
    label?: React.ReactNode;
  }>;
  inputRender?: React.ReactType;
  value?: Array<any> | number | string | boolean;
  onChange?: (nextValue: any, index: number, optionItem: object) => void;
  type?: "radio" | "checkbox";
  onBlur?: (e: Event) => boolean | void;
  onSelect?: (optionItem: {}, index: number) => boolean | void;
}
interface State {
  dropDownVisible: boolean;
}
class Select extends React.PureComponent<Props, State> {
  state = {
    dropDownVisible: false
  };
  dropDownNode: HTMLElement = null;
  blur = (e: Event) => {
    if (this.props.onBlur && this.props.onBlur(e) === false) {
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
  toggleDropDownMenu = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    this.setState(prevState => {
      if (!prevState.dropDownVisible) {
        this.dropDownNode.style.display = "block";
      }
      return {
        dropDownVisible: !prevState.dropDownVisible
      };
    });
  };

  stopPropagation = (e: React.MouseEvent<HTMLElement, MouseEvent>) =>
    e.stopPropagation();

  getNextValue = (
    optionItem: {
      labelRender?: (checkIsActive: boolean) => React.ReactNode;
      value?: any;
      label?: React.ReactNode;
    },
    type: "radio" | "checkbox" | null
  ) => {
    if (type === "radio") {
      return optionItem.value;
    }
    if (type === "checkbox") {
      const toggleValue = (prevProps: Props, value: any) => {
        const prevValue = prevProps.value as Array<any>;
        const findedIndex = prevValue.findIndex((ele: any) => ele === value);
        let midVal = [...prevValue];
        findedIndex >= 0 ? midVal.splice(findedIndex, 1) : midVal.push(value);
        return midVal;
      };
      return this.props.value === false
        ? [optionItem.value]
        : toggleValue(this.props, optionItem.value);
    }
  };

  selectOption = (optionItem: {}, index: number) => (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
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
      inputRender: InputNode,
      options = [],
      type = "radio"
    } = this.props;
    const inputNodeValue =
      type === "checkbox"
        ? ((this.props.value as Array<any>) || []).map(ele =>
            options.find(option => option.value === ele)
          )
        : options.find(ele => ele.value === this.props.value);
    const checkIsActive = (value: any) => {
      const { value: PropValue } = this.props;
      return type !== "checkbox"
        ? PropValue === value
        : (PropValue as Array<any>).includes(value);
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
        </DropDown>
      </Wrap>
    );
  }
}

export default ControllSwitchHoc({
  value: "value",
  defaultValue: "defaultValue"
})(Select);
