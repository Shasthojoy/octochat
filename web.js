#! /usr/bin/env node

var express = require('express');
var app = express();
var settings = require('./settings.js').loadSettings();

var UserController = require('./lib/user_controller.js');

app.use(express.static(settings.staticfolder));
app.use(express.cookieParser());
app.use(express.session({
  secret: settings.secret,
  store: new express.session.MemoryStore
}));

var sendErrorPage = function(req, res) {
  res.sendfile(settings.errorpage, 400);
};

app.get('/submittoken', UserController.grantAccess);
app.get('/errorpage', sendErrorPage);
app.get('/chat', function(req, res) {
  res.send('chatpage');
});

app.listen(settings.port);
console.log('Listening on port ' + settings.port);
