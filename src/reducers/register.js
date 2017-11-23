import * as constants from '../constants/cons'
import createReducer from '../utils/create-reducer'

const initialState = {
  status: null,
  error: null,
  isRequesting: false
}
const actionHandlers = {
  [constants.REGISTERATION_REQUEST]: (state, action) => {
    return Object.assign({}, state, { isRequesting: true, error: null })
  },
  [constants.REGISTERATION_SUCCESS]: (state, action) => {
    return Object.assign({}, state, { states: 'SUCCESS', error: null })
  },
  [constants.REGISTERATION_FAIL]: (state, action) => {
    console.log(action);
    return Object.assign({}, state, { states: 'FAIL', error: action.error.error })
  }
}

export default createReducer(initialState, actionHandlers)
