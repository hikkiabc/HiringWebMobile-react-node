import React, { Component } from 'react'
import { resetUpdate } from '../../../redux/actions'
import { connect } from 'react-redux'
import QueueAnim from 'rc-queue-anim';
import request from '../../../request'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';
import { List } from 'antd-mobile';
import './user.css'
const Item = List.Item;
class employee extends Component {
  state = {
    userList: []
  }
  async componentDidMount() {

    const userList = await request('/users/getUsers', { type: this.props.location.pathname.substr(1) }, 'get')
    this.setState({ userList: userList.data })
  }

  render() {


    return (
      <div className='user-list-wrap'>
        <QueueAnim>
          {this.state.userList.map((i, index) => <WingBlank key={index} size="lg">
            <WhiteSpace size="lg" />
            <Card onClick={() => this.props.history.push(`/chat/${i._id}/${i.username}`)}>
              <Card.Header
                title={i.username}
                thumb={i.avatar ? require(`../../../components/avatar/icon/xiaobiaoqing-${i.avatar.substr(7)}.png`) : require(`../../../components/avatar/icon/xiaobiaoqing-1.png`)}
                extra={<span>{i.company}</span>}
              />
              <Card.Body>
                <List renderHeader={() => 'Basic Style'} className="user-list">
                  <Item>    <div>{i.Position}</div></Item>
                  <Item>         <div>{i.Description}</div></Item>
                </List>


              </Card.Body>
              {/* <Card.Footer content="footer content" extra={<div>extra footer content</div>} /> */}
            </Card>
            <WhiteSpace size="lg" />
          </WingBlank>)}
        </QueueAnim>
      </div>
    )
  }
}
export default connect(state => state, {})(employee)