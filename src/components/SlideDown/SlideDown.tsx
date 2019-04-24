import * as React from "react";
import styled from "styled-components";
import ControllSwitchHoc from "../../tools/Hoc/ControllSwitchHoc";

const Wrap = styled.div<{ defaultStyles: string }>`
  ${p => p.defaultStyles};
`;
const Content = styled.div`
  cursor: pointer;
  display: flex;
`;
const SubContent = styled.div<any>`
  display: none;
  transition: 0.4s;
`;

const Control = styled.i<{ isActive: boolean }>`
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
export interface Props {
  className: string;
  defaultStyles: string;
  content: React.ReactNode;
  onChange: (isActive: boolean) => boolean | void;
  onSubClick: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => boolean | void;
  onTransitionEnd: (isSlideDown: boolean) => boolean | void;
  onBlur: (e: MouseEvent) => boolean | void;
  isActive: boolean;
}
interface State {
  inited: boolean;
}
class SlideDown extends React.PureComponent<Props, State> {
  state = {
    inited: false
  };
  subNode: HTMLElement;
  wrapNode: HTMLElement;
  popControl: HTMLElement;
  onBlur = (e: MouseEvent) => {
    const { onBlur, isActive, onChange } = this.props;
    if (!this.subNode) {
      return;
    }

    if (isActive && !this.wrapNode.contains(e.target as HTMLElement)) {
      if (onBlur && onBlur(e) === false) {
        return;
      }
      onChange && onChange(false);
    }
  };
  componentDidMount() {
    this.setState({
      inited: true
    });
    if (this.props.isActive) {
      this.subNode.style.display = "block";
    }
    setTimeout(() => {
      window.addEventListener("click", this.onBlur);
    });
  }
  componentWillReceiveProps(nexrProps: Props) {
    const nextValue = nexrProps.isActive;
    if (this.props.isActive === nextValue) {
      return;
    }
    if (nextValue) {
      this.slideDown(this.subNode);
    } else {
      this.slideUp(this.subNode);
    }
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.onBlur);
  }

  render() {
    const {
      defaultStyles,
      className,
      content,
      children,
      isActive
    } = this.props;

    return (
      <Wrap
        className={`${className} ${isActive ? "open" : ""}`}
        defaultStyles={defaultStyles}
        ref={el => (this.wrapNode = el)}
      >
        <Content onClick={this.handleClick} className={"wjc-slideDown-content"}>
          {content}
          {children && (
            <Control
              isActive={isActive}
              ref={el => {
                this.popControl = el;
              }}
            />
          )}
        </Content>
        {children && (
          <SubContent
            className={"wjc-slieDown-subContent"}
            ref={(el: HTMLElement) => {
              this.subNode = el;
            }}
            inited={this.state.inited}
            onTransitionEnd={this.transitionEndHandle}
            onClick={this.onSubClick}
          >
            {children}
          </SubContent>
        )}
      </Wrap>
    );
  }
  transitionEndHandle = (e: React.TransitionEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    let isSlideDown = false;
    if (target.style.height === "0px") {
      target.style.overflow = "";
      target.style.display = "";
      target.style.height = "";
    } else {
      target.style.overflow = "visible";
      target.style.height = "";
      isSlideDown = true;
    }
    const { onTransitionEnd } = this.props;
    onTransitionEnd && onTransitionEnd(isSlideDown);
  };
  slideDown = (targetNode: HTMLElement) => {
    const propsOnChange = this.props.onChange;
    if (propsOnChange && propsOnChange(true) === false) {
      return;
    }

    targetNode.style.display = "block";
    targetNode.style.overflow = "hidden";
    targetNode.style.height = "0px";
    targetNode.style.height = targetNode.scrollHeight + "px";
  };
  slideUp = (targetNode: HTMLElement) => {
    const propsOnChange = this.props.onChange;
    if (propsOnChange && propsOnChange(false) === false) {
      return;
    }
    targetNode.style.overflow = "hidden";
    targetNode.style.height = targetNode.clientHeight + "px";
    setTimeout(() => {
      targetNode.style.height = "0px";
    });
  };
  handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (!this.subNode) {
      return false;
    }
    const { onChange } = this.props;
    if (onChange && onChange(!this.props.isActive) === false) {
      return;
    }
  };
  onSubClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { onSubClick } = this.props;
    if (onSubClick && onSubClick(e) === false) {
      return;
    }
  };
}

export default ControllSwitchHoc({
  value: "isActive",
  defaultValue: "defaultIsActive"
})(SlideDown);
