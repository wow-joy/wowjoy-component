import * as React from "react";
import { Dialog_confirm as Dialog, Pop, Btn_1 } from "@src";
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
  render() {
    return (
      <div>
        <Pop
          layer={false}
          visible={this.state.visible}
          onClose={this.closeDialog}
        >
          <Dialog>123</Dialog>
        </Pop>
        <Btn_1 onClick={this.toggleDialog}>toggle dialog</Btn_1>
      </div>
    );
  }
}

export default Demo;
