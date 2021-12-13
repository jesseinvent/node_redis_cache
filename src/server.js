const http = require('http');
const app = require('./app');
const log = require('./utils/logger');
const { app: config } = require('./config/index');

process.on('uncaughtException', (err) => {
  log.error('UNCAUGHT EXCEPTION! 🙄 Shutting down...');
  log.error(err.name, err.message);
  process.exit(1);
});

const { port } = config.app;

const server = http.createServer(app);

server.listen(port, () => {
  log.info(`Server is running on port ${port}`);
});

process.on('unhandledRejection', (err) => {
  log.error(err.name, err.message);
  log.error('UNHANDLED REJECTION! Shutting down Server...');
  server.close(() => {
    process.exit(1);
  });
});
