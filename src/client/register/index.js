import React, { Component } from 'react';
import './index.css'
import showResults from "./showResults";
import FieldLevelValidationForm from "./FieldLevelValidationForm";

require('es6-promise').polyfill();
require('isomorphic-fetch');

class App extends Component {
  componentWillMount() {
    console.log('api/Referrals');
    fetch('api/Referrals')
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
                 <h2>Create your Stripe account.</h2>
            </div>


            <FieldLevelValidationForm onSubmit={showResults} />
          </div>
        </div>
        <div id='footer'></div>
      </div>
    );
  }
}

//rules list component
class RulesList extends React.Component {
    render() {
        return (
            <ul>
                <li className={this.props.hasNumber}>
                    At least one number (0-9)
                </li>
                <li className={this.props.hasLetter}>
                    At least one letter (a-z)
                </li>
                <li className={this.props.hasUpperLetter}>
                    At least one uppser case letter (A-Z)
                </li>
                <li className={this.props.isValidLength}>
                    At least 8 characters
                </li>
                <li className={this.props.oneSpecialChar}>
                    At least 1 special characters (-!$%#@&*?)
                </li>
                <li className={this.props.noSpecialChar}>
                    No spaces, forward slashes (/) or double quote marks (&quot;)
                </li>
            </ul>
        )
    }
}

//rules meter component
class RulesMeter extends React.Component {
    render() {
        return (
            <div>
                <span>{this.props.title}</span>
                <div className="meter-wrapper">
                   <div className={this.props.className} style={{width: this.props.meterWidth + '%'}}></div>
                </div>
            </div>
        )
    }
}
//password component
class Password extends React.Component {
    render() {
        return (
            <span>
                <label htmlFor="password">Create Password</label><br/>
                <input
                id="password"
                type={this.props.type}
                placeholder="Enter password...."
                onChange={this.props.onChange}
                />
            </span>
        )
    }
}

//checkbox component
class CheckBox extends React.Component {
    render() {
        return (
            <label htmlFor="show-password">
                &nbsp;
                &nbsp;
                <input
                    id="show-password"
                    name="show-password"
                    type="checkbox"
                    checked={this.props.showPassword}
                    onChange={this.props.onClick}
                    />
                  &nbsp;Show Password
            </label>
        )
    }
}

 //the parent component
class PasswordStrength extends React.Component {
    constructor() {
        super();
        this.state = {
                        type: 'password',
                        checked: false,
                        meterTitle: 'Invalid',
                        meterClass: 'danger',
                        meterWidth: 25,
                        rules: {
                            isValidLength: false,
                            hasNumber: false,
                            hasLetter: false,
                            hasUpperLetter: false,
                            oneSpecialChar: false,
                            noSpecialChar: true
                        }
                     };
    }

    onCheckBoxClick() {
        var isChecked = !this.state.checked;
        this.setState({
            checked: isChecked,
            type: (isChecked ? "text" : "password")
        });
    }

    onPasswordChange(e) {
        this.setState({
            rules: {
                hasNumber: e.target.value.match(/\d/) ? true : false,
                hasLetter: e.target.value.match(/[A-z]/) ? true : false,
                hasUpperLetter: e.target.value.match(/[A-Z]/) ? true : false,
                isValidLength: e.target.value.match(/^.{8,}$/) ? true : false,
                oneSpecialChar: e.target.value.match(/[-!$%#@&*?]/) ? true : false,
                noSpecialChar: !e.target.value.match(/[ \/"]/) ? true : false
            }
        },function(){
            this.setMeterAttributes(this.state.rules);
        });
    }

    setMeterAttributes(rules){
       var meterWidth = this.getMeterWidth(rules);
       this.setState({
           meterWidth: meterWidth,
           meterTitle: (100 === meterWidth ? "Valid Password" : "Invalid Password"),
           meterClass: (100 > meterWidth ? "danger" : "")
       });
    }


    getMeterWidth (rules) {
        var property_count = 0, valid_property_count = 0, property;
        for (property in rules) {
            if (rules.hasOwnProperty(property)) {
                property_count = property_count + 1;
                if (rules[property]) {
                    valid_property_count = valid_property_count + 1;
                }
            }
        }
        return (valid_property_count / property_count) * 100;
    }

    getSingleRuleStatus(status) {
       if(status){
           return "valid";
       }
       return "invalid";
    }

    render() {
        return (
            <div className="password-strength-widget">
                <Password type={this.state.type} onChange={this.onPasswordChange.bind(this)}/>
                <CheckBox showPassword={this.state.checked} onClick={this.onCheckBoxClick.bind(this)}/>
                <br/><br/>
                <RulesMeter title={this.state.meterTitle} className={this.state.meterClass} meterWidth={this.state.meterWidth}/>
                <RulesList
                    isValidLength={this.getSingleRuleStatus(this.state.rules.isValidLength)}
                    hasNumber={this.getSingleRuleStatus(this.state.rules.hasNumber)}
                    hasLetter={this.getSingleRuleStatus(this.state.rules.hasLetter)}
                    hasUpperLetter={this.getSingleRuleStatus(this.state.rules.hasUpperLetter)}
                    oneSpecialChar={this.getSingleRuleStatus(this.state.rules.oneSpecialChar)}
                    noSpecialChar={this.getSingleRuleStatus(this.state.rules.noSpecialChar)}
                    />
            </div>
        )
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
export default App;
