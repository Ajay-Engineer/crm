const serverless = require('serverless-http');
const app = require('./server');

// AWS Lambda Handler for API Gateway (HTTP API v2 and REST API)
module.exports.handler = serverless(app, {
  binary: ['image/png', 'image/jpeg', 'image/webp'],
});
