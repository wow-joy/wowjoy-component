import * as React from "react";
import {
  Message,
  Message_success,
  Message_error,
  Message_info,
  Message_doubt,
  Message_warn
} from "@src";
class Demo extends React.PureComponent {
  state = {
    visible: false
  };
  toggleDialog = () => {
    this.setState({ visible: !this.state.visible });
  };
  closeDialog = () => {
    this.setState({ visible: false });
  };
  a: any = null;
  b: any = null;
  componentDidMount() {
    console.log(this.a);
    console.log(this.b);
  }

  render() {
    return (
      <div>
        <Message_success></Message_success>
        <Message_error></Message_error>
        <Message_info></Message_info>
        <Message_doubt></Message_doubt>
        <Message_warn
          onClose={() => false}
          ref={el => (this.a = el)}
        ></Message_warn>
        <Message onClose={() => false} ref={el => (this.b = el)}></Message>
      </div>
    );
  }
}

export default Demo;
