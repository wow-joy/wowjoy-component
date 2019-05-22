import * as React from "react";
import * as ReactDom from "react-dom";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./Home/index";
import List from "./List/index";
import Detail from "./Detail/index";
import "../../src/media/common.css";
import { Layout } from "@src";
import styled from "styled-components";
import { ReactComponent as Svg } from "@media/logo.svg";

const Title = styled.h1`
  text-align: center;
  color: #fff;
  background: #06aea6;
`;
const Logo = styled(Svg)`
  vertical-align: middle;
  width: 32px;
  height: 32px;
  path {
    fill: #fff;
  }
`;
class Routers extends React.Component {
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
class Demo extends React.Component {
  render() {
    return (
      <Layout
        header={
          <Title>
            <Logo />
            wowjoy-component Demo Home
          </Title>
        }
      >
        <Routers />
      </Layout>
    );
  }
}

ReactDom.render(
  <BrowserRouter>
    <Demo />
  </BrowserRouter>,
  document.querySelector('#demo')
);
