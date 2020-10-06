import React, { Component } from 'react'
import { Radio, WhiteSpace, List, InputItem, WingBlank, NavBar, Icon, Button } from 'antd-mobile';
import './login.css'
import request from '../../request'
import { Redirect } from 'react-router-dom'
import { register } from '../../redux/actions'
import logo from './logo.png'
import { connect } from 'react-redux'
const RadioItem = Radio.RadioItem;
const Item = List.Item;
class login extends Component {
  state = {
    username: '',
    type: 'employee',
    password: '',
    password1: '',
    // redirect: (path) => {
    //   console.log('re');

    //   this.props.history.replace(path)
    // }
  }
  submit = () => {

    this.props.register(this.state)
  }
  render() {

    return (
      this.props.state.user.username ?
        <Redirect to={this.props.state.user.redirect}></Redirect> :
        <div>
          <NavBar
            mode="dark"
          // leftContent="Back"
          // rightContent={[
          //   <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
          //   <Icon key="1" type="ellipsis" />,
          // ]}
          > <h3>Fall&nbsp; Hiring</h3></NavBar>
          <div className='img'></div>
          {/* <img src={logo} alt="" /> */}
          <WingBlank>
            {this.props.state.user.msg ? <span>{this.props.state.user.msg}</span> : null}
            <List>
              <InputItem placeholder='input username' onChange={(username) => { this.setState({ username }) }} labelNumber='5'>UserName:</InputItem>

            </List>
            <WhiteSpace size='sm' />
            <List>
              <InputItem placeholder='input password' onChange={(password) => { this.setState({ password }) }} labelNumber='5' type='password'>&nbsp;Password:</InputItem>
              <InputItem onChange={(password1) => { this.setState({ password1 }) }} labelNumber='5' type='password'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Verify:</InputItem>

            </List>
            <WhiteSpace size='sm' />
            <List>
              <Item ><span style={{ marginLeft: '2px' }}>&nbsp;UserType:</span>
            &nbsp;&nbsp;
            &nbsp;  <Radio className={this.state.type == 'employee' ? 'active' : ''} checked={this.state.type === 'employee'}
                  onChange={() => this.setState({ type: 'employee' })}>Employee</Radio>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Radio className={this.state.type == 'employer' ? 'active' : ''} checked={this.state.type === 'employer'} onChange={() => this.setState({ type: 'employer' })} >Employer</Radio>
              </Item>

            </List>
            <WhiteSpace /><WhiteSpace />    <WhiteSpace size='sm' />    <WhiteSpace size='sm' />
            <Button onClick={this.submit} type='primary'>Register</Button>
            <WhiteSpace />
            <Button onClick={() => this.props.history.push('/login')}>Already have account?</Button>
          </WingBlank>

        </div>
    )
  }
}
export default connect(state => ({ state }), { register })(login)