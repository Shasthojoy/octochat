var assert = chai.assert;

describe('The user controller', function() {
  it('should have user informations', function(done) {
    var scope = {};
    var http = {};

    http.success = function(callback) {
      var fakeUser = {
        accessToken: 'access token',
        id: 'id',
        loginName: 'login name',
        avatarUrl: 'avatar url'
      };
      callback(fakeUser);
      assert.equal(scope.User.accessToken, 'access token');
      assert.equal(scope.User.id, 'id');
      assert.equal(scope.User.loginName, 'login name');
      assert.equal(scope.User.avatarUrl, 'avatar url');
      done();
    };

    http.get = function(url) {
      assert.equal(url, '/user');

      return http;
    };

    var controller = new UserController(scope, http);

  });

  it('should update user informations', function(done) {
    var scope = {};
    var http = {};

    http.success = function(callback) {
      var fakeUser = {
        accessToken: 'access token',
        id: 'id',
        loginName: 'login name',
        avatarUrl: 'avatar url'
      };
      callback(fakeUser);
      assert.equal(scope.User.accessToken, 'access token');
      assert.equal(scope.User.id, 'id');
      assert.equal(scope.User.loginName, 'login name');
      assert.equal(scope.User.avatarUrl, 'avatar url');
      done();
    };

    http.put = function(url) {
      assert.equal(url, '/user');

      return http;
    };

    http.get = function(url) {
      assert.equal(url, '/user');
      var otherHttp = {};
      otherHttp.success = function(callback) {
        callback({});
      };

      return otherHttp;
    };

    var controller = new UserController(scope, http);
    scope.update();


  });
});

