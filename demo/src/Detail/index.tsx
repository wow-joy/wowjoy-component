import * as React from "react";
// import Components from "@es";
// import { Btn_1 as Btn1, Tooltip } from "@es";
// import styled from "styled-components";
import Demos from "../Demos";
import Components from "@src";
import { Btn_1 as Btn1, Tooltip } from "@src";
import styled, { createGlobalStyle } from "styled-components";

const PROPS = {
  current: 1,
  direction: "vertical",
  type: "dot" // basic dot arrow
};
interface Props {
  match: any;
}
class Detail extends React.Component<Props> {
  name: string;
  render() {
    const { match } = this.props;
    const name = match.params.name.replace(
      /^(.)(.*)$/,
      (match: string, $1: string, $2: string) => $1.toUpperCase() + $2
    );
    this.name = name;
    const ComponentItem = Components[name];
    const DemoItem = (Demos as any)[name];
    if (!DemoItem) {
      throw Error("please create a demo for " + name);
    }
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
