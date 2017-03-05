import React, { Component } from 'react';
import { AppBar, Autocomplete, DatePicker, TimePicker, RadioGroup, RadioButton } from 'react-toolbox';

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
      type: '',
    };
  }

  handleChange = (name, value) => {
    this.setState({ ...this.state, [name]: value });
  };

  handleCustomerChange = (value) => {
    this.setState({ customer: value });
  };

  handleTypeChange = (value) => {
    this.setState({ type: value });
  };

  render() {
    return (
      <section>
        <AppBar title="ADD A NEW TICKET" />
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}>
          <div style={{ display: 'inline-block', overflowY: 'auto', width: '25%' }}>
            <RadioGroup style={{ display: 'inline-block' }} name="type" value={this.state.type} onChange={this.handleTypeChange}>
              <RadioButton style={{ display: 'inline-block', padding: '0.5em' }} label="Project" value="project" />
              <RadioButton style={{ display: 'inline-block', padding: '0.5em' }} label="Support" value="support" />
              <RadioButton style={{ display: 'inline-block', padding: '0.5em' }} label="Task" value="task" />
            </RadioGroup>
          </div>
          <div style={{ display: 'inline-block', overflowY: 'auto', width: '75%' }}>
            <div style={{ display: 'inline-block', overflowY: 'auto', width: '33%' }}>
              <DatePicker icon="view_day" hint="Choose a date" label="Date" name="Date" value={this.state.date} onChange={this.handleChange.bind(this, 'date')} />
            </div>
            <div style={{ display: 'inline-block', overflowY: 'auto', width: '33%' }}>
              <TimePicker icon="schedule" hint="Choose start time" label="Start Time" name="startTime" value={this.state.startTime} onChange={this.handleChange.bind(this, 'startTime')} size="6" />
            </div>
            <div style={{ display: 'inline-block', overflowY: 'auto', width: '33%' }}>
              <TimePicker icon="schedule" hint="Choose end time" label="End Time" name="endTime" value={this.state.endTime} onChange={this.handleChange.bind(this, 'endTime')} />
            </div>
            <Autocomplete
              icon="account_box"
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
            <div style={{ display: 'inline-block', overflowY: 'auto', width: '50%' }}>
              <Autocomplete
                icon="work"
                title="Project"
                name="Project"
                hint="Choose project"
                direction="down"
                selectedPosition="above"
                label="Choose project"
                multiple={false}
                source={customerSource}
              />
            </div>
            <div style={{ display: 'inline-block', overflowY: 'auto', width: '50%' }}>
              <Autocomplete
                icon="search"
                title="Reference"
                name="Reference"
                hint="Choose reference"
                direction="down"
                selectedPosition="above"
                label="Choose reference"
                multiple={false}
                source={customerSource}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Ticket;
