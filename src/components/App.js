import React, { Component, PropTypes } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider, observer } from 'mobx-react';

import { AppBar, Checkbox, IconButton } from 'react-toolbox';
import { Layout, NavDrawer, Panel, Sidebar } from 'react-toolbox';

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

  toggleDrawerActive = () => {
    this.setState({ drawerActive: !this.state.drawerActive });
  };

  toggleDrawerPinned = () => {
    this.setState({ drawerPinned: !this.state.drawerPinned });
  }

  toggleSidebar = () => {
    this.setState({ sidebarPinned: !this.state.sidebarPinned });
  };

  authenticate = (e) => {
    if (e) e.preventDefault();
    this.props.store.authenticate();
  }

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
              <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}>
                <h1>Main Content</h1>
                <p>Main content goes here.</p>
                <Checkbox label="Pin drawer" checked={this.state.drawerPinned} onChange={this.toggleDrawerPinned} />
                <Checkbox label="Show sidebar" checked={this.state.sidebarPinned} onChange={this.toggleSidebar} />
              </div>
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
