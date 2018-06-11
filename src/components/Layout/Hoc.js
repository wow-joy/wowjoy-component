import React, { Component } from "react";
const Hoc = initSetting => OldComponent => {
  return class extends Component {
    render() {
      let { className } = this.props;
      const initedProps = { className };
      // 为组件添加默认样式处理，className属性使用叠加处理，content属性使用覆盖处理
      ["header", "asideLeft", "main", "asideRight", "footer"].forEach(ele => {
        if (this.props[ele] === false) {
          initedProps[ele] = false;
        } else {
          initedProps[ele] = this.props[ele]
            ? {
                className:
                  this.props[ele].className ||
                  "" + " " + initSetting[ele].className ||
                  "",
                content: this.props[ele].content || initSetting[ele].content
              }
            : initSetting[ele];
        }
      });
      return <OldComponent {...initedProps} />;
    }
  };
};
export default Hoc;
