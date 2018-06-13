import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import style from "./Message.scss";
class Message extends PureComponent {
  closeHandle = (e) => {
    const { onClose } = this.props;
    if(onClose&&onClose(e) === false){
      return ;
    }
  };
  render() {
    const { className, icon, children, onClose } = this.props;
    return (
      <div className={`${style.wrap} ${className}`}>
        {icon}
        {children}
        {onClose && <i onClose={this.closeHandle} />}
      </div>
    );
  }
}

Message.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.node,
  children: PropTypes.node,
  onClose: PropTypes.func
};
export default Message;
