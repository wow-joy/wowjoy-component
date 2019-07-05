import React, { Component } from "react";
import { Btn_1 as Btn1, Tooltip, SimpleTooltip } from "@src";
import styled, { createGlobalStyle } from "styled-components";

const Cell = styled.div`
  grid-area: ${p => p.area};
`;
const Grid = styled.div`
  position: absolute;
  top: 300px;
  left: 200px;
  display: grid;
  grid-gap: 5px;
  grid-template-rows: repeat(5, 1fr);
  grid-template-columns: repeat(5, 80px);
  grid-template-areas:
    ". TL Top TR ."
    "LT . . . RT"
    "Left . . . Right"
    "LB . . . RB"
    ". BL Bottom BR .";
  ${Cell} {
    width: 100%;
    text-align: center;
    padding: 0;
    align-self: center;
    justify-self: center;
    background-color: #ddd;
    padding: 5px;
    border-radius: 5px;
    box-sizing: border-box;
    font-family: sans-serif;
    cursor: pointer;
  }
`;

const grid = {
  TR: "topRight",
  Top: "top",
  TL: "topLeft",
  BR: "bottomRight",
  Bottom: "bottom",
  BL: "bottomLeft",
  LT: "leftTop",
  Left: "left",
  LB: "leftBottom",
  RT: "rightTop",
  Right: "right",
  RB: "rightBottom"
};

const GlobalStyle = createGlobalStyle`
  body{
    width:200vw !important;
    height:200vh !important;
  }
`;

const Div = styled.div`
  background-color: red;
  width: 100px;
  height: 50px;
`;

class Test extends Component {
  state = {
    visible: false,
    visible2: false
  };
  render() {
    return (
      <div style={{ padding: 100 }}>
        <GlobalStyle />

        {/* <Tooltip title="123">
          <Box>test</Box>
        </Tooltip> */}

        {/* <Btn1 onClick={() => this.setState({ visible2: !this.state.visible2 })}>
          显示/隐藏 整个Toolip
        </Btn1>
        <Btn1 onClick={() => this.setState({ visible: !this.state.visible })}>操作受控</Btn1>
        {this.state.visible2 && (
          <Tooltip
            // theme="light"
            // defaultVisible={true}
            visible={this.state.visible}
            onVisibleChange={e => {
              console.log(e);
            }}
            title={
              "hello world hello worldhello world hello worldhello world hello worldhello world hello worldhello world hello worldhello world hello worldhello world hello worldhello world hello worldhello world hello worldhello world hello world"
            }
            // placement="right"
          >
            <Btn1 defaultStyles={`margin:100px;`}>test22</Btn1>
          </Tooltip>
        )} */}

        {/* <Grid>
          {Object.keys(grid).map((s, i) => {
            return (
              <Tooltip
                key={i}
                title={"sssssssssssssssssssssssssssssssssssssssssssssssssss"}
                placement={grid[s]}
                defaultStyles={`
                  grid-area:${s};
                `}
              >
                <Cell>{s}</Cell>
              </Tooltip>
            );
          })}
        </Grid> */}

        {/* <Grid>
          {Object.keys(grid).map((s, i) => {
            return (
              <Tooltip
                key={i}
                title={"sssssssssssssssss"}
                placement={grid[s]}
              >
                <Cell>{s}</Cell>
              </Tooltip>
            );
          })}
        </Grid>*/}
        <br />

        {/* <Tooltip placement="topLeft" title="Prompt Text">
          <Btn1 defaultStyles={`margin-top:100px;`}>Align edge / 边缘对齐</Btn1>
        </Tooltip>
        <Tooltip
          placement="leftTop"
          title="PromptPromptPromptPromptPromptPromptPromptPromptPromptPromptPromptPromptPromptPrompt Text"
          arrowPointAtCenter
        >
          <span style={{ marginLeft: 300 }}>Arrow points to center / 箭头指向中心</span>
        </Tooltip>*/}

        <br />
        <SimpleTooltip
          // visible
          title="qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq"
          placement="rightTop"
          onVisibleChange={e => {
            console.log(e);
          }}
        >
          <div style={{ width: 100, height: 100, backgroundColor: "pink" }}>simple</div>
        </SimpleTooltip>
        <Tooltip
          // visible
          title="aaa"
          placement="bottom"
          onVisibleChange={e => {
            console.log(e);
          }}
          // getContainer={() => document.querySelector(".box")}
        >
          complex
        </Tooltip>
        <div className="box" style={{ height: 200, overflow: "auto", border: "1px solid #000" }}>
          {Array(20)
            .fill("")
            .map((a, i) => (
              <p key={i}>&nbsp;</p>
            ))}
          {Array(20)
            .fill("")
            .map((a, i) => (
              <p key={i}>&nbsp;</p>
            ))}
        </div>
        {/* <ComplexTooltip
          visible
          title="qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq"
          placement="topLeft"
        >
          <div style={{ width: 100, height: 100, backgroundColor: "red" }}>top</div>
        </ComplexTooltip>
        <ComplexTooltip visible title="qqqqqqq" placement="bottomLeft">
          <div style={{ width: 100, height: 100, backgroundColor: "red" }}>bottom</div>
        </ComplexTooltip> */}
      </div>
    );
  }
}

export default Test;
