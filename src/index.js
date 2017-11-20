import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { withRouter, Route, Redirect } from 'react-router'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from './store/configureStore'
import './index.css';
import App from './App';
import Login from './client/login'
import registerServiceWorker from './registerServiceWorker';
import { history } from './store/configureStore'

const initialState = {

}
const store = configureStore(initialState)


window.store = store

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div className="flex-column flex-parent">
        <Route exact path='/' component={App}/>
        <Route path='/login' to='sessions/new' component={Login} />
      </div>
    </ConnectedRouter>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
