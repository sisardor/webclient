import { Schema } from 'normalizr'
import { ACTIONS_REQUEST } from '../constants/cons'
import processResponse from '../utils/process-response'
import config from 'clientconfig'
// import series from 'run-series'

export function registerUser (options) {
  const { data } = options
  const endpoint = `/api/users`
  var actionResponse

  return (dispatch, getState) => {
    // const { user: { authKey }} = getState()
    fetch(endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        // Authorization:  authKey
      },
      body: JSON.stringify(data)
    })
    .then(processResponse)
    .then(res => {
      // Add parameters to the new action.
      console.log(res);

    })
    .catch(error => {
      // hendle error
      console.error(error);
    })
  }
}
