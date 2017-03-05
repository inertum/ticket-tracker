import React, { Component, PropTypes } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider, observer } from 'mobx-react';

import { Layout, NavDrawer, Panel, Sidebar, AppBar, IconButton } from 'react-toolbox';

import Ticket from './Ticket';

@observer
export default class App extends Component {
  static propTypes = {
    store: PropTypes.object,
  }

  static defaultProps = {
    authenticate: {},
    store: {},
  };

  state = {
    drawerActive: false,
    drawerPinned: false,
    sidebarPinned: false,
  };

  componentDidMount() {
    this.authenticate();
  }

  authenticate = (e) => {
    if (e) e.preventDefault();
    this.props.store.authenticate();
  }

  toggleDrawerActive = () => {
    this.setState({ drawerActive: !this.state.drawerActive });
  };

  toggleDrawerPinned = () => {
    this.setState({ drawerPinned: !this.state.drawerPinned });
  }

  toggleSidebar = () => {
    this.setState({ sidebarPinned: !this.state.sidebarPinned });
  };

  render() {
    return (
      <Router>
        <Provider store={this.props.store}>
          <Layout>
            <NavDrawer
              active={this.state.drawerActive}
              pinned={this.state.drawerPinned} permanentAt="xxxl"
              onOverlayClick={this.toggleDrawerActive}
            >
              <p>
                    Navigation, account switcher, etc. go here.
                </p>
            </NavDrawer>
            <Panel>
              <AppBar leftIcon="menu" onLeftIconClick={this.toggleDrawerActive} />
              <Ticket />
            </Panel>
            <Sidebar pinned={this.state.sidebarPinned} width={5}>
              <div><IconButton icon="close" onClick={this.toggleSidebar} /></div>
              <div style={{ flex: 1 }}>
                <p>Supplemental content goes here.</p>
              </div>
            </Sidebar>
          </Layout>
        </Provider>
      </Router>
    );
  }
}
