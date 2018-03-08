var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // 检查post的信息或者url查询参数或者表头
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  //解析token
  if(token) {
    // 验证token
    jwt.verify(token, '1', function(err, decoded) {
      if (err) {
        return res.json({error: true, message: 'token信息错误'});
      } else {
        // 如果没问题就把解码后的信息保存到请求中，供后面的路由使用
        req.decoded = decoded;
        next();
      }
    })
  } else {
       // 如果没有token，则返回错误
       return res.status(403).send({
        success: false,
        message: '没有提供token！'
    });
  }
});

module.exports = router;
