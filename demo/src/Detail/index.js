import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import Components from "@src";
import { ReactComponent as Icon } from "@media/test.svg";
import { Pop, Btn_1 as Btn1, Tooltip } from "@src";
import { pop } from "@lib/tools";
import styled, { css, keyframes, createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body{
    width: 200vh !important;
    height: 200vh !important;
  }
`;

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
        <GlobalStyle />
        <Btn1 onClick={() => this.setState({ visible2: !this.state.visible2 })}>
          显示/隐藏 整个Toolip
        </Btn1>
        <Btn1 onClick={() => this.setState({ visible: !this.state.visible })}>
          操作受控
        </Btn1>
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
            placement="right"
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
                title={"ssssssssssssssssssssssss"}
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

const PROPS = {
  current: 1,
  direction: "vertical",
  // labelPlacement: "vertical",
  type: "dot" // basic dot arrow
};

class Detail extends Component {
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
        <React.Fragment>
          {/* <ComponentItem /> */}
          <Test />
        </React.Fragment>
      );
    }
    return <div>ComponentItem not found</div>;
  }
}

export default Detail;
