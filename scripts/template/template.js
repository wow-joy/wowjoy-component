import React, { PureComponent } from "react";
import style from "./Template.scss";
import PropTypes from "prop-types";

class Template extends PureComponent {
  render() {
    const { className, children } = this.props;
    return <div className={`${style.wrap} ${className}`}>{children}</div>;
  }
}

Template.propTypes = {
  className: PropTypes.string
};
export default Template;
