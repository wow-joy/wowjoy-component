import React, { Component } from "react";
import Components from "@src";
import { ReactComponent as Icon } from "@media/test.svg";

const PROPS = {
  current: 1,
  // direction: "vertical",
  // labelPlacement: "vertical",
  type: "arrow" // basic dot arrow
};

class Detail extends Component {
  render() {
    const { match } = this.props;
    const name = match.params.name.replace(
      /^(.)(.*)$/,
      (match, $1, $2) => $1.toUpperCase() + $2
    );
    this.name = name;
    const ComponentItem = Components[name];

    if (ComponentItem) {
      return (
        <ComponentItem {...PROPS}>
          {/* <div style={{ width: '40px', height: ' 40px', background: '#000' }} /> */}
          {/* <Icon /> */}
          <ComponentItem.Step title="1111" description="qwqw" />
          <ComponentItem.Step title="1111" description="sssssssssssssssss" />
          <ComponentItem.Step title="1111" description="aaa" />
        </ComponentItem>
      );
    }
    return <div>ComponentItem not found</div>;
  }
}

export default Detail;
