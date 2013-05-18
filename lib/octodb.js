var mongo = require('mongodb');
var settings = require('../settings.js').loadSettings();

/**
 * The ID Object
 */
exports.ID = mongo.BSONPure.ObjectID;

/**
 * @param {Function} onConnectionPerformed The callback.
 *
 * This function is used to retrieve a connection to mongodb
 */
exports.connectToDb = function(onConnectionPerformed) {
  mongo.Db.connect(settings.mongourl, onConnectionPerformed);
};
