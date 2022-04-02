const axios = require('axios');
const redisClient = require('../services/redisClient');
const catchAsyncHandler = require('../utils/catchAsyncHandler');
const log = require('../utils/logger');

const validateResponse = (response, res) => {
  if (!response.data || !response.status === 200) {
    res.status(500).json({
      status: false,
      code: 500,
      message: 'Internal server error',
    });
  }
};

const client = redisClient();

exports.index = catchAsyncHandler(async (req, res, next) => {
  const retrieveRocketsFromCache = await client.get('rockets');
  if (retrieveRocketsFromCache) {
    return res.status(200).json({
      status: true,
      code: 200,
      message: 'Successfully retrieved rockets from cache',
      data: JSON.parse(retrieveRocketsFromCache),
    });
  }

  const response = await axios.get(`https://api.spacexdata.com/v3/rockets`);

  validateResponse(response, res);

  const cacheRocketData = await client.set(
    'rockets',
    JSON.stringify(response.data),
    {
      EX: 15,
    }
  );

  log.info('New data cached', cacheRocketData);

  return res.status(200).json({
    status: true,
    code: 200,
    message: 'Successfully retrieved rockets from API',
    data: response.data,
  });
});

exports.show = catchAsyncHandler(async (req, res, next) => {
  const getRocketByIdFromCache = await client.get(req.params.id);

  if (getRocketByIdFromCache) {
    return res.status(200).json({
      status: true,
      code: 200,
      message: 'Successfully retrieved rocket from cache',
      data: JSON.parse(getRocketByIdFromCache),
    });
  }

  const response = await axios.get(
    `https://api.spacexdata.com/v3/rockets/${req.params.id}`
  );

  validateResponse(response, res);

  const cacheRocketData = await client.set(
    req.params.id,
    JSON.stringify(response.data),
    {
      EX: 15,
    }
  );

  log.info('New data cached', cacheRocketData);

  return res.status(200).json({
    status: true,
    code: 200,
    message: 'Successfully retrieved rocket from API',
    data: response.data,
  });
});
