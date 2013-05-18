#! /usr/bin/env node

var octodb = require('./lib/octodb.js');

octodb.connectToDb(function(err, db) {
  if (err) throw err;
  db.collection('users', { strict: true }, function(err, collection) {
    if (!err) return;
    db.collection('users', function(err, collection) {
      console.log('Initializing users collection...');
      collection.insert({ access_token: 'TOKEN' }, function(err, result) {
        console.log('Inserted ' + JSON.stringify(result));
        db.close();
      });
    });
  });
});
