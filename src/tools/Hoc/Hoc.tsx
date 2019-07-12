import * as React from "react";
/**
 * @description 默认Hoc工厂函数
 * @param initSetting 默认值设定
 * @param OldComponent 原始组件
 * @returns 新组件
 *
 */
const Hoc = (initSetting: { defaultStyles?: string; className?: string }) => <
  OldProps extends {}
>(
  OldComponent: React.ComponentType<OldProps>
) => {
  type Props = OldProps & {
    className?: string;
    defaultStyles?: string;
    forwardedRef?: () => any | string;
  };
  class NewComponent extends React.PureComponent<Props, {}> {
    render() {
      let { className, defaultStyles, forwardedRef } = this.props;
      // 为组件添加默认样式处理，className属性使用叠加处理，其余属性使用覆盖处理
      const initedProps: Props = {
        ...initSetting,
        ...this.props,
        className: (initSetting.className || "") + " " + (className || ""),
        defaultStyles: initSetting.defaultStyles + defaultStyles
      };
      return <OldComponent ref={forwardedRef} {...initedProps} />;
    }
  }

  return React.forwardRef((props: Props, ref: () => any | string) => (
    <NewComponent {...props} forwardedRef={ref} />
  ));
};
export default Hoc;
