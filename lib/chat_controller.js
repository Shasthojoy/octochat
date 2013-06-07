var io = require('socket.io');
var Room = require('./room.js');
var User = require('./user.js');

/**
 * @param {Object} httpServer An HTTP server.
 * @param {Object} store The current session store.
 * @param {Object} parser The default cookie parser.
 *
 * This method enables chat.
 */
exports.enable = function(httpServer, store, parser) {
  io = io.listen(httpServer);

  io.configure(function() {
    io.set('transports', ['websocket', 'xhr-polling']);
    io.set('polling duration', 10);
  });

  io.sockets.on('connection', function(socket) {
    parser(socket.handshake, null, function() {
      var sid = socket.handshake.cookies['connect.sid'].split('.')[0];
      sid = sid.split('s:')[1];
      store.get(sid, function(err, data) {
        if (err || !data)
          return socket.emit('infos', 'User should be logged!');

        User.find(data.userid, function(err, userFound) {
          if (err || !userFound)
            return socket.emit('infos', 'User should be logged!');

          socket.user = userFound;

          socket.on('message', function(text) {
            io.sockets.in(socket.room).emit('message', socket.user.loginName, text);
          });

          socket.on('join', function(room) {
            Room.find(room, function(err, room) {
              if (err) return socket.emit('infos', 'Room doesn\'t exists');
              socket.join(room);
              socket.room = room;
              io.sockets.in(room).emit('infos', 'Everybody say welcome to ' + socket.user.loginName);
            });
          });


          socket.emit('infos', 'Welcome ' + socket.user.loginName);
        });
      });
    });
  });

};
