import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Slider, Btn_1 as Btn } from "@src";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body{
    width:200vw !important;
    height:200vh !important;
  }
`;

const marks = {
  // 0: "0°C",
  26: "26°C",
  37: "37°C",
  55: "55°C",
  78: "78°C",
  100: {
    style: {
      color: "#f50"
    },
    label: <strong>100°C</strong>
  }
};

const style = {
  float: "left",
  height: 300,
  marginLeft: 70
};

class Demo extends PureComponent {
  state = { value: 20 };
  render() {
    return (
      <div style={{ width: 600, height: 600, margin: 30 }}>
        <GlobalStyle />
        <Slider
          min={33}
          onChange={e => {
            console.log(e);
          }}
        />

        <h4>controlled</h4>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Slider value={this.state.value} onChange={e => this.setState({ value: e })} />
          <span>{this.state.value}</span>
          <Btn onClick={e => this.setState(state => ({ value: state.value - 1 }))}>-</Btn>
          <Btn onClick={e => this.setState(state => ({ value: state.value + 1 }))}>+</Btn>
          <Btn onClick={e => this.setState(state => ({ value: 66 }))}>66</Btn>
        </div>

        <h4>disabled</h4>
        <Slider disabled defaultValue={[37, 67]} marks={marks} />
        <h4>included=true</h4>
        <Slider marks={marks} defaultValue={37} />
        <Slider marks={marks} defaultValue={[26, 37]} />

        <h4>included=false</h4>
        <Slider marks={marks} included={false} defaultValue={37} />

        <h4>marks & step</h4>
        <Slider marks={marks} step={10} defaultValue={37} />

        <h4>step=null</h4>
        <Slider marks={marks} step={null} defaultValue={37} />

        <div style={style}>
          <Slider vertical defaultValue={30} />
        </div>
        <div style={style}>
          <Slider vertical step={10} defaultValue={[20, 50]} />
        </div>
        <div style={style}>
          <Slider vertical marks={marks} step={10} defaultValue={[26, 37]} />
        </div>
      </div>
    );
  }
}

export default Demo;
