import * as React from "react";
import styled from "styled-components";

const Wrap = styled.div`
  position: fixed;
  width: 100%;
  text-align: center;
  top: 200px;
  color: #fff;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  z-index: 1002;
`;
interface Notice {
  key: string | number;
  content: React.ReactElement;
}
interface State {
  notices: Notice[];
  [key: string]: any;
}
class Notification extends React.Component {
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
    return <Wrap>{notices.map(item => item.content)}</Wrap>;
  }
}

export default Notification;
