import React, { Component } from 'react';
import { Checkbox, Input } from 'react-toolbox';

import { observer } from 'mobx-react';

@observer
class Ticket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }

  handleChange = (name, value) => {
    this.setState({ ...this.state, [name]: value });
  };

  render() {
    return (
      <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}>
        <h1>What is going on?</h1>
        <p>This is so fucking cool!</p>
        <Input type="text" label="Name" name="name" value={this.state.name} onChange={this.handleChange.bind(this, 'name')} maxLength={16} />
        <Checkbox label="Pin drawer" />
        <Checkbox label="Show sidebar" />
      </div>
    );
  }
}

export default Ticket;
