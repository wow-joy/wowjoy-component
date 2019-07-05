import * as React from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import ControllSwitchHoc from "../../tools/Hoc/ControllSwitchHoc";

interface WrapProps {
  visible?: boolean;
  layer?: boolean;
  defaultStyles?: string;
}
const Layer = styled.div<WrapProps>`
  display: ${props => (props.visible ? "flex" : "none")};
  align-items: center;
  justify-content: center;
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
`;

interface PopBoxProps {
  translate: string;
}
const PopBox = styled.div<PopBoxProps>`
  position: absolute;
  z-index: 1001;
  transition: 0.29s;
  pointer-events: all;
`;

export interface Props {
  className?: string;
  defaultStyles?: string;
  translate?: string;
  getContainer?: (() => HTMLElement) | false;
  visible?: boolean;
  layer?: boolean;
  onClose?: (e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  autoClose?: false | number;
  onVisibleChange?: (visible: boolean) => void;
}
class Pop extends React.PureComponent<Props, {}> {
  mousePosition: { x: number; y: number } = { x: 0, y: 0 };
  layerRef: HTMLElement;
  popBox: HTMLElement;

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
    if (visible && autoClose !== false) {
      setTimeout(this.closeHandle, autoClose);
    }
    const Render = (
      <Layer
        ref={el => (this.layerRef = el)}
        visible={visible}
        defaultStyles={defaultStyles}
        className={`${className} ${visible ? "visible" : ""}`}
        layer={layer}
        onClick={this.layerClick}
      >
        <PopBox
          className="wjc-pop-box"
          ref={el => (this.popBox = el)}
          translate={translate}
        >
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
