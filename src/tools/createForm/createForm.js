import React, { Component } from "react";

const createForm = OldComponent => {
  return class extends Component {
    forms = {};
    setter = (name, obj) => {
      this.forms[name] || (this.forms[name] = {});
      this.forms[name] = { ...this.forms[name], ...obj };
    };
    getter = (name, key) => {
      const { forms } = this;
      if (name && key) {
        return forms[name][key];
      }
      if (name) {
        return forms[name] ? forms[name].value : forms[name];
      }
      const returnDatas = {};
      for (const key in forms) {
        if (forms.hasOwnProperty(key)) {
          returnDatas[key] = forms[key].value;
        }
      }
      return returnDatas;
    };
    validate = name => {
      const { forms } = this;
      const checkName = name => forms[name].rules(forms[name].value);
      if (typeof name === 'string') {
        checkName(name);
      }
      return Object.keys(forms).map(ele => checkName(ele));
    };
    render() {
      const formHandle = {
        getter: this.getter,
        setter: this.setter,
        validate: this.validate
      };
      return <OldComponent formHandle={formHandle} {...this.props} />;
    }
  };
};
 
export default createForm;
