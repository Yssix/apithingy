var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Adding Cors
const cors = require( 'cors' )

// Call mongose
const mongoose = require( 'mongoose' )

var indexRouter = require('./routes/index');
var ratingRouter = require( './routes/rating' ); // Changed to call rating

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Run cors
app.use( cors(  ) )

// Adding connection to mongoose database
  mongoose.connect( 'mongodb+srv://hampe25:WLAlF6BdYe4dzAKc@schoolcluster.k7ayquo.mongodb.net/game_review?retryWrites=true&w=majority' )
// Checking if connection success or failed
  let  db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error:'))
  db.once( 'open', (callback) => {
    console.log( 'Kopplingen lyckades!' )
  });

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use( '/rating', ratingRouter ); // Changed this so it calls the changed variable

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
