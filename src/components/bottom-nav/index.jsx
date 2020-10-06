import React, { Component } from 'react'
import { TabBar } from 'antd-mobile';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import './index.css'
class index extends Component {
  render() {


    return (
      <TabBar className='tabbar'
      >
        {this.props.pagesList.map((i, index) => {


          return <TabBar.Item
            badge={i.text == 'Message' ? this.props.msgList.totalUnread : ''}
            title={i.text}
            key={i.path}
            icon={{ uri: require(`./assets/${i.iconName}.png`) }}
            selectedIcon={{ uri: require(`./assets/${i.iconName}-active.png`) }}
            selected={this.props.location.pathname === i.path}
            onPress={() => {
              this.props.history.replace(i.path)
            }}

          >
          </TabBar.Item>
        })}

      </TabBar>

    )
  }
}
export default connect(state => state)(withRouter(index)) 