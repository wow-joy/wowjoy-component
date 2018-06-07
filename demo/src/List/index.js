import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Components from '../../../src'

class List extends Component {
  render() {
    return (
      <ul>
          {
            Object.keys(Components).map((ele, index)=><li><Link to={`/detail/${ele}`}>{ele}</Link></li>)
          }
        
      </ul>
    );
  }
}

export default List;