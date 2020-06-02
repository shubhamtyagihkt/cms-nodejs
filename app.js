var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// database
const mongoose = require('mongoose');
// handlebars
const hbs = require('express-handlebars');

// Connect mongoose to mongoDB
var CONNECTION_URI =  process.env.MDB || "mongodb://localhost:27017/cms";
mongoose.connect(CONNECTION_URI, {useNewUrlParser : true})
  .then(response => {
    console.log("Connected succesfully go mongodb");
  })
  .catch(err => {
    console.log("Error in connecting to mongodb");
  })

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var apiRouter = require('./routes/user_api_call');

var app = express();
var db = require('./db');
var config = require('./config');

db.connect(db.MODE_PRODUCTION, function(err) {
  if (err) {
    console.log(err);
    console.log('Unable to connect to MySQL.');
    process.exit(1);
  }
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin',adminRouter);
app.use('/user_api_call',apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
