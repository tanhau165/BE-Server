const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const app = express();
const http = require('http');
const server = http.createServer(app);

const { onConnection, englishVocabularyQuestion } = require("./socket");
const io = require('socket.io')(server);
const session = require('express-session');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
// Tell express to serve static files from the following directories
// app.use(express.static('public'));
app.use(session({secret: "Shh, its a secret!"}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);

io.on("connection", onConnection(io));
setInterval(englishVocabularyQuestion(io) , 1000);

server.listen(process.env.PORT || '3000');

module.exports = app;