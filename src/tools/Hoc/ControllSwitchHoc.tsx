import * as React from "react";
/**
 * @description 非受控组件与受控组件的工厂函数
 * @param translate 转译对象 @example {value: 'state', onChange: 'onChangeState' , defaultValue: 'defaultState' }
 * @param OldComponent 原始组件
 * @returns 新组件
 *
 */
const { PureComponent } = React;
export interface State {
  value: any;
}
const ControllSwitchHoc = (
  translate: {
    value?: string;
    onChange?: string;
    defaultValue?: string;
  } = {}
) => <Cp extends {}>(OldComponent: React.ReactType<Cp>) => {
  const textValue = translate.value || "value";
  const textOnChange = translate.onChange || "onChange";
  const textDefaultValue = translate.defaultValue || "defaultValue";
  const { name } = OldComponent as { name?: string };
  class NewComponent extends PureComponent<Cp, State> {
    componentType: "controlled" | "uncontrolled" | false;
    constructor(props: Cp) {
      super(props);
      this.state = {
        value: void 0
      };
      this.componentType = this.checkProps(props);
    }

    componentWillReceiveProps(nextProps: Cp) {
      const nextComponentType = this.checkProps(nextProps);
      if (
        this.componentType === "controlled" &&
        nextComponentType === "uncontrolled"
      ) {
        console.error(
          `Can't change \`${name}\` from controlled to uncontrolled`
        );
      }
      this.componentType = nextComponentType;
    }

    render() {
      const { props, componentType } = this;
      const value = (props as any)[textValue];
      const onChange = (props as any)[textOnChange];
      const defaultValue = (props as any)[textDefaultValue];
      const { forwardedRef } = props as any;

      const Old = OldComponent as any;
      if (componentType === "controlled") {
        return (
          <Old
            ref={forwardedRef}
            {...this.props}
            {...{ [textValue]: value, [textOnChange]: onChange }}
          />
        );
      }
      if (componentType === "uncontrolled") {
        return (
          <Old
            ref={forwardedRef}
            {...this.props}
            {...{
              [textValue]:
                this.state.value === void 0 ? defaultValue : this.state.value,
              [textOnChange]: this.onChange
            }}
          />
        );
      }
    }
    onChange = (...args: any[]) => {
      const textOnChange = translate.onChange || "onChange";

      const onChange = (this.props as any)[textOnChange];

      const propsOnChangeResult = onChange && onChange(...args);
      if (propsOnChangeResult === false) {
        return false;
      }
      const isDomNode = args[0].target && args[0].target.nodeType === 1;
      let value = args[0];
      if (isDomNode) {
        value = args[0].target.value;
      }
      this.setState({
        value: value
      });
    };
    checkProps = (props: any) => {
      const value = props[textValue];
      const defaultValue = props[textDefaultValue];
      if (value !== void 0 && defaultValue !== void 0) {
        console.error(
          name +
            " must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://fb.me/react-controlled-components" +
            `\n请不要在 <${name}> 组件内同时声明\`defaultValue\`和\`value\``
        );
        return false;
      }
      if (value !== void 0 && defaultValue === void 0) {
        return "controlled";
      }
      if (value === void 0) {
        return "uncontrolled";
      }
    };
  }
  const RefForwardingFact = (props: Cp, ref: any) => (
    <NewComponent {...props} forwardedRef={ref} />
  );
  return React.forwardRef(RefForwardingFact);
};
export default ControllSwitchHoc;
