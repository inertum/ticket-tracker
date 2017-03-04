import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  render() {
    return <h1>{this.props.children}</h1>;
  }
}

ReactDOM.render(<App>What is happening</App>, document.getElementById('app'));

if (module.hot) {
  module.hot.accept();
}
