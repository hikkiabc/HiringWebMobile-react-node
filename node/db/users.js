const mg = require('mongoose')
module.exports = mg.model('user', new mg.Schema({
  username: { type: String }, password: { type: String }, type: { type: String },
  Position: { type: String }, Description: { type: String }, Company: { type: String },
  avatar: { type: String, default: '' }
}))


