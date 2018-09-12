import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import styled, { keyframes } from "styled-components";
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
const Layer = styled.div`
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
    animation: ${fadeIn} 0.3s forwards;
  }
  &.fadeOut {
    animation: ${fadeOut} 0.3s forwards;
  }
`;
const PopBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1001;
  transition: 0.29s;
  pointer-events: all;
  transform:${p=> `${p.translate || "translate(-50%, -50%)"} scale(0)`};
`;

let mousePositionEventBinded;
class Pop extends PureComponent {
  mousePosition = { x: 0, y: 0 };

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      if (nextProps.value) {
        this.layerRef.style.display = "block";
        const popBoxWidth = this.popBox.clientWidth
        const popBoxHeight = this.popBox.clientHeight
        this.popBox.style.transformOrigin = `${
          this.mousePosition.x
            ? this.mousePosition.x - window.innerWidth / 2 + popBoxWidth/2
            : 0
        }px ${
          this.mousePosition.y
            ? this.mousePosition.y - window.innerHeight / 2 + popBoxHeight/2
            : 0
        }px`;
      }
    }
  }
  setMousePosition = e => {
    if (this.props.value) {
      return;
    }
    this.mousePosition = {
      x: e.pageX,
      y: e.pageY
    };
  };
  componentDidMount() {
    if (mousePositionEventBinded) {
      return;
    }
    if (this.props.value) {
      this.layerRef.style.display = "block";
    } else {
      this.layerRef.style.display = "none";
    }
    // 只有点击事件支持从鼠标位置动画展开
    window.addEventListener("click", this.setMousePosition);
    mousePositionEventBinded = true;
  }
  componentWillUnmount() {
    window.removeEventListener("click", this.setMousePosition);
  }

  animationStartHandle = () => {
    const { translate } = this.props;
    const popBoxWidth = this.popBox.clientWidth
    const popBoxHeight = this.popBox.clientHeight
    if (this.layerRef.classList.contains("fadeIn")) {
      setTimeout(()=>{
        this.popBox.style.transform = `
        ${translate || "translate(-50%, -50%)"} scale(1)
      `;
      },100)
    }
    if (this.layerRef.classList.contains("fadeOut")) {
      this.popBox.style.transform = `
        ${translate || "translate(-50%, -50%)"} scale(0)
      `;
    }
  };
  animationEndHandle = () => {
    if (this.layerRef.classList.contains("fadeOut")) {
      this.layerRef.style.display = "none";
    }
  };
  closeHandle = e => {
    const { onClose } = this.props;
    onClose(e);
  };
  layerClick = e => {
    e.stopPropagation();
    if (e.target === this.layerRef) {
      this.closeHandle(e);
    }
  };
  render() {
    const {
      defaultStyles,
      className,
      container = document.body,
      layer = true,
      children,
      autoClose = false,
      translate,
      value
    } = this.props;
    if (value && autoClose) {
      setTimeout(this.closeHandle, autoClose);
    }

    const Render = (
      <Layer
        onAnimationStart={this.animationStartHandle}
        onAnimationEnd={this.animationEndHandle}
        innerRef={el => (this.layerRef = el)}
        visible={value}
        defaultStyles={defaultStyles}
        className={`${className} ${value ? "fadeIn" : "fadeOut"}`}
        layer={layer}
        onClick={this.layerClick}
      >
        <PopBox innerRef={el => (this.popBox = el)} translate={translate}>
          {children}
        </PopBox>
      </Layer>
    );
    if (container === false) {
      return Render;
    }
    return createPortal(Render, container);
  }
}

Pop.propTypes = {
  className: PropTypes.string,
  defaultStyles: PropTypes.string,
  translate: PropTypes.string,
  container: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  value: PropTypes.bool,
  layer: PropTypes.bool,
  onClose: PropTypes.func,
  autoClose: PropTypes.oneOfType([PropTypes.number, PropTypes.bool])
};
export default ControllSwitchHoc({ value: "visible" })(Pop);
