import * as React from "react";
import styled from "styled-components";
const Wrap = styled.div<{ defaultStyles?: string }>`
  width: 480px;
  height: 36px;
  line-height: 36px;
  border: 1px solid transparent;
  font-size: 12px;
  ${(props: { defaultStyles?: string }) => props.defaultStyles};
`;
export interface Props {
  className?: string;
  defaultStyles?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  onClose?: (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => boolean | void;
}
class Message extends React.PureComponent<Props, {}> {
  closeHandle = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const { onClose } = this.props;
    if (onClose && onClose(e) === false) {
      return;
    }
  };
  render() {
    const { className, defaultStyles, icon, children, onClose } = this.props;
    return (
      <Wrap
        defaultStyles={defaultStyles}
        className={"wjc-message " + className || ""}
      >
        {icon}
        {children}
        {onClose && (
          <i onClick={this.closeHandle} className={"wjc-message-close"} />
        )}
      </Wrap>
    );
  }
}

export default Message;
