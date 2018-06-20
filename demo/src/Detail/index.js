import React, { Component } from "react";
// import Components from "@lib";
import Components from "@src";
// import pop from "@src/tools/pop";
// import { Warn } from '@lib/components/Message'
// import pop from "wowjoy-component/lib/tools/pop";
import createForm from "@src/tools/forms";
const PROPS = {};

class Detail extends Component {
  state = {
    value: 0
  };
  componentDidMount() {
    // const ComponentItem = Components[this.name];
    // const popNode = pop(Warn, {content:'asd', onClose:()=>{alert('close')}})({
    //   animeShow:'slideRightIn',
    //   autoClose: 2000,
    //   animeHide:'slideRightOut',
    //   layer:true
    // })
  }

  render() {
    const { match, formHandle, bindForm } = this.props;
    window.formHandle = formHandle;
    const name = match.params.name.replace(
      /^(.)(.*)$/,
      (match, $1, $2) => $1.toUpperCase() + $2
    );
    this.name = name;
    const ComponentItem = Components[name];
    return (
      <input
        {...bindForm({
          name: "xx",
          onChange: e => this.setState({ value: e.target.value }),
          value: this.state.value,
          // defaultValue:  this.state.value,
          rules: v => v === "1"
        })}
        // onBlur={e => console.log(this.setState({ value: 2 }))}
        type="text"
      />
    );

    if (ComponentItem) {
      return <ComponentItem {...PROPS}>ComponentItem</ComponentItem>;
    }
    return <div>ComponentItem not found</div>;
  }
}

export default createForm(Detail);
