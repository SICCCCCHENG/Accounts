const { DBHOST, DBPORT, DBNAME } = require('../config/config')

// 导入mongoose
const mongoose = require('mongoose')

module.exports = function (success, error) {

    if (typeof err != 'function') {
        err = () => {
            console.log('数据库连接失败');
        }
    }


    mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`)
    mongoose.connection.once('open', () => {
        success()
    })

    mongoose.connection.on('error', () => {
        console.log('连接数据库失败...');
        error()
    })

    mongoose.connection.on('close', () => {
        console.log('连接关闭...');
    })
}


