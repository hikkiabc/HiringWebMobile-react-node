import React, { Component } from 'react'
import './index.css'
import QueueAnim from 'rc-queue-anim';
import { sendMsg, setMsgAsRead } from '../../redux/actions'
import { Grid, NavBar, Icon, List, InputItem, Button } from 'antd-mobile';
import { connect } from 'react-redux'
import './chat.css'
const Item = List.Item;
const Brief = Item.Brief;
class chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: '',
      showEmoji: false
    }
    let emojis = ['😆', '🙂', '😆', '🙂', '😆', '🙂', '😆', '🙂', '😆', '🙂', '😆', '🙂', '😆', '🙂', '😆', '🙂', '😆', '🙂', '😆', '🙂', '😆', '🙂', '😆', '🙂', '😆', '🙂', '😆', '🙂', '😆', '🙂', '😆', '🙂', '😆', '🙂', '😆', '🙂', '😆', '🙂', '😆', '🙂', '🙂', '😆', '🙂', '😆', '🙂', '😆', '🙂', '😆', '🙂', '😆', '🙂', '😆', '🙂', '😆', '🙂', '😆', '🙂', '😆', '🙂', '😆', '🙂', '😆', '🙂', '😆', '🙂', '😆', '🙂', '😆', '🙂']
    this.emojis = emojis.map(i => {
      return { text: i }
    })
    // console.log(this.emojis);

  }
  componentDidMount() {
    window.scrollTo(0, document.body.scrollHeight)
  }
  componentDidUpdate() {
    window.scrollTo(0, document.body.scrollHeight)
  }
  emoji = () => {
    this.setState({ showEmoji: !this.state.showEmoji })


    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 0);
    // const emojiFrame = this.refs.emoji
    // emojiFrame.addEventListener('touchstart', (e) => {
    //   let ul = emojiFrame.getElementsByClassName('slider-list')[0]
    //   let li = ul.firstChild

    //   ul.addEventListener('touchmove', (e) => {
    //     let str = ul.style.transform
    //     console.log(str);
    //     console.log(ul.offsetWidth - li.offsetWidth);

    //     console.log(str.indexOf('('));
    //     console.log(str.substr(12, 1));
    //     if (str.substr(12, 1) != '-') {
    //       console.log(11111);

    //       ul.style.transform = 'translate3d(0px, 0px, 0px)'
    //     }
    //     console.log(str.indexOf('px'));

    //   });
    // })


  }
  sendMsg = () => {
    this.props.sendMsg({ content: this.state.content, to: this.props.match.params.userId, from: this.props.user._id })
    this.setState({ content: '', showEmoji: false })
  }

  render() {
    // console.log(this.props);
    let msgList = []
    let avatar
    if (this.props.msgList.msgList) {
      if (this.props.msgList.usersAvatar[this.props.match.params.userId].avatar) {
        avatar = this.props.msgList.usersAvatar[this.props.match.params.userId].avatar
        avatar = (avatar.substr(7));
        avatar = require(`../../components/avatar/icon/xiaobiaoqing-${avatar}.png`)
      }


      msgList = this.props.msgList.msgList.filter(i => {
        // console.log(i);

        return i.chatId.indexOf(this.props.user._id) != -1 && i.chatId.indexOf(this.props.match.params.userId) != -1
      })
      // console.log(msgList);

      let idList = []
      msgList.forEach(i => {
        if (i.to == this.props.user._id && !i.read) idList.push(i._id)
      })

      if (idList.length > 0) {
        console.log(idList);

        this.props.setMsgAsRead(idList, this.props.user._id)
      }

    }
    return (
      this.props.msgList.msgList ?
        <div className='chat-container'>
          <NavBar
            icon={<Icon onClick={() => this.props.history.go(-1)} type="left" />}>Chat with &nbsp;<span style={{ color: 'orange' }}>~{this.props.match.params.userName}~</span> </NavBar>

          <List >
            <QueueAnim>     {msgList.map(i => {
              if (i.to == this.props.user._id) {
                return <Item className='left' key={i._id}
                  thumb={avatar} onClick={() => { }}>
                  {i.content}
                </Item>

              }
              else {
                // console.log(i._id);

                return <Item className='right' key={i._id}
                  extra={'me'} onClick={() => { }}>
                  {i.content}
                </Item>
              }
              // <Item
              //   key={i._id}
              //   className='right'
              //   extra={'Me'}
              //   // thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"

              //   onClick={() => { }}
              // >My wallet</Item>
            })}</QueueAnim>

          </List>


          <div ref='emoji' className='input'>
            <div className='input-container'>
              <InputItem
                onFocus={() => this.setState({ showEmoji: false })}
                className='input-input'
                value={this.state.content}
                placeholder="say..."
                // extra="😀"
                onChange={(content) => this.setState({ content })}
              ></InputItem><span onClick={this.emoji} className='emoji'>😀</span><Button onClick={this.sendMsg} className='input-btn'>
                Send</Button></div>

            {this.state.showEmoji ? <Grid data={this.emojis} onClick={(i) => this.setState({ content: this.state.content + i.text })
            } carouselMaxRow={4} isCarousel={true} columnNum={8} /> : null}
            {/* <Grid data={this.emojis} carouselMaxRow={4} isCarousel={true} columnNum={8} /> */}
          </div>


        </div> :
        <div>Loading Message...</div>
    )
  }
}
export default connect(state => state, { setMsgAsRead, sendMsg })(chat)