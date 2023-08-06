
module.exports = function (req, res, next) {
    // 如果读取不到username,就跳转到登陆页面
    // 以下不能区分用户
    if (!req.session.username) {
        return res.redirect('/login')
    }
    next()
}

