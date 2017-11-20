import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
require('es6-promise').polyfill();
require('isomorphic-fetch');

class App extends Component {
  componentWillMount() {
    console.log('api/Referrals');
    fetch('api/Referrals')
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
