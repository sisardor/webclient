import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import Recaptcha from 'react-recaptcha'

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
const required = value => value ? undefined : 'Required'
const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined

class EmailResetForm extends Component {
  state = {}
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <Field name="email" type="email"
          component={renderField} label="Email"
          validate={[required, email]}
        />
        <div>
          <p className="submit">
            <button type="submit" disabled={submitting} className="button blue medium">
              <span>Send reset password email</span>
            </button>
          </p>
        </div>
      </form>
    )
  }
}

EmailResetForm.propTypes = {
  // name: PropTypes.string
}
export default reduxForm({
  form: 'emailResetForm' // a unique identifier for this form
})(EmailResetForm)
