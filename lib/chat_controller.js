var io = require('socket.io');
var Room = require('./room.js');

/**
 * @param {Object} httpServer An HTTP server.
 *
 * This method enables chat.
 */
exports.enable = function(httpServer) {
  io = io.listen(httpServer);

  io.sockets.on('connection', function(socket) {
    socket.on('join', function(room) {
      console.log('ricev ' + room);
      Room.find(room, function(err, room) {
        if (err) return socket.emit('infos', 'SERVER', 'Room doesn\'t exists');

        socket.join(room);
        io.sockets.in(room).emit('infos', 'SERVER', 'Welcome dude');
      });
    });
  });
};
