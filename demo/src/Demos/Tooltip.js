import React, { Component } from "react";
import { Btn_1 as Btn1, Tooltip } from "@src";
import styled from "styled-components";

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

class Test extends Component {
  state = {
    visible: true,
    visible2: true
  };
  render() {
    return (
      <div>
        <Btn1 onClick={() => this.setState({ visible2: !this.state.visible2 })}>
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
        )}
        <Grid>
          {Object.keys(grid).map((s, i) => {
            return (
              <Tooltip
                // theme="light"
                key={i}
                title={"sssssssssssssssss"}
                placement={grid[s]}
              >
                <Cell area={s}>{s}</Cell>
              </Tooltip>
            );
          })}
        </Grid>
      </div>
    );
  }
}

export default Test;
