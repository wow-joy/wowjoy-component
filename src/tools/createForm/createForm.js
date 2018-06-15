import React, { Component } from "react";

const createForm = OldComponent => {
  return class extends Component {
    render() {
      const formHandle = {
        getFormDatas: this.getFormDatas,
        setFormDatas: this.setFormDatas
      };
      return <OldComponent {...formHandle} {...this.props} />;
    }
  };
};
