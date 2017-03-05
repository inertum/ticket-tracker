import React, { Component } from 'react';
import { Checkbox, DatePicker, Input, TimePicker } from 'react-toolbox';

import { observer } from 'mobx-react';

@observer
class Ticket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: '',
    };
  }

  handleChange = (name, value) => {
    this.setState({ ...this.state, [name]: value });
  };

  render() {
    return (
      <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}>
        <h1>Add a new ticket</h1>
        <DatePicker />
        <TimePicker />
        <Input type="text" hint="Customer" label="Customer" name="Customer" value={this.state.customer} onChange={this.handleChange.bind(this, 'customer')} maxLength={16} />
        <Checkbox label="Pin drawer" />
        <Checkbox label="Show sidebar" />
      </div>
    );
  }
}

export default Ticket;
