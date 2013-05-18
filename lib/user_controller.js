var OAuth2 = require('oauth').OAuth2;
var User = require('./user.js').User;
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
    loggedUser = new User(access_token);
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
