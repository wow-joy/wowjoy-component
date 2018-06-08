import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./Home";
import List from "./List";
import Detail from "./Detail";
import "../../src/media/common.css";
import { Layout_2 as Layout } from "@src";
import style from './index.scss';
import { ReactComponent as Logo } from "@media/logo.svg";

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
        header={{
          content: (
            <h1 className={style.title}>
              <Logo className={style.logo} />
              wowjoy-component Demo Home
            </h1>
          )
        }}
        asideLeft={false}
        asideRight={false}
        main={{
          content: <Routers />
        }}
      />
    );
  }
}

render(<Demo />, document.querySelector("#demo"));
