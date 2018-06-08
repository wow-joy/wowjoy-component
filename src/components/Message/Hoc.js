import React, { PureComponent } from "react";
const Hoc = initSetting => OldComponent => {
  return class extends PureComponent {
    render() {
      let { className } = this.props;
      // 为组件添加默认样式处理，className属性使用叠加处理，其余属性使用覆盖处理
      const initedProps = {
        ...initSetting,
        ...this.props,
        className: initSetting.className + " " + className
      };
      return <OldComponent {...initedProps} />;
    }
  };
};
// TODO: 提取Hoc 到公用方法
export default Hoc;
