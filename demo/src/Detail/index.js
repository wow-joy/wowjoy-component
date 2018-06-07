import React, { Component } from 'react';
import Components from '../../../src'

class Detail extends Component {
  render() {
    const { match } = this.props;
    const ComponentItem = Components[match.params.name];
    return (
      <div>
        This is Detail!
        <ComponentItem />
      </div>
    );
  }
}

export default Detail;