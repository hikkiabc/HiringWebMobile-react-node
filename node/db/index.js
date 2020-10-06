const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
const mysql = require('mysql')
mongoose.connect('mongodb://localhost/ggzping', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('db connected');

}).catch(() => {
  console.log('db fails');

})


const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'qweqwe',
  database: 'sgg-vue',
})

con.connect()

module.exports = con