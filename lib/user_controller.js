var OAuth2 = require('oauth').OAuth2;
var userModule = require('./user.js');
var repoModule = require('./repo.js');
var settings = require('../settings.js').loadSettings();

/**
 * @param {Object} req the HTTP request.
 * @param {Object} res the HTTP response.
 *
 * This method get and store the access token to access to GitHub API.
 */
exports.grantAccess = function(req, res) {
  var onTokenReceived = function(err, access_token, refresh_token, results) {
    if (err || !access_token) {
      res.redirect('/errorpage');
      return;
    }
    loggedUser = new userModule.User(access_token);
    loggedUser.save(function(err, userid) {
      if (err) {
        res.redirect('/errorpage');
        return;
      }
      req.session.userid = userid;
      res.redirect('/chat');
    });
  };
  var oauth2 = new OAuth2(settings.clientid,
      settings.clientsecret,
      settings.githuburl,
      settings.authurl,
      settings.tokenurl,
      null);
  oauth2.getOAuthAccessToken(req.query.code, null, onTokenReceived);
};

/**
 * @param {Object} req the HTTP request.
 * @param {Object} res the HTTP response.
 *
 * This method performs the logout of the current user.
 */
exports.performLogout = function(req, res) {
  delete req.session.userid;
  res.redirect('/');
};

/**
 * @param {Object} req the HTTP request.
 * @param {Object} res the HTTP response.
 *
 * This method retrieve the repo list of the user.
 */
exports.getUserRepoList = function(req, res) {
  var onRepoListReady = function(err, repoList) {
    res.send(200, { repos: repoList });
  };

  var onUserFound = function(err, user) {
    if (err) return res.send(400, { code: 'ERR0', desc: settings.ERR0 });

    repoModule.getUserRepos(user, onRepoListReady);
  };

  userModule.find(req.session.userid, onUserFound);
};
