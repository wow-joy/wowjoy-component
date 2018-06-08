import React, { Component } from "react";
import Components from "@lib";
// import Components from "../../../src";

const PROPS = {
  header: {
    content: 2
  }
};

class Detail extends Component {
  render() {
    const { match } = this.props;
    const ComponentItem = Components[match.params.name];
    if (ComponentItem) {
      return <ComponentItem {...PROPS} >ComponentItem</ComponentItem>;
    }

    return <div>ComponentItem not found</div>;
  }
}

export default Detail;
