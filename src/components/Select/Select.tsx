import * as React from "react";
import styled, { keyframes, css } from "styled-components";
import ControllSwitchHoc from "../../tools/Hoc/ControllSwitchHoc";
import ScrollBox from "../ScrollBox/index";
const defaultColor = "#06aea6";
interface WrapProps {
  defaultStyles?: string;
  active?: boolean | string;
  theme?: { mainColor: string };
}
const Wrap = styled.label<WrapProps>`
  display: block;
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
    if (p.active && p.active !== "init") {
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
  0%{ transform: scaleY(0); opacity: 0};
  1%{ transform: scaleY(0.8); opacity: 0};
  100%{ transform: scaleY(1); opacity: 1};
`;

const slideUp = keyframes`
  0%{ transform: scaleY(1); opacity: 1};
  99%{ transform: scaleY(0.8); opacity: 0};
  100%{ transform: scaleY(0); opacity: 0};
`;

const slideDownAnime = css`
  animation: ${slideDown} 0.3s forwards;
`;
const slideUpAnime = css`
  animation: ${slideUp} 0.3s forwards;
`;
export interface DropDownProps {
  visible?: boolean | string;
  onClick?: (e: React.MouseEvent) => void;
}
const DropDown = styled(ScrollBox)<DropDownProps>`
  display: block;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 10;
  transform: scaleY(0);
  margin-top: 2px;
  border: 1px solid #eaeaea;
  box-shadow: 0px 1px 3px #eaeaea;
  background: #fff;
  transform-origin: 0 0;
  &.top {
    top: auto;
    bottom: 100%;
    box-shadow: 0px -1px 3px #eaeaea;
    transform-origin: 0 100%;
    margin-top: 0px;
    margin-bottom: 2px;
  }
  ${(p: { visible?: boolean | string }) => {
    if (p.visible === "init") {
      return "";
    }
    return p.visible ? slideDownAnime : slideUpAnime;
  }};
`;
const Option = styled.div`
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
  options: Array<{
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
  dropDownVisible: "init" | boolean;
  direction: string;
}
class Select extends React.PureComponent<Props, State> {
  wrapNode: HTMLElement = null;
  dropDownNode: any = null;
  constructor(props: Props) {
    super(props);
    this.state = {
      dropDownVisible: "init",
      direction: "bottom"
    };
  }

  componentDidMount() {
    window.addEventListener("mousedown", this.blur);
  }
  componentWillUnmount() {
    window.removeEventListener("mousedown", this.blur);
  }

  blur = (e: Event) => {
    if (this.props.onBlur && this.props.onBlur(e) === false) {
      return;
    }
    if (this.state.dropDownVisible !== "init") {
      this.setState({
        dropDownVisible: false
      });
    }
  };
  get dropdownDirection() {
    const screenHeight = window.innerHeight;
    const { top, height } = this.wrapNode.getBoundingClientRect();
    const dropDownNode = this.wrapNode.querySelector(".wjc-select-list");
    const dropDownHeight = dropDownNode.scrollHeight;
    if (top + height + dropDownHeight > screenHeight) {
      return "top";
    }
    return "bottom";
  }

  toggleDropDownMenu = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    const direction = this.dropdownDirection;
    const { dropDownVisible } = this.state;
    if (dropDownVisible && dropDownVisible !== "init") {
      this.setState({
        dropDownVisible: false
      });
    } else {
      this.setState({
        dropDownVisible: true,
        direction: direction
      });
    }
  };
  stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

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

  render() {
    const {
      className,
      defaultStyles,
      inputRender: InputNode,
      options = [],
      type = "radio",
      value
    } = this.props;
    const isCheckbox = type === "checkbox";
    const inputNodeValue = isCheckbox
      ? ((value as Array<any>) || []).map(ele =>
          options.find(option => option.value === ele)
        )
      : options.find(option => option.value === value);
    const checkIsActive = (value: any) => {
      const { value: PropValue } = this.props;
      return !isCheckbox
        ? PropValue === value
        : (PropValue as Array<any>).includes(value);
    };
    return (
      <Wrap
        defaultStyles={defaultStyles}
        className={`wjc-select ${className || ""} ${
          this.state.dropDownVisible === true ? "open" : ""
        }`}
        onMouseDown={this.toggleDropDownMenu}
        active={this.state.dropDownVisible}
        ref={el => {
          this.wrapNode = el;
        }}
      >
        <Content>
          {InputNode ? <InputNode value={inputNodeValue} /> : inputNodeValue}
        </Content>
        <DropDown
          className={"wjc-select-list " + this.state.direction}
          ref={el => {
            this.dropDownNode = el;
          }}
          visible={this.state.dropDownVisible}
          onClick={this.stopPropagation}
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
