import React, { Component } from 'react';
import { AppBar, Checkbox, DatePicker, Input, TimePicker } from 'react-toolbox';

import { observer } from 'mobx-react';

const datetime = new Date(2017, 1, 1);
datetime.setHours(17);
datetime.setMinutes(28);

const time = new Date();
time.setHours(17);
time.setMinutes(28);

@observer
class Ticket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: '',
      date: datetime,
      time,
    };
  }

  handleChange = (name, value) => {
    this.setState({ ...this.state, [name]: value });
  };

  render() {
    return (
      <section>
        <AppBar title="ADD A NEW TICKET" />
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}>
          <DatePicker hint="Choose a date" label="Date" name="Date" value={this.state.date} onChange={this.handleChange.bind(this, 'date')} />
          <TimePicker hint="Choose a time" label="Time" name="Time" value={this.state.time} onChange={this.handleChange.bind(this, 'time')} />
          <Input type="text" hint="Customer" label="Customer" name="Customer" value={this.state.customer} onChange={this.handleChange.bind(this, 'customer')} maxLength={16} />
        </div>
      </section>
    );
  }
}

export default Ticket;
