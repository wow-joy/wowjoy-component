import * as React from "react";
import styled from "styled-components";
import { Notice, NotificationProps, State } from "./index.d";

const Wrap = styled.div<{ top: number }>`
  position: fixed;
  width: 100%;
  text-align: center;
  top: ${p => p.top}px;
  color: #fff;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  z-index: 1002;
`;

class Notification extends React.Component<NotificationProps> {
  state: State = {
    notices: []
  };
  add = ({ key, content }: Notice) => {
    this.setState((prevState: State) => ({
      notices: prevState.notices.concat({ key, content })
    }));
  };
  remove = (key: string | number) => {
    this.setState((prevState: State) => ({
      notices: prevState.notices.filter((item: Notice) => item.key !== key)
    }));
  };
  render() {
    const { notices } = this.state;
    return (
      <Wrap top={this.props.top} className="notification-wrap">
        {notices.map(item => item.content)}
      </Wrap>
    );
  }
}

export default Notification;
