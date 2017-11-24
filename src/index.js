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
import Register from './client/register'
import PasswordReset from './client/reset'
import registerServiceWorker from './registerServiceWorker';
import { history } from './store/configureStore'

const initialState = {

}
const store = configureStore(initialState)


window.store = store
// function SetCookie() {
//     var url = window.location.search;
//     if(url.indexOf('?ref=') !== -1)
//         document.cookie="src=uni";
// }
// SetCookie()
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div className="flex-column flex-parent">
        <Route exact path='/' component={App}/>
        <Route path='/login' to='sessions/new' component={Login} />
        <Route path='/register' to='sessions/new' component={Register} />
        <Route path='/reset' to='sessions/new' component={PasswordReset} />
      </div>
    </ConnectedRouter>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
