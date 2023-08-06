const express = require('express');
const router = express.Router();

const moment = require('moment')

const AccountModel = require('../../models/AccountModel')

const checkLoginMiddleware = require('../../middleWares/checkLoginMiddleware')


// 首页跳转到登陆
router.get('/', checkLoginMiddleware, function (req, res) {
  res.redirect('/login')
})


// 请求获取主页面
router.get('/account', checkLoginMiddleware, function (req, res) {

  // 根据时间倒序展示
  AccountModel.find().sort({ time: -1 }).then(data => {
    res.render('services/list', { data, moment });
  }).catch(err => {
    res.send('获取数据出错..请稍后再试~')
  })

});


// 请求删除指定账单
router.get('/account/:id', checkLoginMiddleware, function (req, res) {

  // 通过params方式传参
  const { id } = req.params

  // 根据时间倒序展示
  AccountModel.deleteOne({ _id: id }).then(data => {
    res.redirect('/account')
  }).catch(err => {
    res.send('获取数据出错..请稍后再试~' + err.toString())
  })

});



// 请求获取添加记录账单页面
router.get('/create', checkLoginMiddleware, function (req, res) {
  console.log('test..');
  res.render('services/create', { title: 'Express' });
});

// 请求提交新账单
router.post('/create', function (req, res) {

  const { title, time, type, amount, remarks } = req.body

  console.log(req.body);

  AccountModel.create({
    title,
    time: moment(time).toDate(),
    type: Number(type),
    amount: Number(amount),
    remarks
  }).then((data) => {
    res.render('results/success', { msg: '提交成功~', url: '/account', goto: '账单列表' })
  }, (err) => {
    res.render('results/fail', { msg: '提交失败~', url: '/account', goto: '账单列表' })
  })
});



module.exports = router;
