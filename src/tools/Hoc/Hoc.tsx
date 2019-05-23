import * as React from "react";
/**
 * @description 默认Hoc工厂函数
 * @param initSetting 默认值设定
 * @param OldComponent 原始组件
 * @returns 新组件
 *
 */
export interface Props {
  className?: string;
  defaultStyles?: string;
}
const Hoc = (initSetting: { defaultStyles?: string; className?: string }) => (
  OldComponent: React.ReactType
) => {
  return class extends React.PureComponent<Props, {}> {
    render() {
      let { className, defaultStyles } = this.props;
      // 为组件添加默认样式处理，className属性使用叠加处理，其余属性使用覆盖处理
      const initedProps = {
        ...initSetting,
        ...this.props,
        className: (initSetting.className || "") + " " + (className || ""),
        defaultStyles: initSetting.defaultStyles + defaultStyles
      };
      return <OldComponent {...initedProps} />;
    }
  };
};
export default Hoc;
