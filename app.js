var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var busStop = require('./routes/busStop');
var crawler = require('./routes/cralwer');
var images = require('./routes/images');
var busTable = require('./routes/busTable');
//var crawler = require('./routes/cralwer');

var app = express();

// const http = require('http');

// const hostname = '203.252.104.45';
// const port = 80;

// http.createServer((req, res) => {
//   res.writeHead(200, {'Content-Type' : 'text/plain'});
// }).listen(port,hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// })

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.set('port', process.env.PORT || 80); // 얘는 작동 안됨 

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/busStop',busStop);
app.use('/cralwer',crawler);
app.use('/images',images);
app.use('/busTable',busTable);

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
