const bindForm = formHandle => userProps => {
  const { name, rules, value, defaultValue, onChange } = userProps;
  let controlled = !!value;
  if (defaultValue && formHandle.getter(name) === undefined) {
    formHandle.setter(name, { value: defaultValue });
  }
  if (value) {
    formHandle.setter(name, { value: value }, controlled);
  }
  if (rules) {
    formHandle.setter(name, { rules: rules }, controlled);
  }

  return {
    name,
    onChange(e) {
      formHandle.setter(name, { value: e.target.value });
      onChange(e);
    },
    defaultValue: !controlled ? formHandle.getter(name) : undefined,
    value: controlled ? formHandle.getter(name) || "" : undefined
  };
};
export default bindForm;
