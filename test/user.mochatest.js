var assert = require('chai').assert;
var SandboxedModule = require('sandboxed-module');

describe('The user model', function() {
  it('should have an accessToken field', function(done) {
    var User = require('../lib/user.js').User;
    var user = new User('access token');
    assert.equal(user.accessToken, 'access token');
    done();
  });

  it('should save itself into db', function(done) {
    var fakedb = {};
    fakedb.close = function() {};
    fakedb.collection = function(name, callback) {
      assert.equal(name, 'users');
      var fakecoll = {};
      fakecoll.insert = function(data, callback) {
        assert.equal(data.access_token, 'access token');
        data._id = 'the user id';
        data = [data];
        callback(null, data);
      };

      callback(null, fakecoll);
    };
    var fakedbmodule = {};
    fakedbmodule.connectToDb = function(callback) {
      callback(null, fakedb);
    };
    var User = SandboxedModule.require('../lib/user.js', {
      requires: {
        './octodb.js': fakedbmodule
      }
    }).User;


    var checkCallback = function(err, userid) {
      assert.equal(userid, 'the user id');
      assert.equal(err, null);
      done();
    };

    var user = new User('access token');
    user.save(checkCallback);
  });

  it('should retrieve old id if token is already present', function(done) {
    var fakedb = {};
    fakedb.close = function() {};
    fakedb.collection = function(name, callback) {
      assert.equal(name, 'users');
      var fakecoll = {};
      fakecoll.insert = function(data, callback) {
        callback('error', null);
      };
      fakecoll.findOne = function(data, callback) {
        assert.equal(data.access_token, 'access token');
        data._id = 'the user id';
        callback(null, data);
      };

      callback(null, fakecoll);
    };
    var fakedbmodule = {};
    fakedbmodule.connectToDb = function(callback) {
      callback(null, fakedb);
    };
    var User = SandboxedModule.require('../lib/user.js', {
      requires: {
        './octodb.js': fakedbmodule
      }
    }).User;


    var checkCallback = function(err, userid) {
      assert.equal(userid, 'the user id');
      assert.equal(err, null);
      done();
    };

    var user = new User('access token');
    user.save(checkCallback);
  });

  it('should search an User by id', function(done) {
    var fakedb = {};
    fakedb.close = function() {};
    fakedb.collection = function(name, callback) {
      assert.equal(name, 'users');
      var fakecoll = {};
      fakecoll.findOne = function(data, callback) {
        assert.equal(data._id.id, 'the user id');
        data.access_token = 'the access token';
        callback(null, data);
      };

      callback(null, fakecoll);
    };
    var fakedbmodule = {};
    fakedbmodule.ID = function(string) {
      this.id = string;
    };
    fakedbmodule.connectToDb = function(callback) {
      callback(null, fakedb);
    };
    var User = SandboxedModule.require('../lib/user.js', {
      requires: {
        './octodb.js': fakedbmodule
      }
    });

    var checkCallback = function(err, user) {
      assert.equal(user.accessToken, 'the access token');
      assert.equal(err, null);
      done();
    };

    User.find('the user id', checkCallback);

  });

  it('should pass err if id is not present', function(done) {
    var fakedb = {};
    fakedb.close = function() {};
    fakedb.collection = function(name, callback) {
      assert.equal(name, 'users');
      var fakecoll = {};
      fakecoll.findOne = function(data, callback) {
        assert.equal(data._id.id, 'the user id');
        callback('an error', null);
      };

      callback(null, fakecoll);
    };
    var fakedbmodule = {};
    fakedbmodule.ID = function(string) {
      this.id = string;
    };
    fakedbmodule.connectToDb = function(callback) {
      callback(null, fakedb);
    };
    var User = SandboxedModule.require('../lib/user.js', {
      requires: {
        './octodb.js': fakedbmodule
      }
    });

    var checkCallback = function(err, user) {
      assert.equal(user, null);
      assert.notEqual(err, null);
      done();
    };

    User.find('the user id', checkCallback);

  });

  it('should update the current user', function(done) {
    var fakedb = {};
    fakedb.close = function() {};
    fakedb.collection = function(name, callback) {
      assert.equal(name, 'users');
      var fakecoll = {};
      fakecoll.update = function(key, data, options, callback) {
        assert.equal(key._id.id, 'the user id');
        assert.equal(data.access_token, 'access token');
        assert.equal(data.login_name, 'login name');
        assert.equal(data.avatar_url, 'avatar url');
        assert.equal(data.repos, 'user repos');
        assert.equal(options.upsert, 1);
        callback(null, data);
      };

      callback(null, fakecoll);
    };
    var fakedbmodule = {};
    fakedbmodule.connectToDb = function(callback) {
      callback(null, fakedb);
    };
    fakedbmodule.ID = function(string) {
      this.id = string;
    };

    var User = SandboxedModule.require('../lib/user.js', {
      requires: {
        './octodb.js': fakedbmodule
      }
    }).User;

    var checkCallback = function(err, user) {
      assert.equal(user.id, 'the user id');
      assert.equal(user.accessToken, 'access token');
      assert.equal(user.loginName, 'login name');
      assert.equal(user.avatarUrl, 'avatar url');
      assert.equal(user.repos, 'user repos');
      assert.equal(err, null);
      done();
    };

    var user = new User('access token');
    user.id = 'the user id';
    user.loginName = 'login name';
    user.avatarUrl = 'avatar url';
    user.repos = 'user repos';
    user.update(checkCallback);

  });

});
