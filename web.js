#! /usr/bin/env node

var express = require('express');
var app = express();
var settings = require('./settings.js').loadSettings();

app.use(express.static(__dirname + '/assets'));

app.get('/confirmtoken', function(req, res) {
  res.send(req.query);
});

app.listen(settings.port);
console.log('Listening on port ' + settings.port);
