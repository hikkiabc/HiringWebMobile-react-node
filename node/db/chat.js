const mg = require('mongoose')
module.exports = mg.model('chat', new mg.Schema({
  from: { type: String }, to: { type: String }, chatId: { type: String }, createTime: { type: String },
  read: { type: Boolean, default: false }, content: { type: String }
}))