var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var debug = require('debug')('siadmap:server');
var http = require('http');

const cors = require('cors');
const message = require('./utils/messages')


//Import env variable
require('dotenv').config();


//lib for background task
var backgroundtask = require('./lib/backgroundtask');

//Routes
var networkPower = require('./routes/networkPower');
var networkEconomics = require('./routes/networkEconomics');
var networkStorageMarketplace = require('./routes/networkStorageMarketplace');
var networkMining = require('./routes/networkMining');
var user = require('./routes/user');

const { Console } = require('console');

var app = express();

if (process.env.NODE_ENV == 'production') {
  app.use( logger('combined'));
} else {
  app.use(logger('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Add controller
//app.use('/siad', siadRouter);
app.use('/networkpower', networkPower);
app.use('/networkeconomics', networkEconomics);
app.use('/networkstoragemarketplace', networkStorageMarketplace);
app.use('/networkmining', networkMining);

if(process.env.DATABASE_ENABLE)
  app.use('/user', user);

//Add cors headers
app.use(cors({
  //origin: ['https://www.section.io', 'https://www.google.com/']
  origin: '*',
  methods: ['GET, POST']
}));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log(err)
  // render the error page
  res.status(err.status || 500);
  res.send(message.syntaxe_error);
});

//launch background task
backgroundtask.doInBackground();


//Get port from environment and store in Express.
var port = normalizePort(process.env.APP_PORT || '3000');
app.set('port', port);

//Create HTTP server.
var server = http.createServer(app);

// Listen on provided port, on all network interfaces.
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);


//Normalize a port into a number, string, or false.
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

//Event listener for HTTP server "error" event.
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

//Event listener for HTTP server "listening" event.
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
  console.log('Listening on ' + bind)
}
