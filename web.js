#! /usr/bin/env node

var express = require('express');
var app = express();
var settings = require('./settings.js').loadSettings();

app.use(express.static(__dirname + '/assets'));

app.get('/submittoken', function(req, res) {
  if (req.query.error)
    res.send('error');
  else {
   var post_data = require('querystring').stringify({
    client_id: 'cf150584080448a4c1d7',
     client_secret: 'a5068d6edc24cd23c4fa19cf12689952995f5da4',
    code: req.query.code
   });
    var post_options = {
      host: 'https://www.github.com',
        path: '/login/oauth/access_token',
        method: 'POST'
    };
    var newreq = require('http').request(post_options, function(newres) {
      newres.on('data', function(chunk) {
        res.send(chunk);
      });
    });
    newreq.write(post_data);
    newreq.end();
  }
});

app.listen(settings.port);
console.log('Listening on port ' + settings.port);
