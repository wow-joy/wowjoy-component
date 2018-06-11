import React, { PureComponent } from "react";
import style from "./Dialog.scss";
import PropTypes from "prop-types";

class Dialog extends PureComponent {
  render() {
    const { className, children } = this.props;
    return <div className={`${style.wrap} ${className}`}>{children}</div>;
  }
}

Dialog.propTypes = {
  className: PropTypes.string
};
export default Dialog;
