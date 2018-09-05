import React, { Component } from "react";
import Components from "@src";

const X = props => <div>{props.value}</div>;
const PROPS = {
  size: "32px",
  total: 1000,
  pageSizeList: [10, 20, 30],
  defaultPageSize: 10,
  onChange: (...args)=>console.log(args)
};

class Detail extends Component {
  state = { visible: false };
  componentDidMount() {
    window.onclick = () => {
      this.setState({ visible: true });
    };
    // this.setState({
    //   container: document.getElementsByTagName('article')[0]
    // })
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
      return <ComponentItem {...PROPS} />;
    }
    return <div>ComponentItem not found</div>;
  }
}

export default Detail;
