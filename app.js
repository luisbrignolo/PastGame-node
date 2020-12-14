var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();

var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var nosotrosRouter = require('./routes/nosotros');
var coleccionRouter = require('./routes/coleccion');
var multimediaRouter = require('./routes/multimedia');
var tiendaRouter = require('./routes/tienda');
var contactoRouter = require('./routes/contacto');
var loginRouter = require('./routes/admin/login');
var adminContactosRouter = require('./routes/admin/contactos');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: '32v94a63l09e',
  cookie: { maxAge: null},//tiempo en desloguearse
  resave: false,
  saveUninitialized: true
}));

secured = async (req, res, next) =>{
  try{
    //console.log(req.session.id_usuario); para ver si sale undefined en la consola
    if(req.session.id_usuario){
      next();
    }else{
      res.redirect('/admin/login');
    }
  }catch (error){
    console.log(error);
  }
}

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/nosotros', nosotrosRouter);
app.use('/coleccion', coleccionRouter);
app.use('/multimedia', multimediaRouter);
app.use('/tienda', tiendaRouter);
app.use('/contacto', contactoRouter);
app.use('/admin/login', loginRouter);
app.use('/admin/contactos', secured, adminContactosRouter);

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
