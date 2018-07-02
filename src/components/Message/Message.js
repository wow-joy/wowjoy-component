import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';
const Wrap = styled.div`
  width: 480px;
  height: 36px;
  line-height: 36px;
  border: 1px solid transparent;
  font-size: 12px;
  ${props=>props.styles}
`;
class Message extends PureComponent {
  closeHandle = e => {
    const { onClose } = this.props;
    if (onClose && onClose(e) === false) {
      return;
    }
  };
  render() {
    const { styles, icon, children, onClose } = this.props;
    return (
      <div styles={styles}>
        {icon}
        {children}
        {onClose && <i onClose={this.closeHandle} />}
      </div>
    );
  }
}

Message.propTypes = {
  styles: PropTypes.string,
  icon: PropTypes.node,
  children: PropTypes.node,
  onClose: PropTypes.func
};
export default Message;
