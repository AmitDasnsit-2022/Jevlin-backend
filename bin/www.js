#!/usr/bin/env node

/**
 * Module dependencies.
 */
import debugLib from 'debug';
import app from '../app.js'; // Import app.js to handle server and port setup

const debug = debugLib('jevlin-backend:server');

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  const port = parseInt(val, 10);

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

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const port = app.get('port');
  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      console.log('Trying a different port...');
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  const port = app.get('port');
  const bind = typeof port === 'string' ? 'pipe ' + port : 'port ' + port;
  console.log('Listening on ' + bind);
  debug('Listening on ' + bind);
}

// Export error and listening event handlers (optional, in case needed elsewhere)
export { normalizePort, onError, onListening };
