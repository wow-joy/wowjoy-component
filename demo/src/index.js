import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./Home";
import List from "./List";
import Detail from "./Detail";
import "../../src/media/common.css";
class Demo extends Component {
  render() {
    return (
      <div>
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
      </div>
    );
  }
}

render(<Demo />, document.querySelector("#demo"));
