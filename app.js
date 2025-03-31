var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var questionsRouter = require('./lafs-api/routes/question');

// Define routers
var indexRouter = require('./app_server/routes/index');
var usersRouter = require('./app_server/routes/users');
var travelRouter = require('./app_server/routes/travel');
var roomsRouter = require('./app_server/routes/rooms');
var apiRouter = require('./app_api/routes/index');

// Added for Angular Questions
//var questionsRouter = require('./lafs-api/routes/questions');

var hbs = require('hbs');

// Bring in the database
require('./app_api/models/db');

var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));

// Register handlebars partials
hbs.registerPartials(__dirname + '/app_server/views/partials');

app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Enable CORS
//app.use('/api', (req, res, next) => {
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

// Wire-up routes to Controllers
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/travel', travelRouter);
app.use('/rooms', roomsRouter);
app.use('/api', apiRouter);

// Added for Angular Questions
app.use('/api/Questions', questionsRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
