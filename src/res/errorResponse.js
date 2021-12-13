const errorResponse = (message, statusCode, res) =>
  res.status(statusCode).json({
    status: false,
    statusCode,
    message,
  });

module.exports = errorResponse;
