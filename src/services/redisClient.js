const { createClient } = require('redis');
// const { redis } = require('../config/index');
const log = require('../utils/logger');

// const { host, port } = redis;

const redisClient = () => {
  const redisURL = `redis://localhost:6379`;
  const client = createClient({
    url: redisURL,
  });

  client.on('error', (err) => log.error('Redis Client Error', err));

  client.connect();

  log.info('Connected to redis client');

  return client;
};

module.exports = redisClient;
