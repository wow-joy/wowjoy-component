import React, { PureComponent } from "react";
/**
 * @description 非受控组件与受控组件的工厂函数
 * @param translate 转译对象 @example {value: 'state', onChange: 'onChangeState' , defaultValue: 'defaultState' }
 * @param OldComponent 原始组件
 * @returns 新组件
 *
 */
const ControllSwitchHoc = (translate = {}) => OldComponent => {
  class New extends PureComponent {
    state = {
      value: undefined
    };
    render() {
      const textValue = translate.value || "value";
      const textOnChange = translate.onChange || "onChange";
      const textDefaultValue = translate.defaultValue || "defaultValue";

      const value = this.props[textValue];
      const onChange = this.props[textOnChange];
      const defaultValue = this.props[textDefaultValue];
      const componentType = this.checkProps();
      if (componentType === "controlled") {
        return (
          <OldComponent
            {...this.props}
            ref={this.props.forwardRef}
            {...{ [textValue]: value, [textOnChange]: onChange }}
          />
        );
      }
      if (componentType === "uncontrolled") {
        return (
          <OldComponent
            {...this.props}
            ref={this.props.forwardRef}
            {...{
              [textValue]:
                this.state.value === undefined
                  ? defaultValue
                  : this.state.value,
              [textOnChange]: this.onChange
            }}
          />
        );
      }
    }
    onChange = (...args) => {
      const textOnChange = translate.onChange || "onChange";

      const onChange = this.props[textOnChange];

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
    checkProps = () => {
      const textValue = translate.value || "value";
      const textDefaultValue = translate.defaultValue || "defaultValue";

      const value = this.props[textValue];
      const defaultValue = this.props[textDefaultValue];
      if (value !== undefined && defaultValue !== undefined) {
        console.error(
          OldComponent.name +
            " must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://fb.me/react-controlled-components" +
            `\n请不要在 <${
              OldComponent.name
            }> 组件内同时声明\`defaultValue\`和\`value\``
        );
        return false;
      }
      if (value !== undefined && defaultValue === undefined) {
        return "controlled";
      }
      if (value === undefined) {
        return "uncontrolled";
      }
    };
  }

  return React.forwardRef((props, ref) => {
    return <New {...props} forwardRef={ref} />;
  });
};
export default ControllSwitchHoc;
