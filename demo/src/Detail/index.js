import React, { Component } from "react";
import Components from "@src";
const PROPS = {};

class Detail extends Component {
  state = {visible:false};
  componentDidMount() {
    window.onclick=()=>{console.log(this);this.setState({visible:true})}
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
      return <ComponentItem {...PROPS} visible = {this.state.visible} onClose={()=>this.setState({visible:false})}>ComponentItem</ComponentItem>;
    }
    return <div>ComponentItem not found</div>;
  }
}

export default Detail;
