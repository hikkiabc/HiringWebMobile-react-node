import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import EmployerInfo from './employer'
import { NavBar, Icon } from 'antd-mobile';
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import { autoLogin } from '../../redux/actions'
import Err from '../err'
import Message from '../message'
import Chat from '../message/chat'
import Me from '../me'
import BottomNav from '../../components/bottom-nav'
import EmployeeInfo from './employee'
import Employee from './employee/employee'
import Employer from './employer/employer'
import './main.css'
class main extends Component {

  pagesList = [{ component: Employee, path: '/employer', text: 'Employer', title: 'Employers', iconName: 'employer' }, { component: Employee, path: '/employee', text: 'Employee', title: 'Employees', iconName: 'employee' }, { component: Message, path: '/message', text: 'Message', title: 'Message Home', iconName: 'msg' }, { component: Me, path: '/me', text: 'Me', title: 'Profile', iconName: 'me' }]

  componentWillMount() {
    if (Cookies.get('uid') && !this.props.user.username) {
      this.props.autoLogin()
    }
  }

  render() {

    if (Cookies.get('uid') && !this.props.user.username) {

      return <div>Logging in...</div>
    }
    if (!Cookies.get('uid')) return <Redirect to='/login'></Redirect>
    if (this.props.location.pathname == '/') {
      let path
      if (this.props.user.type == 'employer') path = '/employee'
      else path = '/employer'
      if (!this.props.user.avatar && !this.props.user.afterUpdate) path += '-info'
      return <Redirect to={path}></Redirect>
    }

    this.pagesList = this.pagesList.filter(i => i.iconName != this.props.user.type)
    let currentPageItem = this.pagesList.find(i => i.path == this.props.location.pathname)


    return (

      <div className='content'>
        {currentPageItem ? <NavBar>{currentPageItem.title}</NavBar> : null}
        <div className='content1'>
          <Switch>
            {this.pagesList.map(i => {
              return <Route path={i.path} key={i.path} component={i.component}></Route>

            })}
            <Route path='/employer-info' component={EmployerInfo}></Route>
            <Route path='/employee-info' component={EmployeeInfo}></Route>
            <Route path='/chat/:userId/:userName' component={Chat}></Route>

            <Route component={Err}></Route>
            {/* <Redirect to='/'></Redirect> */}
          </Switch></div>
        {this.props.location.pathname.indexOf('chat') != -1 ? null : <BottomNav pagesList={this.pagesList}></BottomNav>}

      </div>

    )
  }
}
export default connect(state => state, { autoLogin })(main)