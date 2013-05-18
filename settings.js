var settings = {
  'staticfolder': __dirname + '/assets',
  'errorpage': __dirname + '/assets/errorpage.html',
  'indexpage': __dirname + '/assets/index.html',
  'viewsfolder': __dirname + '/pages',
  'port': 3000,
  'mongourl': 'mongodb://localhost/octochat',
  'clientid': 'cf150584080448a4c1d7',
  'clientsecret': 'a5068d6edc24cd23c4fa19cf12689952995f5da4',
  'githuburl': 'https://github.com',
  'authurl': '/login/oauth/authorize',
  'tokenurl': '/login/oauth/access_token',
  'secret': 'a stupid secret to crypt session stuffs'
};

/**
 * @return {Object} The settings object.
 *
 * This method is used to load current settings
 */
exports.loadSettings = function() {
  if (process.env.PORT)
    settings.port = process.env.PORT;
  if (process.env.MONGOHQ_URL)
    settings.mongourl = process.env.MONGOHQ_URL;

  return settings;
};
