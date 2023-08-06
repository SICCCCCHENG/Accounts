// 使用token

const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken')

const md5 = require('md5')
const UserModel = require('../../models/UserModel')




// 注册
router.post('/reg', (req, res) => {

  const { username, password } = req.body

  UserModel.create({
    username,
    password: md5(password)
  }).then(data => {
    res.json({
      code: '0000',
      msg: '注册成功',
      data: data
    })
  }).catch(err => {
    res.json({
      code: '0000',
      msg: '注册失败',
      data: null
    })
  })
})


// 登陆
router.post('/login', (req, res) => {
  const { username, password } = req.body

  UserModel.findOne({ username, password: md5(password) }).then(data => {
    if (data) {
      // 在此登陆成功,生成token                     用户对应的唯一id
      let token = jwt.sign({ username: username, _id : data._id }, 'sicheng', { expiresIn: 60 * 60 * 24 })

      res.json({
        code: '0000',
        msg: '登陆成功',
        data: token
      })
    } else {
      res.json({
        code: '2001',
        msg: '用户名或密码错误',
        data: null
      })
    }

  }).catch(err => {
    res.json({
      code: '2002',
      msg: '读取数据库出错,请稍后再试~',
      data: null
    })
  })

})


router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.render('results/success', { msg: '退出登陆成功~', url: '/login', goto: '登陆页面' })
  })
})

module.exports = router;
