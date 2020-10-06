import React, { Component } from 'react'
import { Grid, List, InputItem, Button, Badge } from 'antd-mobile';
import { connect } from 'react-redux'
import ListItem from 'antd-mobile/lib/list/ListItem';
import { getMsgListForMsgIndex } from '../../redux/actions'
const Item = List.Item;
const Brief = Item.Brief;


class index extends Component {



  getLastMsgs = (msgList, usersAvatar) => {
    let userId = this.props.user._id
    let obj = {}
    let targetId = ''
    let unread = 0
    let currentUnread = 0
    msgList.map(i => {
      unread = 0
      if (i.to == userId && !i.read) {
        unread = 1
      }
      if (obj[i.chatId]) {
        currentUnread = obj[i.chatId].unread
        if (obj[i.chatId].createTime < i.createTime) {
          obj[i.chatId] = i
        }
        obj[i.chatId].unread = unread + currentUnread
      } else {
        obj[i.chatId] = i
        obj[i.chatId].unread = unread
      }

    })

    let lastMsgs = Object.values(obj)

    lastMsgs = lastMsgs.map(i => {
      i.to == userId ? targetId = i.from : targetId = i.to

      i = { ...usersAvatar[targetId], ...i, targetId }

      return i
    })
    return lastMsgs.sort((pre, next) => next.createTime - pre.createTime)
  }
  render() {


    if (this.props.msgList.msgList) {
      let msgList = this.getLastMsgs(this.props.msgList.msgList, this.props.msgList.usersAvatar)

      return (
        <List>
          {msgList.map(i => <ListItem extra={<Badge text={i.unread} />} onClick={() => this.props.history.push(`/chat/${i.targetId}/${i.username}`)} arrow="horizontal" key={i._id} thumb={i.avatar ? require(`../../components/avatar/icon/xiaobiaoqing-${i.avatar.substr(7)}.png`) : null}>
            {i.content}<Brief>{i.username}</Brief>
          </ListItem>)}
        </List>
      )
    }


    return (
      <div>
        loading...
      </div>
    )
  }
}

export default connect(state => state, { getMsgListForMsgIndex })(index)