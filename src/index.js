import React from 'react';
import ReactDOM from 'react-dom';

require('./styles/main.scss');


const App = () => <h1>Hello world</h1>;

ReactDOM.render(<App />, document.getElementById('app'));

if (module.hot) {
  module.hot.accept();
}
