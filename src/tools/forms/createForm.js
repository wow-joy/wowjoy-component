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
      if (typeof name === "string") {
        return checkName(name);
      }

      const checkResults = {};
      for (const key in forms) {
        if (forms.hasOwnProperty(key)) {
          checkResults[key] = checkName(key);
        }
      }
      return checkResults;
    };

    bindForm = userProps => {
      const { name, rules, value, defaultValue, onChange } = userProps;
      const { getter, setter, validate } = this;
      if (rules) {
        setter(name, { rules: rules });
      }
      if (
        (typeof defaultValue === "string" ||
          typeof defaultValue === "number") &&
        getter(name) === undefined
      ) {
        setter(name, { value: defaultValue });
        return {
          name,
          onChange(e) {
            setter(name, { value: e.target.value });
            onChange(e);
          },
          defaultValue: getter(name)
        };
      }
      if (typeof value === "string" || typeof value === "number") {
        setter(name, { value: value });
        return {
          name,
          onChange(e) {
            // setter(name, { value: e.target.value });
            onChange(e);
          },
          value: value
        };
      }
      return {
        name,
        onChange(e) {
          setter(name, { value: e.target.value });
          onChange(e);
        }
      };
    };
    render() {
      const formHandle = {
        getter: this.getter,
        // setter: this.setter,
        validate: this.validate
      };
      return (
        <OldComponent
          formHandle={formHandle}
          bindForm={this.bindForm}
          {...this.props}
        />
      );
    }
  };
};

export default createForm;
