require('should');
var assert = require('assert');
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
      fakecoll.findOne = function(object, callback) {
        assert.equal(object.access_token, 'access token');
        object._id = 'the user id';
        callback(null, object);
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


});
