var assert = require('chai').assert;
var SandboxedModule = require('sandboxed-module');

describe('The chat controller', function() {
  it('should start listening using socket io', function(done) {
    done();

    //var fakeio = {};

    //fakeio.listen = function(server) {
      //assert.equal(server, 'the server');
      //return fakeio;
    //};

    //fakeio.configure = function(callback) {
      //callback();
    //};

    //fakeio.set = function(parameter, value) {
      //if (parameter == 'transports') {
        //assert.equal(value[0], 'websocket');
        //assert.equal(value[1], 'xhr-polling');
      //}
      //if (parameter == 'polling duration') {
        //assert.equal(value, 10);
      //}
    //};

    //var fakesocket = {};

    //fakesocket.on = function(event, callback) {
      //if (event == 'join')
        //done();
    //};

    //fakeio.sockets = {};

    //fakeio.sockets.on = function(event, callback) {
      //if (event == 'connection')
        //callback(fakesocket);
    //};

    //var controller = SandboxedModule.require('../lib/chat_controller.js', {
      //requires: {
        //'socket.io': fakeio
      //}
    //});

    //controller.enable('the server');
  });

});

