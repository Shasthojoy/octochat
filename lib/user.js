/**
 * @param {String} access_token The access token for this User.
 *
 * This is the constructor of User object
 */
exports.User = function(access_token) {};

/**
 * @param {Function} callback The callback invocated when all ends.
 *
 * This method save this user on database
 */
exports.User.prototype.save = function(callback) {
  callback(null, null);
};
