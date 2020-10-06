import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { updateUserInfo } from '../../../redux/actions'
import { InputItem, WhiteSpace, TextareaItem, NavBar, Icon, Button } from 'antd-mobile';
import request from '../../../request'
import Avatar from '../../../components/avatar/avatar'
class EmployeeInfo extends Component {
  state = {
    Description: '',
    Position: '',
    avatar: ''
  }

  avatarChange = (v) => {
    this.setState({ avatar: v })
  }
  submit = () => {
    this.props.updateUserInfo(this.state)

  }
  render() {

    return (
      this.props.state.user.afterUpdate ? <Redirect to={this.props.state.user.redirect}></Redirect> :
        <div>
          <NavBar >
            Employee Info
      </NavBar>
          <WhiteSpace size="sm" />
          <Avatar avatarChange={(v) => this.avatarChange(v)}></Avatar>
          <WhiteSpace size="md" /><WhiteSpace size="md" />
          <InputItem
            placeholder="Position"
            clear
            onChange={(v) => { this.setState({ Position: v }) }}
          >Position:</InputItem>
          <TextareaItem
            title="Description:"
            placeholder="Say something..."
            onChange={(v) => { this.setState({ Description: v }) }}
            labelNumber={6}
            rows={3}
          />

          <Button onClick={this.submit} style={{ marginTop: '80px' }} type='primary'>Submit</Button>
        </div>
    )
  }
}
export default connect(state => ({ state }), { updateUserInfo })(EmployeeInfo)