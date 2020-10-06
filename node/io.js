const chat = require('./db/chat')
const exp = require('express')
const chatRouter = exp.Router()
const user = require('./db/users')
const { response } = require('express')
module.exports = {

  chatRouter, io: function (server) {
    var io = require('socket.io')(server);
    let clientCount = 0
    io.on('connection', function (socket) {
      // 给每个用户取名字

      clientCount++
      socket.nickname = 'user' + clientCount

      // io.emit代表广播，socket.emit代表私发
      io.emit('fromServer', socket.nickname + '  comes in')

      socket.on('fromClient', function (data) {


        const { content, from, to } = data
        // console.log(data);
        const createTime = Date.now()
        let _id
        const chatId = [from, to].sort().join('_')
        chat.insertMany({ content, from, to, createTime, chatId }, (e, doc) => {
          _id = doc[0]['_id']
          io.emit('fromServer', { read: false, content, from, to, createTime, chatId, _id })
        })


      })

      // 客户端断开，自带事件
      socket.on('disconnect', function () {
        io.emit('leave', socket.nickname + ' left')
      })
    })
  }
}

chatRouter.get('/getMsgList', (req, res) => {
  const result = {}
  const uid = req.cookies.uid
  if (req.cookies.uid) {


    chat.find({ '$or': [{ from: uid }, { to: uid }] }, (e, doc) => {
      result.msgList = doc
      user.find({}, { _id: 1, avatar: 1, username: 1 }, (e, doc) => {

        const userAvatarList = doc.reduce((pre, cur) => {
          pre[cur._id] = { avatar: cur.avatar ? cur.avatar : '', username: cur.username }

          return pre
        }, {})

        result.usersAvatar = userAvatarList


        res.send(result)
      })

    })
  }
})


chatRouter.post('/setMsgAsRead', (req, res) => {
  // console.log(req.body);

  chat.updateMany({ _id: { $in: req.body.idList } }, { $set: { read: true } }, (e, doc) => {
    res.send(doc)
  })

})