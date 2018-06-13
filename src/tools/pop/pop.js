import React from "react";
import ReactDOM from "react-dom";
import style from "./pop.scss";
import pubSub from "../pubSub";
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

const pop = Component => ({
  className,
  container,
  animeShow,
  animeHide,
  layer,
  layerClassName,
  autoClose,
  onClose
}) => {
  const popBox = document.createElement("div");
  popBox.className =
    style.popBox + " " + style[animeShow || "slideDownIn"] + " " + className;
  const containerDom = container || document.body; // 输出容器， 默认body
  let layerDom; // 定义蒙层
  const animteEndCallbacks = new pubSub(); // 动画回调 @returns {add, remove, clear, publish}
  popBox.addEventListener("webkitAnimationEnd", animteEndCallbacks.publish);

  const eventHandle = {
    // 定义实例事件句柄
    show() {
      if (layer) {
        layerDom.classList.remove(style.hide);
      }
      popBox.classList.remove(style[animeHide || "slideUpOut"]);
      popBox.classList.add(style[animeShow || "slideDownIn"]);
    },
    hide() {
      if (layer) {
        const layerHide = () => {
          layerDom.classList.add(style.hide);
          animteEndCallbacks.remove(layerHide);
        };
        animteEndCallbacks.add(layerHide);
      }
      popBox.classList.remove(style[animeShow || "slideDownIn"]);
      popBox.classList.add(style[animeHide || "slideUpOut"]);
    },
    destroy() {
      if (onClose && onClose() === false) {
        return;
      }
      const destroy = () => {
        if (layer) {
          layerDom.parentNode.removeChild(layerDom);
        } else {
          popBox.parentNode.removeChild(popBox);
        }
        animteEndCallbacks.remove(destroy);
        ReactDOM.unmountComponentAtNode(popBox);
      };
      animteEndCallbacks.add(destroy);
      eventHandle.hide();
    }
  };

  if (layer) {
    layerDom = document.createElement("div");
    layerDom.className = style.layer + " " + layerClassName;
    layerDom.onclick = e => {
      e.target === layerDom && eventHandle.destroy();
    };
    layerDom.appendChild(popBox);
    containerDom.appendChild(layerDom);
  } else {
    containerDom.appendChild(popBox);
  }

  let popObj = { ...eventHandle };
  ReactDOM.render(Component, popBox);
  if (autoClose) {
    setTimeout(popObj.destroy, autoClose);
  }
  return popObj;
};

export default pop;
