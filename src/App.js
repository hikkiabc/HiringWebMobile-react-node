import React, { Component } from 'react'
import { HashRouter, Route, Link, NavLink } from 'react-router-dom'
// import A from './a'
// import B from './b'
export default class App extends Component {
  render() {
    return (
      <div>
        <div>head</div>

        <HashRouter>
          <div>        <NavLink activeClassName='active' to='/a'>to a</NavLink></div>
          <div>      <NavLink activeClassName='active' to='/b'>to b</NavLink></div>

          {/* <Route path='/a' component={A}></Route>
          <Route path='/b' component={B}></Route> */}
        </HashRouter></div>
    )
  }
}
