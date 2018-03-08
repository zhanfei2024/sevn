var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var index = require('./routes/index');
var users = require('./routes/users');
var todos = require('./routes/todos');
var user = require('./routes/user');

var app = express();

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(allowCrossDomain);

app.use(function(req, res, next) {
    // 检查post的信息或者url查询参数或者表头
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    console.log(token)
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
})

app.use('/', index);
app.use('/todos', todos);
app.use('/user', user);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
