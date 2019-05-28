import React, { Component } from "react";
import { Btn_1 as Btn1, ScrollBox } from "@src";
import styled from "styled-components";

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scroll1Arr: Array(100).fill(""),
      dynamic: false,
      value: ""
    };
  }
  componentDidMount() {}
  onClick = () => {
    this.scrollRef1.scrollTo(50, 5);
  };
  resetData = e => {
    const val = Math.min(999, +e.target.value);
    this.setState({
      value: val,
      scroll1Arr: Array(val).fill("")
    });
  };
  onRerender = () => {
    this.scrollRef1.rerender();
  };
  changeDynamic = () => {
    this.setState({
      dynamic: !this.state.dynamic
    });
  };
  changeCover = () => {
    this.setState({
      cover: !this.state.cover
    });
  };
  render() {
    return (
      <div>
        <button onClick={this.onClick}>点击滚动至(50，5)</button>
        <br />
        <label>
          输入修改数据长度&nbsp;
          <input
            value={this.state.value}
            onChange={this.resetData}
            type={"number"}
            style={{ border: "1px solid #000" }}
            max={1000}
          />
        </label>
        <br />
        <button onClick={this.changeDynamic}>
          点击修改dynamic状态， 当前：{this.state.dynamic ? "开" : "关"}
        </button>
        <button onClick={this.changeCover}>
          点击修改cover状态， 当前：{this.state.cover ? "开" : "关"}
        </button>
        <br />
        <button onClick={this.onRerender}>点击重新计算滚动条</button>
        <ScrollBox
          dynamic={this.state.dynamic}
          showOuterBorder
          unUseNative
          cover={this.state.cover}
          ref={el => (this.scrollRef1 = el)}
          style={{ width: "300px", height: "300px" }}
        >
          {this.state.scroll1Arr.map((ele, index) => (
            <i key={index}>{index + 1}</i>
          ))}
          {this.state.scroll1Arr.map((ele, index) => (
            <p key={index}>{index + 1}</p>
          ))}
        </ScrollBox>
        <br />
        <br />
        <br />
        <ScrollBox style={{ width: "300px", height: "300px" }}>
          {Array(100)
            .fill("")
            .map((ele, index) => (
              <p key={index}>{index + 1}</p>
            ))}
        </ScrollBox>
        <br />
        <br />
        <br />
        <ScrollBox style={{ width: "300px", height: "300px" }}>
          {Array(100)
            .fill("")
            .map((ele, index) => (
              <i key={index}>{index + 1}</i>
            ))}
        </ScrollBox>
      </div>
    );
  }
}
export default Demo;
