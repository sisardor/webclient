import React, { Component } from 'react';
import './index.css'
require('es6-promise').polyfill();
require('isomorphic-fetch');

class App extends Component {
  componentWillMount() {
    console.log('api/Referrals');
    fetch('api/Referrals')
  }
  render() {
    return (
      <div className="login">
        <div id='header'>
          <h1>Nettok</h1>
        </div>
        <div id='main-body' className="box">
          <div className="innter">
            <NewComponent/>
          </div>
        </div>
        <div id='footer'></div>
      </div>
    );
  }
}

class NewComponent extends Component {
  render() {
    return (
      <form method="POST">
        <div className="step email-password-step">
          <h2><span>Welcome back!</span></h2>
          <p className="text">
            <span>
              <label htmlFor="email"><span>Email</span></label>
              <input type="email" name="email" id="email" placeholder="Email"  />
            </span>
          </p>
          <p className="text">
            <span>
              <label htmlFor="password"><span>Password</span></label>
              <input type="password" name="password" id="password" placeholder="Password"  />
            </span>
          </p>
          <p className="forgot first-step"><a href="/reset"><span>Forgot your password?</span></a></p>
          <p className="remember">
            <label>
              <input type="checkbox" name="remember" defaultValue="on" /><span>Remember me</span>
            </label>
          </p>
          <p className="submit"><button className="button blue" type="submit"><span>Sign in to your account</span></button></p>
        </div>
        <input type="hidden" defaultValue />
      </form>
    );
  }
}
export default App;
