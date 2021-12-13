const app = {
  name: process.env.APP_NAME || 'NODE REDIS CACHE',
  port: process.env.APP_PORT || '3000',
  host: process.env.APP_HOST || 'http://127.0.0.1',
  env: process.env.NODE_ENV || 'production',
};

exports.app = app;
