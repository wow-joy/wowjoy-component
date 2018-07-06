import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import styled from "styled-components";

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
      setTimeout(() => (mousePosition = {}));
    });
    mousePositionEventBinded = true;
  }
  closeHandle = () => {
    const { onClose } = this.props;
    if (onClose && onClose() === false) {
      return;
    }
    this.setState({ visible: false });
  };
  layerClick = e => {
    e.stopPropagation();
    if (e.target === this.layerRef) {
      this.closeHandle();
    }
  };
  render() {
    const {
      defaultStyles,
      className,
      container = document.body,
      layer = true,
      children,
      autoClose = false
    } = this.props;

    if (this.state.visible && autoClose) {
      setTimeout(this.closeHandle, autoClose);
    }

    return createPortal(
      <Layer
        innerRef={el => (this.layerRef = el)}
        visible={this.state.visible}
        defaultStyles={defaultStyles}
        className={className}
        layer={layer}
        onClick={this.layerClick}
      >
        <PopBox visible={this.state.visible} mousePosition={mousePosition}>
          {children}
        </PopBox>;
      </Layer>,
      container
    );
  }
}

Pop.propTypes = {
  className: PropTypes.string,
  defaultStyles: PropTypes.string,
  container: PropTypes.node,
  visible: PropTypes.bool,
  layer: PropTypes.bool,
  onClose: PropTypes.func,
  autoClose: PropTypes.oneOfType([PropTypes.number, PropTypes.bool])
};
export default Pop;
