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
        if (err) {
          var toFind = { access_token: self.accessToken };
          return collection.findOne(toFind, function(err, item) {
            onItemSaved(null, item._id);
            db.close();
          });
        }
        onItemSaved(null, item[0]._id);
        db.close();
      });
    });
  });
};

/**
 * @param {Function} onUserUpdated The callback invocated when all ends.
 *
 * This method updates this user on database
 */
exports.User.prototype.update = function(onUserUpdated) {
  var self = this;

  octodb.connectToDb(function(err, db) {
    db.collection('users', function(err, collection) {
      var key = { _id: new octodb.ID(self.id.toString()) };
      var data = {
        access_token: self.accessToken,
        login_name: self.loginName,
        avatar_url: self.avatarUrl,
        repos: self.repos
      };
      collection.update(key, data, { upsert: 1 }, function(err, item) {
        if (err) return onUserUpdated(err, null);

        db.close();
        onUserUpdated(null, self);
      });
    });
  });
};

/**
 * @param {String} userid The user id.
 * @param {Function} onUserFound The callback invocated when all ends.
 *
 * This method search an user into database using its id
 */
exports.find = function(userid, onUserFound) {
  octodb.connectToDb(function(err, db) {
    db.collection('users', function(err, collection) {
      var data = { _id: new octodb.ID(userid.toString()) };
      collection.findOne(data, function(err, item) {
        if (err || !item) return onUserFound('error', null);

        var User = new exports.User(item.access_token);
        User.id = item._id;
        User.loginName = item.login_name;
        User.avatarUrl = item.avatar_url;
        User.repos = item.repos;
        onUserFound(null, User);
        db.close();
      });
    });
  });
};
