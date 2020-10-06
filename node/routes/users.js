var express = require('express');
var router = express.Router();
const md5 = require('blueimp-md5')
const user = require('../db/users')
const mysql = require('../db/index')
let mongoose = require('mongoose');
// mongoose.Types.ObjectId(doc[0]._idd).toString()
module.exports = router;

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});



router.post('/register', (req, res) => {
  const { username, password, type } = req.body

  user.find({ username }, (e, doc) => {
    if (doc.length != 0) {
      res.send('username exists')
    }
    else {

      user.insertMany({ username, type, password: md5(password) }, (e, doc) => {
        res.cookie('uid', doc[0]._id, { maxAge: 1000 * 60 * 60 * 24 })

        res.send(doc[0])
      })
    }
  })



})

router.post('/login', (req, res) => {
  let { username, password } = req.body

  password = md5(password)
  user.find({ username, password }, (e, doc) => {

    if (doc.length != 0) {
      res.cookie('uid', doc[0]._id, { maxAge: 1000 * 60 * 60 * 24 })

      res.send(doc[0])
    }
    else res.send('wrong match')
  })
})

router.post('/update', (req, res) => {

  res.clearCookie('uid')
  let userinfo = req.body

  if (!req.cookies.uid) return res.send('Please login')
  user.findOneAndUpdate({ _id: req.cookies.uid }, userinfo, (e, doc) => {
    if (!doc) {
      return res.send('Please login')
    }
    res.cookie('uid', doc._id, { maxAge: 1000 * 60 * 60 * 24 })

    res.send(Object.assign(userinfo, { username: doc.username, type: doc.type }))
  })
})

router.post('/autologin', (req, res) => {

  if (req.cookies.uid) {

    user.find({ _id: req.cookies.uid }, (e, doc) => {

      if (doc.length > 0) {

        return res.send(doc[0])
      } else {
        res.clearCookie('uid')
        res.send('Please login')
      }
    })
  }
  else {
    res.clearCookie('uid')
    res.send('Please login')
  }
})


router.get('/getUsers', (req, res) => {
  const { type } = req.query
  user.find({ type }, { password: 0 }, (e, doc) => {
    res.send(doc)
  })
})


router.get('/getAllUsers', (req, res) => {

  user.find((e, doc) => {

    res.send({ data: doc })

  })
})