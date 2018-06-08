import React, { Component } from "react";
import { Btn_1 as Btn } from "@src";
import { Link } from 'react-router-dom';
class Detail extends Component {
  render() {
    return (
      <Btn to={'/list'}>点击进入</Btn>
    );
  }
}

export default Detail;
