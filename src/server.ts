/**
 * Module dependencies.
 */

// import Debug from "debug";
import http from 'http';

import app from './app';
import config from './lib/config';
import { getLogger } from './lib/logger';

const logger = getLogger();

/**
 * Get port from environment and store in Express.
 */

const port = config.APP_PORT;
app.set('port', port);

/**
 * Get host from environment and store in Express.
 */
const host = config.APP_HOST;
app.set('host', host);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: NodeJS.ErrnoException) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      logger.error(bind + ' requires elevated privileges');
      process.exit(1);
    case 'EADDRINUSE':
      logger.error(bind + ' is already in use');
      process.exit(1);
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  let bind = 'not bounded';
  if (addr !== null) {
    bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  }
  logger.info('Listening on ' + bind);
}
