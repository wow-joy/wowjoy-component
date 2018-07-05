import React, { Component } from "react";
import ReactDOM from "react-dom";
// import style from "./pop.css";
import pubSub from "../pubSub";
import styled from "styled-components";
import { createPortal, render } from "react-dom";

/**
 *  抛出组件到指定dom
 *  @param component 指定组件
 *
 *  二级参数
 *  @param {className} 组件包裹的样式
 *  @param {container} 指定输出容器， 默认为body
 *  @param {animeShow} 动画方式
 *  @param {layer} 有无蒙层
 *  @param {layerClassName} 蒙层额外样式
 *  @param {autoClose} 自动关闭的等候时间
 *  @param {onClose} 关闭事件句柄，`return false` 可以阻止关闭事件
 *
 *  @returns {  show, hide, destroy }
 */

const Wrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1001;
`;
const Layer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.6);
`;
class PopWrap extends Component {
  render() {
    const {
      className,
      animeShow,
      animeHide,
      container,
      layer,
      layerClassName,
      autoClose,
      onClose,
      children
    } = this.props;
    const Main = <Wrap className={className}>{children}</Wrap>;

    return ReactDOM.createPortal(
      layer ? <Layer className={layerClassName}>{Main}</Layer> : Main,
      container || document.body
    );
    if (!layer) {
      return Main;
    } else {
      return <Layer className={layerClassName}>{Main}</Layer>;
    }
  }
}

const pop = Component => function({
  className,
  container,
  animeShow,
  animeHide,
  layer,
  layerClassName,
  autoClose,
  onClose
}) {
  console.log(container);
  // const popDisplayDom = document.createElement("div");
  // document.body.appendChild(popDisplayDom);
  const ref = createPortal(
    <PopWrap
      {...{
        container,
        className,
        animeShow,
        animeHide,
        layer,
        layerClassName,
        autoClose,
        onClose
      }}
    >
      {Component}
    </PopWrap>,
    container || document.body
  );
  console.log(ref);
};

// const pop = Component => ({
//   className,
//   container,
//   animeShow,
//   animeHide,
//   layer,
//   layerClassName,
//   autoClose,
//   onClose
// }) => {
//   const popBox = document.createElement("div");
//   popBox.className =
//     style.popBox + " " + style[animeShow || "slideDownIn"] + " " + className;
//   const containerDom = container || document.body; // 输出容器， 默认body
//   let layerDom; // 定义蒙层
//   const animteEndCallbacks = new pubSub(); // 动画回调 @returns {add, remove, clear, publish}
//   popBox.addEventListener("webkitAnimationEnd", animteEndCallbacks.publish);

//   const eventHandle = {
//     // 定义实例事件句柄
//     show() {
//       if (layer) {
//         layerDom.classList.remove(style.hide);
//       }
//       popBox.classList.remove(style[animeHide || "slideUpOut"]);
//       popBox.classList.add(style[animeShow || "slideDownIn"]);
//     },
//     hide() {
//       if (layer) {
//         const layerHide = () => {
//           layerDom.classList.add(style.hide);
//           animteEndCallbacks.remove(layerHide);
//         };
//         animteEndCallbacks.add(layerHide);
//       }
//       popBox.classList.remove(style[animeShow || "slideDownIn"]);
//       popBox.classList.add(style[animeHide || "slideUpOut"]);
//     },
//     destroy() {
//       if (onClose && onClose() === false) {
//         return;
//       }
//       const destroy = () => {
//         if (layer) {
//           layerDom.parentNode.removeChild(layerDom);
//         } else {
//           popBox.parentNode.removeChild(popBox);
//         }
//         animteEndCallbacks.remove(destroy);
//         ReactDOM.unmountComponentAtNode(popBox);
//       };
//       animteEndCallbacks.add(destroy);
//       eventHandle.hide();
//     }
//   };

//   if (layer) {
//     layerDom = document.createElement("div");
//     layerDom.className = style.layer + " " + layerClassName;
//     layerDom.onclick = e => {
//       e.target === layerDom && eventHandle.destroy();
//     };
//     layerDom.appendChild(popBox);
//     containerDom.appendChild(layerDom);
//   } else {
//     containerDom.appendChild(popBox);
//   }

//   let popObj = { ...eventHandle };
//   ReactDOM.render(Component, popBox);
//   if (autoClose) {
//     setTimeout(popObj.destroy, autoClose);
//   }
//   return popObj;
// };

export default pop;
