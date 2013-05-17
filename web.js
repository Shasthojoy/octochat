#! /usr/bin/env node

var express = require('express');
var app = express();

app.use(express.static(__dirname + '/assets'));

var appPort = process.env.PORT || 3000;
app.listen(appPort);
console.log('Listening on port ' + appPort);
