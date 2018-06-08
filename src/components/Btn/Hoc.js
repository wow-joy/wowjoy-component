import React, { PureComponent } from "react";
const Hoc = initSetting => OldComponent => {
  return class extends PureComponent {
    render() {
      let { className } = this.props;
      // 为组件添加默认样式处理，className属性使用叠加处理，content属性使用覆盖处理
      const initedProps = { ...initSetting, ...this.props, className: initSetting.className + ' ' + className };
      return <OldComponent {...initedProps} />;
    }
  };
};
export default Hoc;
