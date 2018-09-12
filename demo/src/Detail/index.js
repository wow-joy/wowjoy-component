import React, { Component } from "react";
import Components from "@src";
import { Dialog } from "@src";

const X = props => <div>{props.value}</div>;
const PROPS = {
  // size: "32px",
  // total: 1000,
  // pageSizeList: [10, 20, 30],
  // defaultPageSize: 10,
  // onChange: (...args) => console.log(args)
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
  close = () => {
    this.setState({ visible: false });
  };
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
        <ComponentItem {...PROPS} {...this.state} onClose={this.close}>
          <Dialog
            onClick={(e, index) =>
              index === 1 && this.setState({ visible: false })
            }
          >
            123
          </Dialog>
        </ComponentItem>
      );
    }
    return <div>ComponentItem not found</div>;
  }
}

export default Detail;
