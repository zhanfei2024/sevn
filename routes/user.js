var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var model = require('../models/index');

router.get('/', function(req, res, next) {
    model.user.findAll({})
    .then(users => res.json({
        error: false,
        data: users
      }))
      .catch(error => res.json({
        error: true,
        data: [],
        error: error
      }));
})

router.post('/login', function(req, res, next) {
    const name = req.body.name;
    const password = req.body.password;

    model.user.findOne({
        where: {
            name: name
        }
    }).then(user => {
        if (!user) {
            res.json({error: true, message: '认证失败， 用户名找不到'});
        } else if(user) {
            // 检查密码
            if (user.dataValues.password != password) {
     
                res.json({error: true, message: '认证失败， 密码错误'});
   
            } else {
                const payload = {
                    admin: user.dataValues.admin
                }
                // 创建token
                var token = jwt.sign(payload, '1', {expiresIn: '1h'});
                // json格式返回token

                res.json({
                    error: false,
                    data: user,
                    message: 'user has been found!',
                    token: token
                })

            }
        }
     })
    .catch(error => res.json({
        error: true,
        data: [],
        error: error
    }));
});


/* POST todo. */
router.post('/signup', function(req, res, next) {
  const {
    name,
    password,
    admin
  } = req.body;
  model.user.create({
    name: name,
    password: password,
    admin: admin
  }).then(user => res.status(201).json({
    error: false,
    data: user,
    message: 'New user has been created.'
  }))
  .catch(error => res.json({
    error: true,
    data: [],
    error: error
  }));
});

module.exports = router;


