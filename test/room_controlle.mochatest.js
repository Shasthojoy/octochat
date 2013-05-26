var assert = require('chai').assert;
var SandboxedModule = require('sandboxed-module');

describe('the room_controller', function() {
  it('should add a new room', function(done) {
    var req = {};
    var res = {};
    req.session = { userid: 'an user id' };
    req.params = { id: 'room id' };
    res.send = function(code, object) {
      assert.equal(code, 200);
      assert.equal(object.repos['room id'].enabled, true);
      done();
    };

    var fakeuser = {};
    fakeuser.find = function(userid, callback) {
      var fakeUserObject = {};
      fakeUserObject.repos = {};
      fakeUserObject.repos['room id'] = { enabled: false };
      fakeUserObject.update = function(callback) {
        callback(null, this);
      };

      assert.equal(userid, 'an user id');
      callback(null, fakeUserObject);
    };

    var fakeroom = {};
    fakeroom.Room = function(id) {
      assert.equal(id, 'room id');
    };
    fakeroom.Room.prototype.save = function(callback) {
      callback(null, { id: 'room id' });
    };

    var roomController = SandboxedModule.require('../lib/room_controller.js', {
      requires: {
        './user.js': fakeuser,
        './room.js': fakeroom
      }
    });

    roomController.addRoom(req, res);
  });

  it('should reply with an error message if repo is not owned', function(done) {
    var req = {};
    var res = {};
    req.session = { userid: 'an user id' };
    req.params = { id: 'room id' };
    res.send = function(code, object) {
      assert.equal(code, 400);
      done();
    };

    var fakeuser = {};
    fakeuser.find = function(userid, callback) {
      var fakeUserObject = {};
      fakeUserObject.repos = {};

      assert.equal(userid, 'an user id');
      callback(null, fakeUserObject);
    };

    var roomController = SandboxedModule.require('../lib/room_controller.js', {
      requires: {
        './user.js': fakeuser
      }
    });

    roomController.addRoom(req, res);

  });

  it('should remove a room', function(done) {
    var req = {};
    var res = {};
    req.session = { userid: 'an user id' };
    req.params = { id: 'room id' };
    res.send = function(code, object) {
      assert.equal(code, 200);
      assert.equal(object.repos['room id'].enabled, false);
      done();
    };

    var fakeuser = {};
    fakeuser.find = function(userid, callback) {
      var fakeUserObject = {};
      fakeUserObject.repos = {};
      fakeUserObject.repos['room id'] = { enabled: false };
      fakeUserObject.update = function(callback) {
        callback(null, this);
      };

      assert.equal(userid, 'an user id');
      callback(null, fakeUserObject);
    };

    var fakeroom = {};
    fakeroom.Room = function(id) {
      assert.equal(id, 'room id');
    };
    fakeroom.Room.prototype.delete = function(callback) {
      callback(null, { id: 'room id' });
    };

    var roomController = SandboxedModule.require('../lib/room_controller.js', {
      requires: {
        './user.js': fakeuser,
        './room.js': fakeroom
      }
    });

    roomController.removeRoom(req, res);
  });

  it('should reply an error if repo is not owned on del', function(done) {
    var req = {};
    var res = {};
    req.session = { userid: 'an user id' };
    req.params = { id: 'room id' };
    res.send = function(code, object) {
      assert.equal(code, 400);
      done();
    };

    var fakeuser = {};
    fakeuser.find = function(userid, callback) {
      var fakeUserObject = {};
      fakeUserObject.repos = {};

      assert.equal(userid, 'an user id');
      callback(null, fakeUserObject);
    };

    var roomController = SandboxedModule.require('../lib/room_controller.js', {
      requires: {
        './user.js': fakeuser
      }
    });

    roomController.removeRoom(req, res);

  });


});
