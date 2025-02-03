const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', 
    createProxyMiddleware({
      target: 'http://backend.eba-9ypvtqbe.us-east-1.elasticbeanstalk.com',
      changeOrigin: true,
      pathRewrite: {'^/api' : ''} 
    })
  );
};
