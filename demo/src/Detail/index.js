import React, { Component } from "react";
import Components from "@src";

const X = props => <div>{props.value}</div>;
const PROPS = {
  defaultValue: ["x1"],
  type: "checkbox",
  value:["x1", "x2"],
  onChange: value => console.log(value),
  inputRender: props => (
    <div>
      {props.value &&
        props.value.map((ele, index) => <span key={index}>{ele.label}</span>)}
    </div>
  ),
  onBlur: () => false,
  options: [
    {
      label: <span>x1</span>,
      labelRender: isActive => (
        <span>{isActive ? "x1 is active" : "x1 not active"}</span>
      ),
      value: "x1"
    },
    {
      label: "x2",
      value: "x2"
    },
    {
      label: "x3",
      value: "x3"
    },
    {
      label: "x4",
      value: "x4"
    },
    {
      label: "x5",
      value: "x5"
    }
  ],
  
};

class Detail extends Component {
  state = { visible: false };
  componentDidMount() {
    window.onclick = () => {
      console.log(this);
      this.setState({ visible: true });
    };
    this.setState({
      container: document.getElementsByTagName('article')[0]
    })
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
        <ComponentItem {...PROPS} visible={this.state.visible}
          container ={ this.state.container}
          value={this.state.value||["x1", "x2"]}
          onChange={ value => this.setState({value: value})}
        >
          ComponentItem
        </ComponentItem>
      );
    }
    return <div>ComponentItem not found</div>;
  }
}

export default Detail;
