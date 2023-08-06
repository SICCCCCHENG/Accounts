const express = require('express');
const router = express.Router();

const moment = require('moment')
const AccountModel = require('../../models/AccountModel')

const checkLoginApiMiddleware = require('../../middleWares/checkLoginApiMiddleware')

// 请求获取所有数据
router.get('/account',checkLoginApiMiddleware, function (req, res) {

  // 根据时间倒序展示
  AccountModel.find().sort({ time: -1 }).then(data => {
    if(data.length !== 0){
      res.json({
        code: '0000',
        msg: '数据获取成功',
        data: data
      });
    }
    
  }).catch(err => {
    res.json({
      code: '1001',
      msg: '数据获取出错',
      data: err.toString()
    });
  })

});



// 请求获取指定条目
router.get('/account/:id',checkLoginApiMiddleware, function (req, res) {

  const {id} = req.params

  // 根据时间倒序展示
  AccountModel.findOne({_id:id}).then(data => {
    if(data !== null){
      res.json({
        code: '0000',
        msg: '数据获取成功',
        data: data
      });
    }
    
  }).catch(err => {
    res.json({
      code: '1001',
      msg: '数据获取出错',
      data: err.toString()
    });
  })

});


// 请求删除指定账单
router.delete('/account/:id',checkLoginApiMiddleware, function (req, res) {

  // 通过params方式传参
  const { id } = req.params

  // 根据时间倒序展示
  AccountModel.findOneAndDelete({ _id: id }).then(data => {
    res.json({
      code: '0000',
      msg: '删除条目成功',
      data: data
    })
  }).catch(err => {
    res.json({
      code: '1002',
      msg: '删除条目失败',
      data: err.toString()
    })
  })

});




// 请求提交新账单
router.post('/account',checkLoginApiMiddleware, function (req, res) {

  const { title, time, type, amount, remarks } = req.body

  AccountModel.create({
    title,
    time: moment(time).toDate(),
    type: Number(type),
    amount: Number(amount),
    remarks
  }).then((data) => {
    res.json({
      code: '0000',
      msg: '新增账单成功',
      data: data
    })
  }, (err) => {
    res.json({
      code: '1003',
      msg: '新增账单失败',
      data: err.toString()
    })
  })
});




// 请求数据修改账单
router.patch('/account/:id',checkLoginApiMiddleware, function (req, res) {

  // const { title, time, type, amount, remarks } = req.body
  const {id} = req.params

  AccountModel.findOneAndUpdate({_id: id}, req.body, {new: true}).then((data) => {
    res.json({
      code: '0000',
      msg: '账单修改成功',
      data: data
    })
  }, (err) => {
    res.json({
      code: '1004',
      msg: '账单修改失败',
      data: err.toString()
    })
  })
});

module.exports = router;
