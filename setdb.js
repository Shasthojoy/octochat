var octodb = require('./lib/octodb.js');

octodb.connectToDb(function(err, db) {
  if (err) throw err;
  db.collection('users', { strict: true }, function(err, collection) {
    if (!err) {
      console.log('users exists!');
      db.close();
      return;
    }
    db.collection('users', function(err, collection) {
      console.log('Initializing users collection...');
      console.log('Setting token uniqueness');
      var keys = { access_token: 1 };
      var params = { unique: true };
      collection.ensureIndex(keys, params, function(err, replies) {
        collection.insert({ access_token: 'TOKEN' }, function(err, result) {
          console.log('Inserted ' + JSON.stringify(result));
          db.close();
        });
      });
    });
  });
});
