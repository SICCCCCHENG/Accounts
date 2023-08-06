const mongoose = require('mongoose')

// 配置文档结构
const AccountSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    time: {
        type:Date,
        required: true
    },
    type: Number,
    amount: {
        type: Number,
        required: true
    },
    remarks: String
})

// 在数据库下创建名叫 account 的表
const AccountModel = mongoose.model('account', AccountSchema)

module.exports = AccountModel


