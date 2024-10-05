const proxy = [
  {
    context: ['/api'],
    target: 'http://localhost:3000/pessoas',
    secure: true,
    logLevel: 'debug',
    pathRewrite: { '^/api': '' },
    changeOrigin: true
  },
];

module.exports = proxy;