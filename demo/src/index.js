import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./Home";
import List from "./List";
import Detail from "./Detail";
import "../../src/media/common.css";
import { Layout_2 as Layout } from "@src";
import styled from "styled-components";
import { ReactComponent as Svg } from "@media/logo.svg";

const Title = styled.h1`
  text-align: center;
  color: #fff;
`;
const Logo = styled(Svg)`
  vertical-align: middle;
  width: 32px;
  height: 32px;
  path {
    fill: #fff;
  }
`;
class Routers extends Component {
  render() {
    return (
      <BrowserRouter basename={`/`}>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/detail/:name" component={Detail} />
          <Route path="/list" component={List} />
          {/* <Route
        path="/Editor"
        component={Editor}
      /> */}
          <Redirect to="/home" />
        </Switch>
      </BrowserRouter>
    );
  }
}
class Demo extends Component {
  render() {
    return (
      <Layout
        header={
          <Title>
            <Logo />
            wowjoy-component Demo Home
          </Title>
        }
        asideLeft={1}
        asideRight={2}
        main={<Routers />}
      />
    );
  }
}

render(
  <BrowserRouter>
    <Demo />
  </BrowserRouter>,
  document.querySelector("#demo")
);
