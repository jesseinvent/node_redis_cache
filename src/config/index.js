require('./env');
const app = require('./app');
const redis = require('./redis');

module.exports = {
  app,
  redis,
};
