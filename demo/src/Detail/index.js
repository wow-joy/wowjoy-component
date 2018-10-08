import React, { Component } from "react";
import Components from "@src";
import { Dialog } from "@src";

const X = props => <div>{props.value}</div>;
const PROPS = {
  content: "xxxxxxxxx",
  columns: [
    {
      title: "name",
      render: (rowEle, rowIndex) => rowEle.name,
      key: 1
    },
    {
      title: "id",
      render: (rowEle, rowIndex) => rowEle.key,
      key: 2
    },
    {
      title: "des",
      render: (rowEle, rowIndex) => rowEle.des,
      key: 3
    }
  ],
  data: [
    {
      name: "xx1",
      key: 1,
      des: "xx_1"
    },
    {
      name: "xx2",
      key: 2,
      des: "xx_2"
    },
    {
      name: "xx3",
      key: 3,
      des: "xx_3"
    }
  ],
  sort: (a, b) => b.des.match(/\d/)[0] - a.des.match(/\d/)[0]
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
      return <ComponentItem {...PROPS} {...this.state} onClose={this.close} >
      
          <div style={{width: '10px', height:" 1000px", background: '#000'}}></div>
      </ComponentItem>;
    }
    return <div>ComponentItem not found</div>;
  }
}

export default Detail;
