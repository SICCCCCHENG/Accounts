// 使用session

const express = require('express');
const router = express.Router();


const md5 = require('md5')

const UserModel = require('../../models/UserModel')


// 获取注册页面
router.get('/reg', (req, res) => {
  res.render('auth/reg')

})

// 获取注册页面表单信息
router.post('/reg', (req, res) => {

  const { username, password } = req.body

  UserModel.create({
    username,
    password: md5(password)
  }).then(data => {
    res.render('results/success', { msg: '注册成功~~', url: '/login', goto: '登陆页面' })
  }).catch(err => {
    res.render('results/fail', { msg: '失败成功..请稍后再试~', url: '/reg', goto: '注册页面' })
  })
})


// 获取登陆页面
router.get('/login', (req, res) => {
  res.render('auth/login')

})

// 获取注册页面表单信息, 并校验
router.post('/login', (req, res) => {
  const { username, password } = req.body

  UserModel.findOne({ username, password: md5(password) }).then(data => {
    if (data) {
      req.session.username = data.username
      req.session._id = data._id
      // 登陆成功跳转到 account 条目页面
      return res.redirect('/account')
    }
    res.render('results/fail', { msg: '用户名或密码错误..', url: '/login', goto: '登陆页面' })
  }).catch(err => {
    res.send('登陆失败,请稍后再试..' + err.toString())
  })

})


router.get('/logout', (req, res)=>{
  req.session.destroy(()=>{
    res.render('results/success', { msg: '退出登陆成功~', url: '/login', goto: '登陆页面' })
  })
})

module.exports = router;
