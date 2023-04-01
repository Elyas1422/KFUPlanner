let createError = require('http-errors');
let express = require('express');
let path = require('path');
let favicon = require('serve-favicon')
let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(favicon(path.join(__dirname,'public','assets','favicon.ico')));



app.get('/', function(req, res, next) {
  res.render('index');
});
app.get('/schedulemaster', (req, res, next) => {
  res.render('ScheduleMaster')
})
app.get('/StudyPlanner', (req, res, next) => {
  res.render('StudyPlanner')
})
app.get('/StudyClock', (req, res, next) => {
  res.render('StudyClock')
})
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
