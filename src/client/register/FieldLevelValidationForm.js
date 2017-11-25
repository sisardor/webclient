import React from 'react'
import { Field, reduxForm } from 'redux-form'
import Recaptcha from 'react-recaptcha'
// import ReCAPTCHA from "react-google-recaptcha"

const required = value => value ? undefined : 'Required'
const maxLength = max => value => value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength15 = maxLength(15)
const minLength = max => value => value && value.length < max ? `Must be ${max} characters or more` : undefined
const minLength8 = minLength(8)
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined
const minValue = min => value => value && value < min ? `Must be at least ${min}` : undefined
const minValue18 = minValue(18)
const minValue8 = minValue(8)
const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined
const tooOld = value => value && value > 65 ? 'You might be too old for this' : undefined
const aol = value => value && /.+@aol\.com/.test(value) ? 'Really? You still use AOL for your email?' : undefined
const match  = (field, fields) => fields.password !== fields.confirm_password && 'Passwords do not match.'
const hasNumber = value => value && value.match(/\d/) !== null ? undefined : "At least 1 number (0-9)"
const hasLetter = value => value && value.match(/[a-z]/) !== null ? undefined : "At least 1 letter (a-z)"
const hasUpperLetter = value => value && value.match(/[A-Z]/) !== null  ? undefined : "At least 1 uppser case (A-Z)"
const isValidLength = value => value && value.match(/^.{8,}$/) !== null  ? undefined : "At least 8 characters"
const oneSpecialChar = value => value && value.match(/[-=!$%#@&*?]/) !== null  ? undefined : "At least 1 special characters (-=!$%#@&*?)"
const noSpecialChar = value => value && value.match(/[ \/"]/) === null  ? undefined : "No spaces, forward slashes (/) or double quote marks (\")"

const renderField = ({ input, label, type, meta: { touched, error, active, warning } }) => {
  let error_span = <span className="password-strength-popover" style={{display: 'block'}}>
    <span className="password-strength-popover-status">{error}</span>
  </span>
  let style = (touched && error) ? {border: '1px solid red'} : {}
  return <p className="text">
    <span  className="password-strength" data-password-strength="0">
      <label>{label}</label>
      <input {...input} placeholder={label} style={style} type={type}  autoComplete={'name'}/>
      {(touched && active) && ((error && error_span ) || (warning && <span>{warning}</span>))}
    </span>
  </p>
}
const renderFieldWithAutoComplete = ({ input, label, type, meta: { touched, active, error, warning } }) => {
  let error_span = <span className="password-strength-popover" style={{display: 'block'}}>
    <span className="password-strength-popover-status">{error}</span>
  </span>
  let style = (touched && error) ? {border: '1px solid red'} : {}
  return <p className="text">
    <span className="password-strength" data-password-strength="0">
      <label>{label}</label>
      <input {...input} placeholder={label} type={type} style={style} autoComplete={type} />
      {(touched && active) && ((error && error_span ) || (warning && <span>{warning}</span>))}
    </span>
  </p>
}
const renderFieldWithAutoComplete2 = ({ input, label, type, meta: { touched, active, error, warning } }) => {
  let error_span = <span className="password-strength-popover" style={{display: 'block'}}>
    <span className="password-strength-popover-status">{error}</span>
  </span>
  let style = (touched && error) ? {border: '1px solid red'} : {}
  return <p className="text">
    <span className="password-strength" data-password-strength="0">
      <label>{label}</label>
      <input {...input} placeholder={label} type={type} style={style} autoComplete="new-password" />
      {(touched && active) && ((error && error_span ) || (warning && <span>{warning}</span>))}
    </span>
  </p>
}
const renderFieldPassword = ({ input, label, type, meta: { touched, error, warning } }) => {
  // console.log(error);
  return <input {...input} placeholder={label} type={type} autoComplete="new-password" />
}

var callback = function () {
  console.log('Done!!!!');
};
var verifyCallback = function (response) {
  console.log(response);
};

const Captcha = (props) => (
  <Recaptcha
    render="explicit"
    onloadCallback={callback}
    verifyCallback={props.input.onChange}
    onloadCallback={console.log.bind(this, "recaptcha loaded")}
    sitekey="6LdM3zkUAAAAAJ3MkNFmbXPcVg47p_t-Yv8lW5I2"
  />
);

const FieldLevelValidationForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props

  return (
    <form onSubmit={handleSubmit}>
      <Field name="email" type="email"
        component={renderFieldWithAutoComplete} label="Email"
        validate={[required, email]}
        warn={aol}
      />
      <Field name="full_name" type="text"
        label="Full name"
        component={renderField}
        validate={[ required, maxLength15 ]}
      />
      <PasswordStrength/>
      {/*<Field
        name="passwordx"
        type="password"
        component={renderFieldWithAutoComplete2}
        validate={[required, hasNumber, hasLetter, hasUpperLetter, isValidLength, oneSpecialChar, noSpecialChar]}
        label="Passwordx"
      />
      <Field
        name="password"
        type="password"
        component={renderFieldWithAutoComplete2}

        label="Confirm password"
      />*/}

      <Field
        name="confirm_password"
        type="password"
        component={renderFieldWithAutoComplete2}
        validate={match}
        label="Confirm password"
      />

      <Field name='g-recaptcha-response' validate={required} component={Captcha}/>
      <Field name="_csrf" type="hidden" component="input" />

      <div>
        <p className="submit">
          <button type="submit" disabled={submitting} className="button blue medium">
            <span>Create your Stripe account</span>
          </button>
        </p>

        {/*<button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>*/}
      </div>
    </form>
  )
}


//rules list component
class RulesList extends React.Component {
    render() {
        // console.log(this.props);
        return (
          <span className="password-strength-popover" style={{display: 'block'}}>
            <span className="password-strength-popover-status">Thats alright.</span>
            <span className="password-strength-popover-explanation">
              <span className={this.props.hasNumber}>At least 1 number (0-9)</span>
              <span className={this.props.hasLetter}>At least 1 letter (a-z)</span>
              <span className={this.props.hasUpperLetter}>At least 1 uppser case (A-Z)</span>
              <span className={this.props.isValidLength}>At least 8 characters</span>
              <span className={this.props.oneSpecialChar}>At least 1 special characters (-!$%#@&amp;*?)</span>
              <span className={this.props.noSpecialChar}>No spaces, forward slashes (/) or double quote marks (")</span>
              {/*Good passwords are hard to guess. Try using a multi-word phrase, uncommon words, numbers or symbols.*/}
            </span>
          </span>
        )
    }
    renderX() {
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
      return <span className="password-strength-indicator">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </span>
    }
    renderX() {
        return (
            <span>
                <span>{this.props.title}</span>
                <span className="meter-wrapper">
                   <span className={this.props.className} style={{width: this.props.meterWidth + '%'}}></span>
                </span>
            </span>
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

 //the parent component
class PasswordStrength extends React.Component {
    constructor() {
        super();
        this.state = {
                        type: 'password',
                        checked: false,
                        meterTitle: 'Invalid',
                        meterClass: 'danger',
                        meterWidth: 0,
                        inputValue: null,
                        touched: false,
                        focused: false,
                        shown: false,
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
        let touched = this.state.touched, shown = this.state.shown
        if (this.state.inputValue && this.state.inputValue.length >= 6) {
          touched = true
        }
        if (this.state.meterWidth !== 100) {
          shown = false
        }
        this.setState({
            inputValue: e.target.value,
            touched,
            shown,
            rules: {
                hasNumber: hasNumber(e.target.value),//e.target.value.match(/\d/) ? true : false,
                hasLetter: hasLetter(e.target.value),// e.target.value.match(/[A-z]/) ? true : false,
                hasUpperLetter: hasUpperLetter(e.target.value),//  e.target.value.match(/[A-Z]/) ? true : false,
                isValidLength: isValidLength(e.target.value),//  e.target.value.match(/^.{8,}$/) ? true : false,
                oneSpecialChar: oneSpecialChar(e.target.value),//  e.target.value.match(/[-!$%#@&*?]/) ? true : false,
                noSpecialChar: noSpecialChar(e.target.value),//  !e.target.value.match(/[ \/"]/) ? true : false
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

                if (rules[property] === undefined) {
                    valid_property_count = valid_property_count + 1;
                }
            }
        }

        return (valid_property_count / property_count) * 100;
    }

    getSingleRuleStatus(status) {
       if(status === undefined){
           return "valid";
       }
       return "invalid";
    }
    onFocus(e) {
      console.log('this.refs.pwdInput.pristine', this.refs.pwdInput.pristine);
      this.setState({focused: true})
    }
    onBlur(e) {
      console.log('onBlur');
      if (this.state.meterWidth === 100) {
        this.setState({focused: false, shown: true})
      }
      this.setState({focused: false})
    }
    render() {
        const inputValue = this.state.inputValue
        var range = this.state.meterWidth
        var strength_num = 0
        if (0 <= range && range <= 35) {strength_num = 1}
        else if(35 <= range && range <= 80) {strength_num = 2}
        else if(80 <= range && range <= 90) {strength_num = 3}
        else if(90 <= range && range <= 98) {strength_num = 3}
        else if(98 <= range && 8 <= inputValue.length  && inputValue.length <= 15) {strength_num = 3}
        if(inputValue && 12 <= inputValue.length) {strength_num = 4}

        let meter = null
        let list = null
        if (this.state.touched && this.state.focused && !this.state.shown) {
          list = <RulesList
              isValidLength={this.getSingleRuleStatus(this.state.rules.isValidLength)}
              hasNumber={this.getSingleRuleStatus(this.state.rules.hasNumber)}
              hasLetter={this.getSingleRuleStatus(this.state.rules.hasLetter)}
              hasUpperLetter={this.getSingleRuleStatus(this.state.rules.hasUpperLetter)}
              oneSpecialChar={this.getSingleRuleStatus(this.state.rules.oneSpecialChar)}
              noSpecialChar={this.getSingleRuleStatus(this.state.rules.noSpecialChar)}
              />
        }

        if (this.state.touched) {
          meter = <RulesMeter title={this.state.meterTitle} className={this.state.meterClass} meterWidth={this.state.meterWidth}/>
        }
        return (
          <p className="text" >
            <span className="password-strength" data-password-strength={strength_num}>
                <label htmlFor="password">Password</label>
                <Field
                    onFocus={this.onFocus.bind(this)}
                    onBlur={this.onBlur.bind(this)}
                    ref={'pwdInput'}
                    name="password"
                    type="password"
                    component={renderFieldPassword}
                    label="Password"
                    validate={[required, hasNumber, hasUpperLetter, isValidLength, oneSpecialChar, hasLetter, noSpecialChar]}
                    onChange={this.onPasswordChange.bind(this)}
                />
                {meter}
                {list}
            </span>
          </p>
        )
    }
}

export default reduxForm({
  form: 'fieldLevelValidation' // a unique identifier for this form
})(FieldLevelValidationForm)
