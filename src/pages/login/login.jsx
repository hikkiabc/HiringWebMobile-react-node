import React, { Component } from 'react'
import { Radio, WhiteSpace, List, InputItem, WingBlank, NavBar, Icon, Button } from 'antd-mobile';
import './login.css'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import logo from './logo.png'
import { login } from '../../redux/actions'
const RadioItem = Radio.RadioItem;
const Item = List.Item;
class Login extends Component {
  state = {
    username: '',
    radio: 'normal',
    password: '',

  }
  submit = () => {

    this.props.login(this.state)
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
              <InputItem onChange={(username) => { this.setState({ username }) }} labelNumber='5'>UserName:</InputItem>

            </List>
            <WhiteSpace size='sm' />
            <List>
              <InputItem onChange={(password) => { this.setState({ password }) }} labelNumber='5' type='password'>&nbsp;Password:</InputItem>

            </List>
            <WhiteSpace size='sm' />

            <WhiteSpace /><WhiteSpace />    <WhiteSpace size='sm' />    <WhiteSpace size='sm' />
            <Button onClick={this.submit} type='primary'>Login</Button>
            <WhiteSpace />
            <Button onClick={() => this.props.history.push('/register')}>Regist</Button>
          </WingBlank>

        </div>
    )
  }
}
export default connect(state => ({ state }), { login })(Login)