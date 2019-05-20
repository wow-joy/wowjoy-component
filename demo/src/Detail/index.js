import React, { Component } from "react";
import Components from "@es";
import { Btn_1 as Btn1, Tooltip } from "@es";
import styled from "styled-components";
import Demos from "../Demos";

const PROPS = {
  current: 1,
  direction: "vertical",
  // labelPlacement: "vertical",
  type: "dot" // basic dot arrow
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
    const DemoItem = Demos[name];

    if (ComponentItem) {
      return (
        <React.Fragment>
          {/* <ComponentItem /> */}

          <DemoItem />
        </React.Fragment>
      );
    }
    return <div>ComponentItem not found</div>;
  }
}

export default Detail;
