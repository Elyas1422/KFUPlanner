let createError = require('http-errors');
let express = require('express');
let path = require('path');
let favicon = require('serve-favicon')
const bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

let app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname,'public','assets','favicon.ico')));
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({
    error: err.message,
    stack: err.stack
  });
});

app.listen(5000, () => {
  console.log('listening on http://127.0.0.1:5000')
})

module.exports = app;
