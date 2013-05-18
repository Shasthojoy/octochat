var octodb = require('./octodb.js');

/**
 * @param {String} access_token The access token for this User.
 * @constructor
 *
 * This is the constructor of User object
 */
exports.User = function(access_token) {
  this.accessToken = access_token;
};

/**
 * @param {Function} onItemSaved The callback invocated when all ends.
 *
 * This method saves this user on database
 */
exports.User.prototype.save = function(onItemSaved) {
  var self = this;

  octodb.connectToDb(function(err, db) {
    db.collection('users', function(err, collection) {
      var data = { access_token: self.accessToken };
      collection.insert(data, function(err, item) {
        onItemSaved(null, item._id);
      });
    });
  });
};
