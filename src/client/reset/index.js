import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './index.css'
import EmailResetForm from './EmailResetForm'
import { registerUser } from '../../actions/authActions'
require('es6-promise').polyfill();
require('isomorphic-fetch');

class App extends Component {
  componentWillMount() {
    fetch('api/Referrals')
  }
  onFormSubmit(values) {
    // this.props.actions.registerUser({data: values})
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
          {/*<NewComponent />*/}
          <EmailResetForm onSubmit={this.onFormSubmit.bind(this)} />
          {/*<div className="innter">
            <div className="title extra">
                 <h2>Create your Nettok account.</h2>
            </div>
          </div>*/}
        </div>
        <div id='footer'></div>
      </div>
    );
  }
}

class NewComponent extends Component {
  render() {
    return (
      <form className="request-reset">
        <div className="request-reset-step step">
          <div className="title">
            <h2>Reset your password</h2>
          </div>
          <p className="error-message hidden" />
          <p className="message">
            Enter your email address below and well send you a link to reset your password.
          </p>
          <p className="text">
            <span>
              <label htmlFor="email">Your Email</label>
              <input type="email" name="email" id="email" placeholder="Your email" />
            </span>
          </p>
          <input type="hidden" name="csrf_token" defaultValue="" />
          <p className="submit">
            <button type="submit" className="button blue medium"><span>Send reset password email</span></button>
          </p>
        </div>
        <div className="step verify-your-humanity-step hidden">
          <div className="title">
            <h2>Please confirm youre not a robot</h2>
          </div>
          <p className="text">
          </p><div className="g-recaptcha" data-sitekey="6LezRwYTAAAAAClbeZahYjeSYHsbwpzjEQ0hQ1jB" data-callback="captchaCompleted"><div style={{width: 304, height: 78}}><div><iframe src="https://www.google.com/recaptcha/api2/anchor?k=6LezRwYTAAAAAClbeZahYjeSYHsbwpzjEQ0hQ1jB&co=aHR0cHM6Ly9kYXNoYm9hcmQuc3RyaXBlLmNvbTo0NDM.&hl=en&v=r20171115120512&size=normal&cb=it5jv8ofrwbo" width={304} height={78} role="presentation" frameBorder={0} scrolling="no" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox" /></div><textarea id="g-recaptcha-response" name="g-recaptcha-response" className="g-recaptcha-response" style={{width: 250, height: 40, border: '1px solid #c1c1c1', margin: '10px 25px', padding: 0, resize: 'none', display: 'none'}} defaultValue={""} /></div></div>
          <p />
          <p className="submit">
            <button type="submit" className="button blue medium"><span>Send reset password email</span></button>
          </p>
        </div>
        <div className="email-sent-step step hidden" style={{minHeight: 170}}>
          <div className="title">
            <h2>Reset your password</h2>
          </div>
          <p className="message">
            An email is on its way to you.
            Follow the instructions to reset your password.
          </p>
        </div>
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

    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
