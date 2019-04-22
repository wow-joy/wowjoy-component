import * as React from "react";
import { Btn_1 as Btn } from "@src";

class Home extends React.Component {
  render() {
    return <Btn to={"/list"}>点击进入</Btn>;
  }
}

export default Home;
