const bindForm = formHandle => userProps => {
  const { name, rules, value } = userProps;
  formHandle.setter;
  if (formHandle.getter(name) === undefined) {
    formHandle.setter(name, { value: userProps.initValue });
  }
  if (value) {
    formHandle.setter(name, { value: value, rules: rules });
  }
  return {
    name,
    onChange(e) {
      formHandle.setter(name, { value: e.target.value });
      userProps.onChange(e);
    },
    defaultValue: formHandle.getter(name)
  };
};
export default bindForm;
