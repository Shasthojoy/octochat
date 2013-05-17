#! /usr/bin/env node

var express = require('express');
var app = express();
var settings = require('./settings.js').loadSettings();

app.use(express.static(__dirname + '/assets'));

app.get('/submittoken', function(req, res) {
  if (req.query.error)
    res.send('error');
  else {
    var OAuth = require('oauth');
    var OAuth2 = OAuth.OAuth2;
    var oauth2 = new OAuth2('cf150584080448a4c1d7',
      'a5068d6edc24cd23c4fa19cf12689952995f5da4',
      'https://github.com',
      '/login/oauth/authorize',
      '/login/oauth/access_token',
      null);
    oauth2.getOAuthAccessToken(req.query.code, null,
      function(e, access_token, refresh_token, results) {
        if(e) {
          res.send(e);
          return;
        }
        res.send('bearer: ' + access_token);
    });
  }
});

app.listen(settings.port);
console.log('Listening on port ' + settings.port);
