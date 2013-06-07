var assert = require('chai').assert;
var SandboxedModule = require('sandboxed-module');

describe('room', function() {
  it('should have an id field', function(done) {
    var roomModule = require('../lib/room.js');
    var room = new roomModule.Room('the id');
    assert.equal(room.id, 'the id');
    done();
  });

  it('should save itself', function(done) {

    var fakeclient = {};
    fakeclient.set = function(key, value) {
      assert.equal(key, 'room id');
      assert.equal(value, true);
    };

    var fakecache = {};
    fakecache.client = function() {
      return fakeclient;
    };

    var roomModule = SandboxedModule.require('../lib/room.js', {
      requires: {
        './octocache.js': fakecache
      }
    });


    var checkCallback = function(err, item) {
      assert.equal(err, null);
      assert.equal(item.id, 'room id');
      done();
    };

    var room = new roomModule.Room('room id');
    room.save(checkCallback);

  });

  it('should pass an error if id is not set', function(done) {

    var checkCallback = function(err, item) {
      assert.notEqual(err, null);
      assert.equal(item, null);
      done();
    };

    var roomModule = require('../lib/room.js');
    var room = new roomModule.Room();
    room.save(checkCallback);

  });

  it('should delete itself', function(done) {

    var fakeclient = {};
    fakeclient.del = function(key, callback) {
      assert.equal(key, 'room id');
      callback(null, 1);
    };

    var fakecache = {};
    fakecache.client = function() {
      return fakeclient;
    };

    var roomModule = SandboxedModule.require('../lib/room.js', {
      requires: {
        './octocache.js': fakecache
      }
    });


    var checkCallback = function(err, item) {
      assert.equal(err, null);
      assert.equal(item.id, 'room id');
      done();
    };

    var room = new roomModule.Room('room id');
    room.delete(checkCallback);

  });

  it('should pass an error if id is not set on del', function(done) {

    var checkCallback = function(err, item) {
      assert.notEqual(err, null);
      assert.equal(item, null);
      done();
    };

    var roomModule = require('../lib/room.js');
    var room = new roomModule.Room();
    room.delete(checkCallback);

  });

  it('should find a room from the cache', function(done) {

    var fakeclient = {};
    fakeclient.get = function(key, callback) {
      assert.equal(key, 'room id');
      callback(null, true);
    };

    var fakecache = {};
    fakecache.client = function() {
      return fakeclient;
    };

    var roomModule = SandboxedModule.require('../lib/room.js', {
      requires: {
        './octocache.js': fakecache
      }
    });


    var checkCallback = function(err, item) {
      assert.equal(err, null);
      assert.equal(item.id, 'room id');
      done();
    };

    roomModule.find('room id', checkCallback);


  });

  it('should pass an error if room is not found', function(done) {

    var fakeclient = {};
    fakeclient.get = function(key, callback) {
      assert.equal(key, 'room id');
      callback(null, null);
    };

    var fakecache = {};
    fakecache.client = function() {
      return fakeclient;
    };

    var roomModule = SandboxedModule.require('../lib/room.js', {
      requires: {
        './octocache.js': fakecache
      }
    });


    var checkCallback = function(err, item) {
      assert.notEqual(err, null);
      assert.equal(item, null);
      done();
    };

    roomModule.find('room id', checkCallback);

  });

});

