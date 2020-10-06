import React, { Component } from 'react'
import { Button, WingBlank, Result, Icon, WhiteSpace } from 'antd-mobile';
import { connect } from 'react-redux'
import './me.css'
import { logout } from '../../redux/actions'
import Cookies from 'js-cookie'
import { List } from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;

class me extends Component {
  state = { login: true }

  logout = () => {
    Cookies.remove('uid')
    this.props.logout()
  }
  render() {

    return (
      <div>
        <Result
          img={<img src={this.props.user.avatar ? require(`../../components/avatar/icon/xiaobiaoqing-${this.props.user.avatar.substr(7)}.png`) : require(`../../components/avatar/icon/xiaobiaoqing-1.png`)} />}
          title={this.props.user.username}
          message={this.props.user.company}
        />
        <WhiteSpace></WhiteSpace> <WhiteSpace></WhiteSpace>
        <List renderHeader={() => 'Information'} >
          <Item >
            <Brief>Position: {this.props.user.Position}</Brief>
            <Brief>Description: {this.props.user.Description}</Brief>
            {this.props.user.company ? <Brief>Company:</Brief> : null}

          </Item>
        </List>
        <WhiteSpace></WhiteSpace><WhiteSpace></WhiteSpace>
        < WingBlank><Button onClick={this.logout} style={{ marginTop: '200px' }} type="warning">Log Out</Button></WingBlank>
      </div>
    )
  }
}
export default connect(state => state, { logout })(me)