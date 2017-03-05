import React, { Component } from 'react';
import { AppBar, Autocomplete, IconButton, DatePicker, Input, TimePicker } from 'react-toolbox';

import { observer } from 'mobx-react';

const datetime = new Date(2017, 1, 1);
datetime.setHours(17);
datetime.setMinutes(28);

const time = new Date();
time.setHours(17);
time.setMinutes(28);

const customerSource = {
  C1: 'Customer 1',
  C2: 'Customer 2',
  C3: 'Customer 3',
  C4: 'Customer 4',
};

@observer
class Ticket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: '',
      date: datetime,
      startTime: time,
      endTime: time,
    };
  }

  handleChange = (name, value) => {
    this.setState({ ...this.state, [name]: value });
  };

  handleCustomerChange = (value) => {
    this.setState({ customer: value });
  };

  render() {
    return (
      <section>
        <AppBar title="ADD A NEW TICKET" />
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}>
          <p>Enter information below</p>
          <Autocomplete
            title="Customer"
            name="Customer"
            hint="Choose customer"
            direction="down"
            selectedPosition="above"
            label="Choose customer"
            multiple={false}
            onChange={this.handleCustomerChange}
            source={customerSource}
            value={this.state.customer}
          />
          <div style={{ display: 'inline-block', overflowY: 'auto', width: '33%' }}>
            <DatePicker icon="view_day" hint="Choose a date" label="Date" name="Date" value={this.state.date} onChange={this.handleChange.bind(this, 'date')} />
          </div>
          <div style={{ display: 'inline-block', overflowY: 'auto', width: '33%' }}>
            <TimePicker icon="schedule" hint="Choose start time" label="Start Time" name="startTime" value={this.state.startTime} onChange={this.handleChange.bind(this, 'startTime')} size="6" />
          </div>
          <div style={{ display: 'inline-block', overflowY: 'auto', width: '33%' }}>
            <TimePicker icon="schedule" hint="Choose end time" label="End Time" name="endTime" value={this.state.endTime} onChange={this.handleChange.bind(this, 'endTime')} />
          </div>
        </div>
      </section>
    );
  }
}

export default Ticket;
