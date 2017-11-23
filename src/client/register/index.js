import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './index.css'
import { registerUser } from '../../actions/authActions'
import showResults from "./showResults"
import FieldLevelValidationForm from "./FieldLevelValidationForm"

require('es6-promise').polyfill();
require('isomorphic-fetch');

class App extends Component {
  componentWillMount() {
    console.log('api/Referrals');
    fetch('api/Referrals')
  }
  onFormSubmit(values) {
    console.log(values);
    this.props.actions.registerUser({data: values})
  }
  render() {
    //<PasswordStrength/>
    //<FieldLevelValidationForm onSubmit={showResults} />
    //<NewComponent/>
    return (
      <div className="login">
        <div id='header'>
          <h1>Nettok</h1>
        </div>
        <div id='main-body' className="box">
          <div className="innter">
            <div className="title extra">
                 <h2>Create your Nettok account.</h2>
            </div>
            <p className="danger-alert">{this.props.server_response}</p>
            <FieldLevelValidationForm onSubmit={this.onFormSubmit.bind(this)} />
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
            <input type="email"  name="email" id="email" placeholder="Email" autoComplete='email'/>
          </span>
        </p>
        <p className="text">
          <span>
            <label htmlFor="name">Full name</label>
            <input type="text"  name="name" id="name" placeholder="Full name" autoComplete='name'/>
          </span>
        </p>
        <p className="text">
          <span className="password-strength" data-password-strength="2">
            <label htmlFor="password">Password</label>
            <input type="password"  name="password" id="password" placeholder="Password" autoComplete="new-password" className="password-strength-input" />
            <span className="password-strength-indicator">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </span>
            <span className="password-strength-popover" style={{display: 'block'}}>
              <span className="password-strength-popover-status">Thats alright.</span>
              <span className="password-strength-popover-explanation">
                <ul>
                  <li className="invalid">At least 1 number (0-9)</li>
                  <li className="invalid">At least 1 letter (a-z)</li>
                  <li className="invalid">At least 1 uppser case (A-Z)</li>
                  <li className="invalid">At least 8 characters</li>
                  <li className="invalid">At least 1 special characters (-!$%#@&amp;*?)</li>
                  <li className="valid">No spaces, forward slashes (/) or double quote marks (")</li>
                </ul>
                {/*Good passwords are hard to guess. Try using a multi-word phrase, uncommon words, numbers or symbols.*/}
              </span>
            </span>
        </span>
        </p>
        <p className="text">
          <span>
            <label htmlFor="confirm_password">Confirm Password</label>
            <input type="password"  name="confirm_password" id="confirm_password" autoComplete="new-password" placeholder="Confirm password" />
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

function mapStateToProps(state, ownProps) {
  console.log(state);
  const { register: { error } } = state
  let server_error = null
  if (error) {
    try {
      if (error.hasOwnProperty('message') && typeof error.message === 'string')
      server_error = 'Error - ' + error.message.substring(error.message.indexOf('Details:'))
    } catch (e) {
      console.error(e);
    }
  }

  console.log(server_error);
  return {
    server_response: server_error
  }
}
function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({
      registerUser
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
