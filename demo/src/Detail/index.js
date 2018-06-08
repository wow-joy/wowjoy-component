import React, { Component } from "react";
// import Components from "@lib";
import Components from "@src";
// import pop from "@src/tools/pop";


const PROPS = {

};

class Detail extends Component {
  
  render() {
    const { match } = this.props;
    const name = match.params.name.replace(/^(.)(.*)$/,(match, $1,$2)=>$1.toUpperCase() + $2)
    const ComponentItem = Components[name];
    if (ComponentItem) {
      return <ComponentItem {...PROPS} >ComponentItem</ComponentItem>;
    }
    return <div>ComponentItem not found</div>;
  }
}

export default Detail;
