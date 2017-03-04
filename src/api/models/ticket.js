import date from './date';
import customer from './customer';
import project from './project';
import expense from './expense';

const ticket = {
  id: '',
  date,
  start_time: '',
  end_time: '',
  duration: '',
  customer,
  project,
  reference: '',
  type: '',
  description: '',
  additional_expenses: [{
    expense,
  }],
  additional_information: '',
};

export default ticket;
