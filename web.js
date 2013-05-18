#! /usr/bin/env node

// initializing db
require('./setdb.js');

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
app.engine('html', require('consolidate').mustache);
app.set('views', settings.viewsfolder);
app.set('view engine', 'html');

var sendErrorPage = function(req, res) {
  res.render('errorpage');
};

var authenticateRequest = function(req, res, next) {
  if (!req.session.userid) res.render('index');
  else next();
};

app.get('/', function(req, res) {
  res.redirect('/chat');
});
app.get('/submittoken', UserController.grantAccess);
app.get('/errorpage', sendErrorPage);
app.get('/chat', authenticateRequest, function(req, res) {
  res.render('chatpage');
});
app.get('/logout', UserController.performLogout);

app.listen(settings.port);
console.log('Listening on port ' + settings.port);
