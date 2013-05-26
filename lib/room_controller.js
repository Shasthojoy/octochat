var User = require('./user.js');
var Room = require('./room.js');
var settings = require('../settings.js').loadSettings();

/**
 * @param {Object} req the HTTP request.
 * @param {Object} res the HTTP response.
 *
 * This method adds a new room to octocache.
 */
exports.addRoom = function(req, res) {
  var onUserFound = function(err, user) {
    if (!user.repos[req.params.id])
      return res.send(400, { code: 'ERR0', desc: settings.ERR0 });

    var onRoomSaved = function(err, item) {

      var onUserUpdated = function(err, item) {
        res.send(200, item);
      };

      var roomInfos = user.repos[req.params.id];
      roomInfos.enabled = true;
      user.update(onUserUpdated);
    };

    var room = new Room.Room(req.params.id);
    room.save(onRoomSaved);
  };

  User.find(req.session.userid, onUserFound);
};

/**
 * @param {Object} req the HTTP request.
 * @param {Object} res the HTTP response.
 *
 * This method removes a room from octocache.
 */
exports.removeRoom = function(req, res) {

  var onUserFound = function(err, user) {
    if (!user.repos[req.params.id])
      return res.send(400, { code: 'ERR0', desc: settings.ERR0 });

    var onRoomDeleted = function(err, item) {

      var onUserUpdated = function(err, item) {
        res.send(200, item);
      };

      var roomInfos = user.repos[req.params.id];
      roomInfos.enabled = false;
      user.update(onUserUpdated);

    };

    var room = new Room.Room(req.params.id);
    room.delete(onRoomDeleted);
  };

  User.find(req.session.userid, onUserFound);
};
