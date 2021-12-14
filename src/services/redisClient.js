const { createClient } = require('redis');
const { redis } = require('../config/index');
const log = require('../utils/logger');

const { host, port } = redis;

const redisClient = async () => {
  const client = createClient({
    host,
    port,
  });

  client.on('error', (err) => log.error('Redis Client Error', err));

  await client.connect();

  return client;
};

module.exports = redisClient;
