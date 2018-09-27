import React, { Component } from 'react';

import { Provider } from 'react-redux';

import './App.css';
import store from './reducers/store';
import DataContainer from './container/DataContainer';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <DataContainer />
        </div>
      </Provider>
    );
  }
}

export default App;
