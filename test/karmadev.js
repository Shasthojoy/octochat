basePath = '../';
files = [
  MOCHA,
  MOCHA_ADAPTER,
  'node_modules/chai/chai.js',
  'test/*.karmatest.js',
  'weblib/*.js'
  ];

autoWatch = true;
browsers = ['PhantomJS'];
