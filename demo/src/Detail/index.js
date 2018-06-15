import React, { Component } from "react";
// import Components from "@lib";
import Components from "@src";
// import pop from "@src/tools/pop";
// import { Warn } from '@lib/components/Message'
// import pop from "wowjoy-component/lib/tools/pop";
import createForm, { bindForm } from "@src/tools/createForm";
const PROPS = {};

class Detail extends Component {
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
    const { match, formHandle } = this.props;
    const name = match.params.name.replace(
      /^(.)(.*)$/,
      (match, $1, $2) => $1.toUpperCase() + $2
    );
    this.name = name;
    const ComponentItem = Components[name];
    console.log(formHandle);
    return (
      <input
        {...bindForm(formHandle)({
          name: "xx",
          onChange: () => console.log(1),
          value: 2,
          initValue: "yy",
          rules: v => v === '1'
        })}
        onBlur={() => console.log(formHandle.validate())}
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
