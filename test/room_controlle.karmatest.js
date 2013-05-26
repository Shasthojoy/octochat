var assert = chai.assert;

describe('Room controller', function() {
  it('should enable a room', function(done) {
    var scope = {};
    var http = {};

    scope.User = {};
    scope.User.repos = {};
    scope.User.repos['roomid'] = {};
    scope.User.repos['roomid'].enabled = false;

    http.success = function(callback) {
      callback({ id: 'roomid' });
      done();
    };

    http.post = function(url) {
      assert.equal(url, '/room/roomid');

      return http;
    };

    var ctr = new RoomController(scope, http);
    scope.enable('roomid');

  });

  it('should enable a room', function(done) {
    var scope = {};
    var http = {};

    scope.User = {};
    scope.User.repos = {};
    scope.User.repos['roomid'] = {};
    scope.User.repos['roomid'].enabled = true;

    http.success = function(callback) {
      callback({ id: 'roomid' });
      done();
    };

    http.delete = function(url) {
      assert.equal(url, '/room/roomid');

      return http;
    };

    var ctr = new RoomController(scope, http);
    scope.disable('roomid');

  });

});

