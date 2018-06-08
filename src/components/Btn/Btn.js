import React, { PureComponent } from "react";
import style from "./Btn.scss";
import PropTypes from "prop-types";
import {withRouter} from 'react-router-dom'

class Btn extends PureComponent {
  clickHandle = e => {
    const { onClick, to } = this.props;
    let allowRoute = true;
    if (onClick) {
      allowRoute = onClick(e) !== false;
    }
    if (to && allowRoute) {
      this.props.history.push(to);
    }
  };
  render() {
    const { className, children } = this.props;
    return (
      <span className={`${style.btn} ${className}`} onClick={this.clickHandle}>
        {children}
      </span>
    );
  }
}

Btn.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  to: PropTypes.string
};
export default withRouter(Btn);
