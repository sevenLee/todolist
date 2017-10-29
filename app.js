const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const index = require('./routes/index');
const contacts = require('./routes/contacts');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());

app.use('/', index);
app.use('/api/contacts', contacts);

app.use('/avatar', express.static(path.join(__dirname + '/avatar')));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log('error here!')
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
  res.status(400).send({ error: err.toString() });
  res.render('error');
});

module.exports = app;
