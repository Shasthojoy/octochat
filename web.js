#! /usr/bin/env node

var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.send('hello world');
});

var appPort = process.env.PORT || 3000;
app.listen(appPort);
console.log('Listening on port ' + appPort);
