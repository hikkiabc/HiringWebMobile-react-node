import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import request from '../../../request'
import { updateUserInfo } from '../../../redux/actions'
import { InputItem, WhiteSpace, TextareaItem, NavBar, Icon, Button } from 'antd-mobile';
import Avatar from '../../../components/avatar/avatar'
class EmployerInfo extends Component {
  state = {
    Description: '',
    Position: '',
    avatar: '',
    Company: ''
  }
  submit = () => {

    this.props.updateUserInfo(this.state)

  }
  render() {
    // console.log(this.props.state);

    return (
      this.props.state.user.afterUpdate ? <Redirect to={this.props.state.user.redirect}></Redirect> :
        <div>
          <NavBar >
            Employer Info
      </NavBar>
          <WhiteSpace size="sm" />
          <Avatar avatarChange={(v) => { this.setState({ avatar: v }) }}></Avatar>
          <WhiteSpace size="md" /><WhiteSpace size="md" />
          <InputItem
            placeholder="Company"
            clear
            onChange={(v) => { this.setState({ Company: v }) }}
          >Company:</InputItem>

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
          <Button onClick={this.submit} style={{ marginTop: '30px' }} type='primary'>Submit</Button>
        </div>
    )
  }
}
export default connect(state => ({ state }), { updateUserInfo })(EmployerInfo)