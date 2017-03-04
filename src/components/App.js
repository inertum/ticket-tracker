import React, { Component, PropTypes } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Provider, observer } from 'mobx-react';

import Appbar from 'muicss/lib/react/appbar';
import Button from 'muicss/lib/react/button';
import Container from 'muicss/lib/react/container';

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
          <div className="wrapper">
            <Appbar></Appbar>
            <Container>
              <Button color="primary">button</Button>
            </Container>
          </div>
        </Provider>
      </Router>
    );
  }
}
