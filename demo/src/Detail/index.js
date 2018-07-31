import React, { Component } from "react";
import Components from "@lib";

const Td = key => (dataItem, index, colKey) => <td><input key={colKey} defaultValue={dataItem[key]}></input></td>;
const PROPS = {
  data: [
    {
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    }
  ],
  keyStr: "table1",
  columnRenders: [(dataItem, index, colKey) => <td key={colKey}><input defaultValue={dataItem['name']}></input></td>,
  (dataItem, index, colKey) => <td key={colKey}><input defaultValue={dataItem['age']}></input></td>,
  (dataItem, index, colKey) => <td key={colKey}>{dataItem['address']}</td>,]
};

class Detail extends Component {
  state = { visible: true };
  componentDidMount() {
    window.onclick = () => {
      console.log(this);
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
        <ComponentItem
          {...PROPS}
          visible={this.state.visible}
          onClose={() => this.setState({ visible: false })}
        >
          ComponentItem
        </ComponentItem>
      );
    }
    return <div>ComponentItem not found</div>;
  }
}

export default Detail;
