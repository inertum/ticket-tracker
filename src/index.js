import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import AppState from './stores/AppState';

require('./styles/main.scss');

const appState = new AppState();

ReactDOM.render(
  <App store={appState} />,
  document.getElementById('app'),
);

if (module.hot) {
  module.hot.accept();
}
