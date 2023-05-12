let createError = require('http-errors');
let express = require('express');
let path = require('path');
let favicon = require('serve-favicon')
const bodyParser = require("body-parser");
let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(favicon(path.join(__dirname,'public','assets','favicon.ico')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


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
app.post("/login/:email", async function(req, res) {
  const email =  req.body.email;
  const password = req.body.password;
  console.log(req.body)
  console.log("Email: " + email);
  console.log("Password: " + password);

  res.send("Login successful!");
});

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

app.listen(5000, () => {
  console.log('listening on http://127.0.0.1:5000')
})

module.exports = app;
