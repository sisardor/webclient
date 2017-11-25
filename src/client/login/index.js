import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { login } from '../../actions/authActions'
import LoginForm from './LoginForm'

import './index.css'
require('es6-promise').polyfill();
require('isomorphic-fetch');

class App extends Component {
  componentWillMount() {
    console.log('api/Referrals');
    fetch('api/Referrals')
  }
  onFormSubmit(values) {
    console.log(values);
    this.props.actions.login({data:values})
  }
  render() {
    return (
      <div className="login">
        <div id='header'>
          <h1>Nettok</h1>
        </div>
        <div id='main-body' className="box">
          <div className="innter">
            <h2><span>Welcome back!</span></h2>
            {/*<NewComponent/>*/}
            <LoginForm onSubmit={this.onFormSubmit.bind(this)}/>
          </div>
        </div>
        <div id='footer' className="box" >
          <Link to={`/register`}>Dont have an account? <span>Sign up</span></Link>
        </div>
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
              <input type="email" name="email" placeholder="Email" autoComplete="email"   />
            </span>
          </p>
          <p className="text">
            <span>
              <label htmlFor="password"><span>Password</span></label>
              <input type="password" name="password" id="password" autoComplete="current-password" placeholder="Password"  />
            </span>
          </p>
          <p className="forgot first-step">
            <Link to={`/reset`}><span>Forgot your password?</span></Link>
          </p>
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


function mapStateToProps(state, ownProps) {

  return {

  }
}
function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({
      login
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
