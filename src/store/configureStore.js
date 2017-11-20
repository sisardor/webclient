import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware, routerReducer } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'
import * as reducers from '../reducers'

const storeEnhancers = [
  // persistenceStore,
  // autoRehydrate()
]

export const history = createHistory()
const router = routerMiddleware(history)
const createStoreWithMiddleware = compose(
  applyMiddleware(
    thunkMiddleware,
    router
    // logger
  ),
  ...storeEnhancers
)(createStore)

const reducer = combineReducers({
  ...reducers,
  routing: routerReducer
})
/**
 * Creates a preconfigured store for this example.
 */
export default function configureStore(initialState) {
  const store =  createStoreWithMiddleware(reducer, initialState)
  if (module.hot)
  // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })

  return store
}
