// initializing db
require('./setdb.js');

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var settings = require('./settings.js').loadSettings();
var RedisStore = require('connect-redis')(express);

var UserController = require('./lib/user_controller.js');
var RoomController = require('./lib/room_controller.js');

app.use(express.static(settings.staticfolder));
app.use(express.cookieParser());
var redisUrl = require('url').parse(settings.redisurl);
app.use(express.session({
  secret: settings.secret,
  store: new RedisStore({
    host: redisUrl.hostname,
    port: redisUrl.port,
    pass: redisUrl.auth ? redisUrl.auth.split(':')[1] : undefined,
    prefix: 'session'
  })
}));
app.set('views', settings.viewsfolder);
app.set('view engine', 'ejs');

var authenticateRequest = function(req, res, next) {
  if (!req.session.userid) res.render('index');
  else next();
};

app.get('/', function(req, res) {
  res.redirect('/chat');
});
app.get('/errorpage', function(req, res) {
  res.render('errorpage');
});
app.get('/chat', authenticateRequest, function(req, res) {
  res.render('chatpage');
});

app.get('/submittoken', UserController.grantAccess);
app.get('/logout', authenticateRequest, UserController.performLogout);
app.get('/user', authenticateRequest, UserController.getUser);
app.put('/user', authenticateRequest, UserController.updateUser);

app.post('/room/:id', authenticateRequest, RoomController.addRoom);
app.delete('/room/:id', authenticateRequest, RoomController.removeRoom);

server.listen(settings.port);
console.log('Listening on port ' + settings.port);
