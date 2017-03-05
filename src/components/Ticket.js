import React, { Component } from 'react';
import { Checkbox } from 'react-toolbox';

import { observer } from 'mobx-react';

@observer
class Ticket extends Component {
  state = {

  }

  render() {
    return (
      <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}>
        <h1>What is going on?</h1>
        <p>This is so fucking cool!</p>
        <Checkbox label="Pin drawer" />
        <Checkbox label="Show sidebar" />
      </div>
    );
  }
}

export default Ticket;
