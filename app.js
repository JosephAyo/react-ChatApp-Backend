var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

io.on('connection',(socket)=>{
    console.log('a user connected');
    socket.on('chat',(message)=>{
        console.log('message: '+ message);
        io.emit('message', message);
    });
    socket.on('disconnect', ()=>{
        console.log('user disconnected');
    });

    
socket.on('channel1', (data) => {
    console.log('Greetings from RN app', data);
  })
});



const port = process.env.PORT || 5500;

http.listen(port, () => {
    console.log(`app is listening on port ${port}`);
});
module.exports = app;
