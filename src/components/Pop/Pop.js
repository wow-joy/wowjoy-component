import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { keyframes } from "styled-components";

const Layer = styled.div`
  opacity: ${props => (props.visible ? 1 : 0)};
  transition: 0.3s;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  z-index: ${props => (props.visible ? 1000 : -1000)};
  background: ${props =>
    props.layer ? "rgba(0, 0, 0, 0.6)" : "rgba(0, 0, 0, 0)"};
  pointer-events: ${props => (props.layer && props.visible ? "all" : "none")};
  ${props => props.defaultStyles};
`;
const PopBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%)
    ${props => (props.visible ? "scale(1)" : "scale(0)")};
  z-index: 1001;
  transition: 0.3s;
  transform-origin: ${props =>
    `${props.mousePosition.x - window.innerWidth / 2}px ${props.mousePosition
      .y -
      window.innerHeight / 2}px`};
`;

let mousePosition = { x: 497, y: 650 };
let mousePositionEventBinded;
class Pop extends PureComponent {
  constructor(props) {
    super();
    this.state = {
      visible: props.visible
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible !== this.props.visible) {
      console.log(nextProps.visible);
      this.setState({ visible: nextProps.visible });
    }
  }
  componentDidMount() {
    if (mousePositionEventBinded) {
      return;
    }
    // 只有点击事件支持从鼠标位置动画展开
    window.addEventListener("click", e => {
      mousePosition = {
        x: e.pageX,
        y: e.pageY
      };
      // 100ms 内发生过点击事件，则从点击位置动画展示
      // 否则直接 zoom 展示
      // 这样可以兼容非点击方式展开
      setTimeout(() => (mousePosition = {}));
    });
    mousePositionEventBinded = true;
  }
  // transitionEndHandle = e => {
  //   e.target.style.display = this.state.visible ? `block` : `none`;
  // };
  closeHandle = e => {
    e.preventDefault();
    e.stopPropagation();
    const { onClose } = this.props;
    if (onClose && onClose() === false) {
      return;
    }
    console.log(1);
    this.setState({ visible: false });
  };
  render() {
    const {
      visible,
      defaultStyles,
      className,
      animeShow,
      animeHide,
      container,
      layer,
      onClose,
      children,
      autoClose
    } = this.props;
    // if (!this.state.visible) {
    //   return null;
    // }
    if (this.state.visible && autoClose) {
      setTimeout(() => this.setState({ visible: false }), autoClose);
    }
    return createPortal(
      <Layer
        ref={el => (this.LayerRef = el)}
        onTransitionEnd={this.transitionEndHandle}
        visible={this.state.visible}
        defaultStyles={defaultStyles}
        className={className}
        layer={layer}
        onClick={this.closeHandle}
      >
        <PopBox visible={this.state.visible} mousePosition={mousePosition}>
          {children}
        </PopBox>;
      </Layer>,
      container || document.body
    );
  }
}

Pop.propTypes = {
  className: PropTypes.string,
  defaultStyles: PropTypes.string
};
export default Pop;
