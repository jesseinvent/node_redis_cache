const { app } = require('../config/index');
const debugResponse = require('../res/debugResponse');
const sendProductionErrors = require('./sendProductionErrors');

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || false;

  if (app.env === 'development') {
    return debugResponse(err, res);
  }

  return sendProductionErrors(err, res);
};

module.exports = globalErrorHandler;
