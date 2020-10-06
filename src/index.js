import React from 'react';
import ReactDOM from 'react-dom';
import Login from './pages/login/login'
import Register from './pages/login/register'
import Main from './pages/main/main'
import './index.css';
import App from './App'
import { Provider } from 'react-redux'
import store from './redux/store'

import { HashRouter, Route, Switch } from 'react-router-dom'


ReactDOM.render(
  // <App></App>
  <Provider store={store}><HashRouter>
    <Switch>
      <Route path='/login' component={Login}></Route>
      <Route path='/register' component={Register}></Route>
      <Route component={Main}></Route>
    </Switch>
  </HashRouter></Provider>
  ,
  document.getElementById('root')
);
