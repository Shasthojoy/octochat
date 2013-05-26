var assert = require('chai').assert;
var SandboxedModule = require('sandboxed-module');

describe('ChatController', function() {
  it('should enable socket io', function(done) {
    var fakeio = {};
    fakeio.listen = function(server) {
      assert.equal(server, 'the server');
      done();
    };

    var controller = SandboxedModule.require('../lib/chat_controller.js', {
      requires: {
        'socket.io': fakeio
      }
    });

    controller.enable('the server');

  });
});

