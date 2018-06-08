import React from "react";
import ReactDOM from "react-dom";
import style from "./pop.scss";
/**
 *  抛出组件到指定dom
 *  @param component 指定组件
 *  @param properties 组件props
 *
 *  二级参数
 *  @param {className} 组件包裹的样式
 *  @param {container} 指定输出容器， 默认为body
 *  @param {animeType} 动画方式
 *  @param {layer} 有无蒙层
 *  @param {layerClassName} 蒙层额外样式
 *  @param {autoClose} 自动关闭的等候时间
 *  @param {onClose} 关闭事件句柄，`return false` 可以阻止关闭事件
 *
 *  @returns {node, remove}
 */

const pop = (Component, properties) => ({
  className,
  container,
  animeType,
  layer,
  layerClassName,
  autoClose,
  onClose
}) => {
  const props = properties || {};
  const popBox = document.createElement("div");
  popBox.className = style.popBox + " " + style[animeType||'slideDown'] + " " + className;
  const containerDom = container || document.body; // 输出容器， 默认body
  let layerDom; // 定义蒙层
  const eventHandle = {
    // 定义实例事件句柄
    show() {
      if (layer) {
        layerDom.classList.remove(style.hide);
      } else {
        popBox.classList.remove(style.hide);
      }
    },
    hide() {
      if (layer) {
        layerDom.classList.add(style.hide);
      } else {
        popBox.classList.add(style.hide);
      }
    },
    destroy() {
      if (onClose && onClose() === false) {
        return;
      }
      if (layer) {
        layerDom.parentNode.removeChild(layerDom);
      } else {
        popBox.parentNode.removeChild(popBox);
      }
      ReactDOM.unmountComponentAtNode(popBox);
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
  const ref = targetRef => {
    popObj.ref = targetRef;
  };
  ReactDOM.render(<Component {...props} ref={ref} />, popBox);
  if(autoClose){
    setTimeout(popObj.destroy, autoClose)
  }
  return popObj;
};

export default pop;
