import * as React from "react";
import { createPortal } from "react-dom";
import styled, { keyframes, css } from "styled-components";
import ControllSwitchHoc from "../../tools/Hoc/ControllSwitchHoc";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

interface WrapProps {
  visible?: boolean;
  layer: boolean;
  defaultStyles: string;
}
const Layer = styled.div<WrapProps>`
  /* display: ${props => (props.visible ? "block" : "none")}; */
  opacity: 0;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  z-index: 1000;
  background: ${props =>
    props.layer ? "rgba(0, 0, 0, 0.6)" : "rgba(0, 0, 0, 0)"};
  pointer-events: ${props => (props.layer ? "all" : "none")};
  ${props => props.defaultStyles};
  &.fadeIn {
    animation: ${css`
      ${fadeIn} 0.3s forwards
    `};
  }
  &.fadeOut {
    animation: ${css`
      ${fadeOut} 0.3s forwards
    `};
  }
`;

interface PopBoxProps {
  translate: string;
}
const PopBox = styled.div<PopBoxProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1001;
  transition: 0.29s;
  pointer-events: all;
  transform: ${p => `${p.translate || "translate(-50%, -50%)"} scale(0)`};
`;

export interface Props {
  className?: string;
  defaultStyles?: string;
  translate?: string;
  getContainer?: (() => HTMLElement) | false;
  visible?: boolean;
  layer?: boolean;
  onClose?: (e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  autoClose?: boolean | number;
}
class Pop extends React.PureComponent<Props, {}> {
  mousePosition: { x: number; y: number } = { x: 0, y: 0 };
  mousePositionEventBinded: boolean;
  layerRef: HTMLElement;
  popBox: HTMLElement;
  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.visible !== this.props.visible) {
      if (nextProps.visible) {
        this.layerRef.style.display = "block";
        const popBoxWidth = this.popBox.clientWidth;
        const popBoxHeight = this.popBox.clientHeight;
        this.popBox.style.transformOrigin = `${
          this.mousePosition.x
            ? this.mousePosition.x - window.innerWidth / 2 + popBoxWidth / 2
            : 0
        }px ${
          this.mousePosition.y
            ? this.mousePosition.y - window.innerHeight / 2 + popBoxHeight / 2
            : 0
        }px`;
      }
    }
  }
  setMousePosition = (e: MouseEvent) => {
    if (this.props.visible) {
      return;
    }
    this.mousePosition = {
      x: e.pageX,
      y: e.pageY
    };
  };
  componentDidMount() {
    if (this.mousePositionEventBinded) {
      return;
    }
    if (this.props.visible) {
      this.layerRef.style.display = "block";
    } else {
      this.layerRef.style.display = "none";
    }
    // 只有点击事件支持从鼠标位置动画展开
    window.addEventListener("click", this.setMousePosition, true);
    this.mousePositionEventBinded = true;
  }
  componentWillUnmount() {
    window.removeEventListener("click", this.setMousePosition, true);
  }

  animationStartHandle = () => {
    const {
      layerRef,
      popBox,
      props: { translate }
    } = this;
    if (layerRef.classList.contains("fadeIn")) {
      setTimeout(() => {
        popBox.style.transform = `
        ${translate || "translate(-50%, -50%)"} scale(1)
      `;
      }, 100);
    }
    if (layerRef.classList.contains("fadeOut")) {
      popBox.style.transform = `
        ${translate || "translate(-50%, -50%)"} scale(0)
      `;
    }
  };
  animationEndHandle = () => {
    if (this.layerRef.classList.contains("fadeOut")) {
      this.layerRef.style.display = "none";
    }
  };
  closeHandle = (e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { onClose } = this.props;
    onClose && onClose(e);
  };
  layerClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (e.target === this.layerRef) {
      this.closeHandle(e);
    }
  };
  render() {
    const {
      defaultStyles,
      className,
      getContainer,
      layer = true,
      children,
      autoClose = false,
      translate,
      visible
    } = this.props;
    if (visible && autoClose) {
      setTimeout(this.closeHandle, autoClose);
    }

    const Render = (
      <Layer
        onAnimationStart={this.animationStartHandle}
        onAnimationEnd={this.animationEndHandle}
        ref={el => (this.layerRef = el)}
        visible={visible}
        defaultStyles={defaultStyles}
        className={`${className} ${visible ? "fadeIn" : "fadeOut"}`}
        layer={layer}
        onClick={this.layerClick}
      >
        <PopBox ref={el => (this.popBox = el)} translate={translate}>
          {children}
        </PopBox>
      </Layer>
    );
    if (getContainer === false) {
      return Render;
    }
    return createPortal(Render, getContainer ? getContainer() : document.body);
  }
}

export default ControllSwitchHoc({ value: "visible" })(Pop);
