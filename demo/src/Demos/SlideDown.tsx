import * as React from "react";
import { SlideDown } from "@src";
class Demo extends React.PureComponent {
  render() {
    return (
      <div>
        <SlideDown content={<span>点击这里进行控制</span>}>
          这里是展示内容{" "}
        </SlideDown>
      </div>
    );
  }
}

export default Demo;
