import * as React from "react";
import { Btn, Btn_1, Btn_2, Btn_3, Btn_disabled } from "@src";
class Demo extends React.PureComponent {
  render() {
    return (
      <div>
        <Btn>0</Btn>
        <Btn_1>1</Btn_1>
        <Btn_2>2</Btn_2>
        <Btn_3>3</Btn_3>
        <Btn_disabled>Btn_disabled</Btn_disabled>
      </div>
    );
  }
}

export default Demo;
