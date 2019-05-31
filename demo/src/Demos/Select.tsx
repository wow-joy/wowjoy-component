import * as React from "react";
import { Select } from "@src";
class Demo extends React.PureComponent {
  // ref: any;
  componentDidMount() {
    // console.log('1', this.ref);
  }

  render() {
    return (
      <div style={{ marginTop: "70vh" }}>
        <Select
          options={[
            {
              label: "1",
              value: 1
            },
            {
              label: "2",
              value: 2
            },
            {
              label: "3",
              value: 3
            },
            {
              label: "33",
              value: 33
            },
            {
              label: "333",
              value: 333
            }
          ]}
          defaultValue={2}
          inputRender={({ value }: { value?: any }) => <div>{value.label}</div>}
        />
        <br />
        <br />
        <br />
        <Select
          defaultStyles={`.wjc-select-list{height: 100px}`}
          options={[
            {
              label: "1",
              value: 1
            },
            {
              label: "2",
              value: 2
            },
            {
              label: "3",
              value: 3
            },
            {
              label: "33",
              value: 33
            },
            {
              label: "333",
              value: 333
            }
          ]}
          defaultValue={2}
          inputRender={({ value }: { value?: any }) => <div>{value.label}</div>}
        />
      </div>
    );
  }
}

export default Demo;
