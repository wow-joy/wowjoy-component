import React, { Component } from "react";
import Components from "@src";
import { pop } from "@src/tools";
const PROPS = {};

class Detail extends Component {
  state = {};
  componentDidMount() {
    const { match } = this.props;
    const name = match.params.name.replace(
      /^(.)(.*)$/,
      (match, $1, $2) => $1.toUpperCase() + $2
    );
    this.name = name;
    const ComponentItem = Components[name];
    pop(<ComponentItem {...PROPS}>ComponentItem</ComponentItem>)({
      className: "yy",
      layer: true
    });
  }
  render() {
    const { match } = this.props;
    const name = match.params.name.replace(
      /^(.)(.*)$/,
      (match, $1, $2) => $1.toUpperCase() + $2
    );
    this.name = name;
    const ComponentItem = Components[name];
    if (ComponentItem) {
      return <ComponentItem {...PROPS}>ComponentItem</ComponentItem>;
    }
    return <div>ComponentItem not found</div>;
  }
}

export default Detail;
