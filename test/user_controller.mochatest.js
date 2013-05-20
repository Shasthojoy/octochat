var assert = require('chai').assert;
var SandboxedModule = require('sandboxed-module');
var settings = require('../settings.js').loadSettings();

describe('The user_controller', function() {
  it('should get an access token using oauth', function(done) {
    var req = {};
    var res = {};
    var fakeuser = function(accessToken) {
      assert.equal(accessToken, 'the access token');
    };
    fakeuser.prototype.save = function(callback) {
      callback(null, 'the user id');
    };
    var fakeoauth = function(id, secret, url, auth, token, headers) {
      assert.equal(id, settings.clientid);
      assert.equal(secret, settings.clientsecret);
      assert.equal(url, settings.githuburl);
      assert.equal(auth, settings.authurl);
      assert.equal(token, settings.tokenurl);
      assert.equal(headers, null);
    };
    fakeoauth.prototype.getOAuthAccessToken = function(code, params, callback) {
      assert.equal(code, 'received code');
      assert.equal(params, null);
      callback(null, 'the access token', null, null);
    };
    req.query = { code: 'received code' };
    req.session = {};
    res.redirect = function(url) {
      assert.equal(url, '/chat');
      done();
    };

    var userController = SandboxedModule.require('../lib/user_controller.js', {
      requires: {
        'oauth': { OAuth2: fakeoauth },
        './user.js': { User: fakeuser }
      }
    });

    userController.grantAccess(req, res);
  });

  it('should redirect to error page if procedure fails', function(done) {
    var req = {};
    var res = {};
    var fakeoauth = function(id, secret, url, auth, token, headers) {};
    fakeoauth.prototype.getOAuthAccessToken = function(code, params, callback) {
      callback('an error', null, null, null);
    };
    req.query = { code: 'received code' };
    res.redirect = function(url) {
      assert.equal(url, '/errorpage');
      done();
    };

    var userController = SandboxedModule.require('../lib/user_controller.js', {
      requires: {
        'oauth': { OAuth2: fakeoauth }
      }
    });

    userController.grantAccess(req, res);
  });

  it('should redirect to error page if no token is received', function(done) {
    var req = {};
    var res = {};
    var fakeoauth = function(id, secret, url, auth, token, headers) {};
    fakeoauth.prototype.getOAuthAccessToken = function(code, params, callback) {
      callback(null, null, null, null);
    };
    req.query = { code: 'received code' };
    res.redirect = function(url) {
      assert.equal(url, '/errorpage');
      done();
    };

    var userController = SandboxedModule.require('../lib/user_controller.js', {
      requires: {
        'oauth': { OAuth2: fakeoauth }
      }
    });

    userController.grantAccess(req, res);
  });

  it('should save the new token', function(done) {
    var req = {};
    var res = {};
    var fakeoauth = function(id, secret, url, auth, token, headers) {};
    fakeoauth.prototype.getOAuthAccessToken = function(code, params, callback) {
      callback(null, 'the access token', null, null);
    };
    req.query = { code: 'received code' };
    req.session = {};
    res.redirect = function(url) {
      assert.equal(req.session.userid, 'the user id');
      assert.equal(url, '/chat');
      done();
    };
    var fakeuser = function(accessToken) {
      assert.equal(accessToken, 'the access token');
    };
    fakeuser.prototype.save = function(callback) {
      callback(null, 'the user id');
    };

    var userController = SandboxedModule.require('../lib/user_controller.js', {
      requires: {
        'oauth': { OAuth2: fakeoauth },
        './user.js': { User: fakeuser }
      }
    });

    userController.grantAccess(req, res);
  });

  it('should logout the current user', function(done) {
    var req = {};
    req.session = { userid: 'an user id' };
    var res = {};
    res.redirect = function(path) {
      assert.equal(path, '/');
      assert.equal(req.session.userid, undefined);
      done();
    };
    var userController = require('../lib/user_controller.js');
    userController.performLogout(req, res);
  });

  it('should load the repo list of a saved user', function(done) {
    var req = {};
    req.session = { userid: 'an user id' };
    var res = {};
    res.send = function(code, jsonList) {
      assert.equal(code, 200);
      assert.equal(jsonList.repos.length, 2);
      done();
    };
    var fakerepo = {};
    fakerepo.getUserRepos = function(user, callback) {
      assert.equal(user.accessToken, 'the user token');
      callback(null, ['repo1', 'repo2']);
    };
    var fakeuser = {};
    fakeuser.find = function(userid, callback) {
      assert.equal(userid, 'an user id');
      callback(null, { accessToken: 'the user token' });
    };
    var userController = SandboxedModule.require('../lib/user_controller.js', {
      requires: {
        './user.js': fakeuser,
        './repo.js': fakerepo
      }
    });

    userController.getUserRepoList(req, res);
  });

  it('should reply with an error if user is not found', function(done) {
    var req = {};
    req.session = { userid: 'an user id' };
    var res = {};
    res.send = function(code, jsonError) {
      assert.equal(code, 400);
      assert.equal(jsonError.code, 'ERR0');
      assert.equal(jsonError.desc, 'request failed');
      done();
    };
    var fakeuser = {};
    fakeuser.find = function(userid, callback) {
      assert.equal(userid, 'an user id');
      callback('an error', null);
    };
    var userController = SandboxedModule.require('../lib/user_controller.js', {
      requires: {
        './user.js': fakeuser
      }
    });

    userController.getUserRepoList(req, res);
  });

});
