import React from 'react'
import { Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import Recaptcha from 'react-recaptcha'

const required = value => value ? undefined : 'Required'
const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined


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


export class LoginForm extends React.Component {

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <div className="step email-password-step">
          <Field name="email" type="email"
            component={renderFieldWithAutoComplete} label="Email"
            validate={[required, email]}
          />
          <Field
            name="password"
            type="password"
            component={renderFieldWithAutoComplete2}
            label="Password"
          />
          <p className="forgot first-step">
            <Link to={`/reset`}><span>Forgot your password?</span></Link>
          </p>
          <p className="remember">
            <label>
              <input type="checkbox" name="remember" defaultValue="on" /><span>Remember me</span>
            </label>
          </p>
          <p className="submit">
            <button type="submit" disabled={submitting} className="button blue medium">
              <span>Login</span>
            </button>
          </p>

        </div>
      </form>
    )
  }
}


export default reduxForm({
  form: 'loginForm' // a unique identifier for this form
})(LoginForm)
