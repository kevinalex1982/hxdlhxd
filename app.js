var express = require('express');
var path = require('path');
/*var favicon = require('serve-favicon');*/
var logger = require('morgan');
/*var cookieParser = require('cookie-parser');*/
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var dataope = require('./routes/DataOperateMongo');
var dldata = require('./routes/dlData');
var app = express();
var session = require('express-session');

//2016/10/28
/*app.use(session({
  secret: 'secret',
  cookie:{
    maxAge: 1000*60*30
  }
}));
app.use(function(req,res,next){

  res.locals.user = req.session.user;
  var err = req.session.error;
  delete req.session.error;
  res.locals.message = "";
  if(err){
    res.locals.message = '<div class="alert alert-danger" style="margin-bottom:20px;color:red;">'+err+'</div>';
  }
  next();
});*/

// 加载hbs模块
var hbs = require('hbs');

// 指定模板文件的后缀名为html
app.set('views', path.join(__dirname, 'views/html'));
app.set('view engine', 'html');

// 运行hbs模块
app.engine('html', hbs.__express);




// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/*app.use(cookieParser());*/
app.use(express.static(path.join(__dirname, 'views/html')));

app.use('/', routes);
app.use('/users', users);
app.use('/', dataope);
app.use('/dldata', dldata);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
