import React, { Component, PropTypes } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider, observer } from 'mobx-react';

import { Card, Button, Layout, Sidebar, IconButton } from 'react-toolbox';

import Ticket from './Ticket';

@observer
export default class App extends Component {
  static propTypes = {
    store: PropTypes.shape({
      authenticated: PropTypes.boolean,
      authenticating: PropTypes.boolean,
      authenticate: PropTypes.function,
    }),
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
          <div style={{ maxWidth: '1180px', margin: '10px auto 0' }}>
            <Layout>
              <Button label="+ New ticket" flat primary />
              <Card style={{ maxWidth: '100%' }}>
                <Ticket />
              </Card>
            </Layout>
          </div>
        </Provider>
      </Router>
    );
  }
}
