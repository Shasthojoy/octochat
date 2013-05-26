var octocache = require('./octocache.js');

/**
 * @param {String} roomId The id for this room.
 * @constructor
 *
 * This is the constructor of Room object
 */
exports.Room = function(roomId) {
  this.id = roomId;
};

/**
 * @param {Function} onRoomSaved The callback invocated when all ends.
 *
 * This method saves this room on database
 */
exports.Room.prototype.save = function(onRoomSaved) {
  if (!this.id)
    onRoomSaved('error', null);
  else {
    octocache.octocache.set(this.id, true);
    onRoomSaved(null, this);
  }

};

/**
 * @param {Function} onRoomSaved The callback invocated when all ends.
 *
 * This method deletes this room from database
 */
exports.Room.prototype.delete = function(onRoomDeleted) {
  var self = this;

  if (!this.id)
    onRoomDeleted('error', null);
  else {
    var onItemDeleted = function(err, nItems) {
      onRoomDeleted(null, self);
    };

    octocache.octocache.del(this.id, onItemDeleted);
  }

};

/**
 * @param {String} id The room id.
 * @param {Function} onRoomFound The callback invocated when all ends.
 *
 * This method search a room into database using its id
 */
exports.find = function(id, onRoomFound) {
  var onKeyFound = function(err, value) {
    if (!value)
      return onRoomFound('error', null);

    var room = new exports.Room(id);
    onRoomFound(null, room);
  };

  octocache.octocache.get(id, onKeyFound);
};
