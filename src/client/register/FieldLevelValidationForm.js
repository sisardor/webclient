import React from 'react'
import { Field, reduxForm } from 'redux-form'

const required = value => value ? undefined : 'Required'
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength15 = maxLength(15)
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined
const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined
const minValue18 = minValue(18)
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  'Invalid email address' : undefined
const tooOld = value =>
  value && value > 65 ? 'You might be too old for this' : undefined
const aol = value =>
  value && /.+@aol\.com/.test(value) ?
  'Really? You still use AOL for your email?' : undefined
const match  = (field, fields) => fields.password !== fields.confirm_password
  && 'Passwords do not match.'

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <p className="text">
    <span>
      <label>{label}</label>
      <input {...input} placeholder={label} type={type} />
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </span>
  </p>
)
const renderFieldWithAutoComplete = ({ input, label, type, meta: { touched, error, warning } }) => (
  <p className="text">
    <span>
      <label>{label}</label>
      <input {...input} placeholder={label} type={type} autoComplete={type} />
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </span>
  </p>
)
const renderFieldWithAutoComplete2 = ({ input, label, type, meta: { touched, error, warning } }) => (
  <p className="text">
    <span>
      <label>{label}</label>
      <input {...input} placeholder={label} type={type} autoComplete="new-password" />
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </span>
  </p>
)

const FieldLevelValidationForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <Field name="email" type="email"
        component={renderFieldWithAutoComplete} label="Email"
        validate={email}
        warn={aol}
      />
      <Field name="full_name" type="text"
        component={renderField} label="Full name"
        validate={[ required, maxLength15 ]}
      />
      <Field
        name="password"
        type="password"
        component={renderFieldWithAutoComplete2}

        label="Password"
      />
      <Field
        name="confirm_password"
        type="password"
        component={renderFieldWithAutoComplete2}
        validate={match}
        label="Confirm password"
      />

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

export default reduxForm({
  form: 'fieldLevelValidation' // a unique identifier for this form
})(FieldLevelValidationForm)
