const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    const token = req.get('token')

    if(!token){
        return res.json({
            code: '2004',
            msg: 'token缺失',
            data: null
        })
    }

    jwt.verify(token, 'sicheng', (err, data) => {
        if (err) {
            return res.json({
                code: '2003',
                msg: 'token校验失败',
                data: null
            })
        }

        // console.log("测试呢...", data);

        // 保存用户数据  
        // 这里的data保存的是当时参与生成token的 uername 与 _id(用户唯一标示)
        /* {
            username: 'zhangsan',
            _id: '64ce8abc751bec866453db0d',
            iat: 1691269670,
            exp: 1691356070
          } */
        req.user = data

        next()
    })
}