import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {Slider} from '@src';
class Demo extends PureComponent {
  render() {
    return (
      <div style={{ width: 600, height: 600, margin: 30 }}>
        <Slider
          defaultValue={[20, 50, 80]}
          // tooltipVisible
          //  tipFormatter={null}
          // vertical
        />
        <Slider
          step={5}
          defaultValue={[20, 50, 80]}
          // tooltipVisible
          //  tipFormatter={null}
          // vertical
        />
    </div>
    );
  }
}



export default Demo;