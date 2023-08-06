var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const {DBPORT, DBHOST, DBNAME} = require('./config/config')

const indexWebRouter = require('./routes/web/index');
const indexApiRouter = require('./routes/api/index');

const authWebRouter = require('./routes/web/auth')
const authApiRouter = require('./routes/api/auth')

var app = express();

// 导入express-session  connect-mongo模块
const session = require('express-session')
const MongoStore = require('connect-mongo');
// 导入session中间件
app.use(session({
  name: "session-id",
  secret: 'sicheng',
  saveUninitialized: false,
  resave: false,
  store: MongoStore.create({
    mongoUrl: `mongodb://${DBHOST}:${DBPORT}/${DBNAME}`
  }),
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 // 设置session有效期为一天
  }
}))





// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', indexWebRouter);
app.use('/api', indexApiRouter);
app.use('/', authWebRouter)
app.use('/api', authApiRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.render('404')
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
