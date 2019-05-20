import React, { Component } from "react";
import { Btn_1 as Btn1, ScrollBox } from "@src";
import styled from "styled-components";

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <ScrollBox style={{ width: "200px", height: "200px" }}>
          <div
            style={{
              display: "inline-block",
              background: "black",
              color: "#ccc"
            }}
          >
            {Array(100)
              .fill("")
              .map((ele, index) => (
                <i key={index}>{index + 1}</i>
              ))}
            {Array(100)
              .fill("")
              .map((ele, index) => (
                <p key={index}>{index + 1}</p>
              ))}
          </div>
        </ScrollBox>
        <br />
        <br />
        <br />
        <ScrollBox style={{ width: "200px", height: "200px" }}>
          <div
            style={{
              display: "inline-block",
              background: "black",
              color: "#ccc"
            }}
          >
            {Array(100)
              .fill("")
              .map((ele, index) => (
                <p key={index}>{index + 1}</p>
              ))}
          </div>
        </ScrollBox>
        <br />
        <br />
        <br />
        <ScrollBox style={{ width: "200px", height: "200px" }}>
          <div
            style={{
              display: "inline-block",
              background: "black",
              color: "#ccc"
            }}
          >
            {Array(100)
              .fill("")
              .map((ele, index) => (
                <i key={index}>{index + 1}</i>
              ))}
          </div>
        </ScrollBox>
      </div>
    );
  }
}
export default Demo;
