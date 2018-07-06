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
    this.popDom = pop(
      <ComponentItem
        {...PROPS}
        onClick={(e, index) => {
          if(index === 1){
            this.popDom.destroy()
            return false
          }
          this.popDom.hide();
          return false
        }}
      >
        ComponentItem
      </ComponentItem>
    )({
      autoClose: 1000,
      onClose: ()=>{console.log(1) }
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
      return <ComponentItem {...PROPS} onClick={(e, index) => {
        this.popDom.show();
        return false
      }}>ComponentItem</ComponentItem>;
    }
    return <div>ComponentItem not found</div>;
  }
}

export default Detail;
