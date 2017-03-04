import React, { Component, PropTypes } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider, observer } from 'mobx-react';

import Option from 'muicss/lib/react/option';
import Select from 'muicss/lib/react/select';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Textarea from 'muicss/lib/react/textarea';
import Button from 'muicss/lib/react/button';
import Radio from 'muicss/lib/react/radio';

import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

@observer
export default class App extends Component {
  static propTypes = {
    store: PropTypes.object,
  }

  static defaultProps = {
    authenticate: {},
    store: {},
  };

  componentDidMount() {
    this.authenticate();
  }

  authenticate = (e) => {
    if (e) e.preventDefault();
    this.props.store.authenticate();
  }

  render() {
    return (
      <Router>
        <Provider store={this.props.store}>
          <Container>
            <Form>
              <Row>
                <Col md="12">
                  <Input label="Date" floatingLabel />
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <Input label="Start time" floatingLabel />
                </Col>
                <Col md="6">
                  <Input label="End time" floatingLabel />
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <Input label="Client" floatingLabel />
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <Select defaultValue="option-1" label="Projekti">
                    <Option value="option-1" label="Optimize" />
                    <Option value="option-2" label="Cache" />
                    <Option value="option-3" label="Backup" />
                    <Option value="option-4" label="+ Add new project" />
                  </Select>
                </Col>
                <Col md="6">
                  <Radio name="type" label="Task" />
                  <Radio name="type" label="Support Request" />
                  <Radio name="type" label="On-Call" />
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <Textarea label="Description" floatingLabel />
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <Button size="large" color="primary">button</Button>
                </Col>
              </Row>
            </Form>
          </Container>
        </Provider>
      </Router>
    );
  }
}
