import React, { Component } from 'react'
import { List, Grid } from 'antd-mobile';
import './avatar.css'
export default class avatar extends Component {
  constructor(p) {
    super(p)
    this.avatarList = []
    for (let index = 1; index < 16; index++) {
      this.avatarList.push({ icon: require(`./icon/xiaobiaoqing-${index}.png`), text: `Avatar ${index}` })
    }

  }
  state = {
    avatar: ''
  }
  avatarClick = (v) => {
    this.props.avatarChange(v.text)
    this.setState({
      avatar: v.icon
    })

  }
  render() {


    return (
      <List renderHeader={() => this.state.avatar ? (<div className='avtar'><span style={{ marginBottom: '22px' }}>Selected Avatar:&nbsp;  </span><img style={{ width: '35px', verticalAlign: 'middle' }} src={this.state.avatar}></img></div>) : (<span style={{ lineHeight: '28px' }}>Select your Avatar</span>)} className="my-list avatar-cpn">
        <Grid onClick={(v) => { this.avatarClick(v) }} data={this.avatarList} columnNum={5} />
      </List>
    )
  }
}
