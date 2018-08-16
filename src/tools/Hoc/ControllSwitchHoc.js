import React, { PureComponent } from "react";
/**
 * @description 非受控组件与受控组件的工厂函数
 * @param translate 转译对象 @example {value: 'state', onChange: 'onChangeState' , defaultValue: 'defaultState' }
 * @param OldComponent 原始组件
 * @returns 新组件
 *
 */
const ControllSwitchHoc = translate => OldComponent => {
  return class extends PureComponent {
    state = {
      value: undefined
    };
    render() {
      const defaultValue = this.props[translate.defaultValue||'defaultValue']
      const componentType = this.checkProps();
      console.log(componentType)
      if ((componentType === "controlled")) {
        return <OldComponent {...this.props} />;
      }
      if ((componentType === "uncontrolled")) {
        console.log(    this.state.value === undefined
          ? defaultValue
          : this.state.value)
        return (
          <OldComponent
            {...this.props}
            value={
              this.state.value === undefined
                ? defaultValue
                : this.state.value
            }
            onChange={this.onChange}
          />
        );
      }
    }
    onChange = (...args) => {
      const onChange = this.props[translate.onChange||'onChange']

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
      const value = this.props[translate.value||'value']
      const defaultValue = this.props[translate.defaultValue||'defaultValue']
      if (value !== undefined && defaultValue !== undefined) {
        console.warn(
          OldComponent.name +
            " must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://fb.me/react-controlled-components"
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
  };
};
export default ControllSwitchHoc;
