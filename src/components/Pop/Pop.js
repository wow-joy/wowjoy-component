import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { pubSub } from "../../tools";

const Layer = styled.div`
  display: none;
  opacity: ${props => (props.visible ? 1 : 0)};
  transition: 0.3s;
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
const PopBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%)
    ${props => (props.visible ? "scale(1)" : "scale(0)")};
  z-index: 1001;
  transition: 0.3s;
  transform-origin: ${props =>
    `${
      props.mousePosition.x ? props.mousePosition.x - window.innerWidth / 2 : 0
    }px ${
      props.mousePosition.y ? props.mousePosition.y - window.innerHeight / 2 : 0
    }px`};
`;

let mousePositionEventBinded;
class Pop extends PureComponent {
  constructor(props) {
    super();
    this.state = {
      visible: props.visible
    };
  }
  transitionendCallbacks = new pubSub(); // 动画回调 @returns {add, remove, clear, publish}
  mousePosition = { x: 0, y: 0 };
  componentWillReceiveProps(nextProps) {
    if (nextProps.visible !== this.props.visible) {
      if (nextProps.visible) {
        this.layerRef.style.display = "block";
        this.transitionendCallbacks.clear();
      }
      // TODO: async event makes 2th render
      setTimeout(() => {
        this.setState({ visible: nextProps.visible });
      });
    }
  }

  componentDidMount() {
    if (mousePositionEventBinded) {
      return;
    }
    // 只有点击事件支持从鼠标位置动画展开
    window.addEventListener("click", e => {
      if (!this.state.visible) {
        this.mousePosition = {
          x: e.pageX,
          y: e.pageY
        };
      }
    });
    mousePositionEventBinded = true;
  }
  transitionEndHandle = () => {
    this.transitionendCallbacks.publish();
  };
  closeHandle = e => {
    const { onClose } = this.props;
    if (onClose && onClose(e) === false) {
      return;
    }
    this.transitionendCallbacks.add(
      () => (this.layerRef.style.display = "none")
    );
    this.setState({ visible: false });
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
      autoClose = false
    } = this.props;
    console.log('render')
    if (this.state.visible && autoClose) {
      setTimeout(this.closeHandle, autoClose);
    }

    return createPortal(
      <Layer
        onTransitionEnd={this.transitionEndHandle}
        innerRef={el => (this.layerRef = el)}
        visible={this.state.visible}
        defaultStyles={defaultStyles}
        className={className}
        layer={layer}
        onClick={this.layerClick}
      >
        <PopBox visible={this.state.visible} mousePosition={this.mousePosition}>
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
