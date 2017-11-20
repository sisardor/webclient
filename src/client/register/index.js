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
            <div className="title extra">
                 <h2>Create your Stripe account.</h2>
            </div>
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

      <form method="POST" action="/register">
        {/*<div id="email_suggestion">
          <p className="email_suggestion-label">
            Did you mean <strong className="suggested" /> instead of <strong className="current" />?
          </p>
          <a className="email_suggestion-button accept button grey small">
            <span>Update my email</span>
          </a>
          <a className="email_suggestion-ignore">Close</a>
        </div>*/}
        <p className="text">
          <span>
            <label htmlFor="email">Email</label>
            <input type="email"  name="email" id="email" placeholder="Email" />
          </span>
        </p>
        <p className="text">
          <span>
            <label htmlFor="name">Full name</label>
            <input type="text"  name="name" id="name" placeholder="Full name" />
          </span>
        </p>
        <p className="text">
          <span>
            <label htmlFor="password">Password</label>
            <input type="password"  name="password" id="password" placeholder="Password" className="password-strength-input" />
          </span>
        </p>
        <p className="text">
          <span>
            <label htmlFor="confirm_password">Confirm Password</label>
            <input type="password"  name="confirm_password" id="confirm_password" placeholder="Confirm password" />
          </span>
        </p>
        <div>
          <p className="submit">
            <button type="submit" className="button blue medium"><span>Create your Stripe account</span></button>
          </p>
          <p className="remember" style={{display: 'none'}}>
            <label><input type="checkbox" name="remember" defaultChecked="checked" /> Remember me</label>
          </p>
        </div>
      </form>
    );
  }
}
export default App;
