import { observable, action } from 'mobx';

class AppState {
  @observable authenticated
  @observable authenticating

  constructor() {
    this.authenticated = false;
    this.authenticating = false;
  }

  @action authenticate() {
    return new Promise((resolve, reject) => {
      console.log(reject);
      this.authenticating = true;
      setTimeout(() => {
        this.authenticated = !this.authenticated;
        this.authenticating = false;
        resolve(this.authenticated);
      }, 0);
    });
  }
}

export default AppState;
