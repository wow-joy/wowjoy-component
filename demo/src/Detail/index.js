import React, { Component } from "react";
import Components from "@src";
import Pop from "@src/components/Pop";
const PROPS = {};

class Detail extends Component {
  state = { visible: false };
  componentDidMount() {
    // const { match } = this.props;
    // const name = match.params.name.replace(
    //   /^(.)(.*)$/,
    //   (match, $1, $2) => $1.toUpperCase() + $2
    // );
    // this.name = name;
    // const ComponentItem = Components[name];
    // pop(<ComponentItem {...PROPS}>ComponentItem</ComponentItem>)({
    //   className: "yy",
    //   layer: true
    // });
    window.onclick = () => {
      this.setState({ visible: true });
    };
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
      return (
        <Pop layer visible={this.state.visible} onClose = {()=>this.setState({visible:false})}>
          <ComponentItem {...PROPS}>ComponentItem</ComponentItem>
        </Pop>
      );
    }
    return <div>ComponentItem not found</div>;
  }
}

export default Detail;
