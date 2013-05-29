var io = require('socket.io');
var Room = require('./room.js');

/**
 * @param {Object} httpServer An HTTP server.
 *
 * This method enables chat.
 */
exports.enable = function(httpServer) {
  io = io.listen(httpServer);

  io.configure(function() {
    io.set('transports', ['xhr-polling']);
    io.set('polling duration', 10);
  });

  io.sockets.on('connection', function(socket) {

    socket.on('message', function(text) {
      io.sockets.in(socket.room).emit('message', text);
    });

    socket.on('join', function(room) {
      Room.find(room, function(err, room) {
        if (err) return socket.emit('infos', 'SERVER', 'Room doesn\'t exists');

        socket.join(room);

        socket.room = room;

        io.sockets.in(room).emit('infos', 'Welcome dude');
      });
    });
  });
};