const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const passport = require('passport');
const session = require('express-session');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

require('./config/db');
require('./config/passport');

app.use('/', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.engine('html', handlebars({
  extname: 'html',
  defaultLayout: 'default',
  layoutsDir: app.get('views') + '/layouts',
  partialsDir: app.get('views') + '/partials'
}));
app.set('view engine', 'html');

app.use(session({
  secret: process.env.SESSION_SECRET || 'GernBlanston',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(require('./util').attachUser);

app.use(require('./routes/app.js'));
app.use(require('./routes/auth.js'));
app.use(require('./routes/errors.js'));

io.on('connection', socket => require('./routes/io.js')(io, socket));

http.listen(app.get('port'));