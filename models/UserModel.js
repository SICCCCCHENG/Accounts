const mongoose = require('mongoose')

// 配置文档结构
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

// 在数据库下创建名叫 users 的表
const UserModel = mongoose.model('users', UserSchema)

module.exports = UserModel
