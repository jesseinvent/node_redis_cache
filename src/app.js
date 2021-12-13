const express = require('express');
const morgan = require('morgan');
const responseTime = require('response-time');
const { app: config } = require('./config/index');
const AppError = require('./error/AppError');
const globalErrorHandler = require('./error/globalErrorHandler');
const rocketRouter = require('./routes/rocketRoutes');

const app = express();

if (config.app.env !== 'production') app.use(morgan('dev'));

app.use(responseTime());

app.get('/', (req, res, next) => {
  res.send('Hello world');
});

app.use('/api/v1/rockets', rocketRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this Server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
