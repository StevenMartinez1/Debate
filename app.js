const express = require('express');
const app = express();
const path = require('path');
var http = require('http')
var server = http.createServer(app);
const io = require('socket.io')(server);
const users = require('./static/users.js');
const moment = require('moment');


app.use(express.static(path.join(__dirname, 'public')));
app.use("/static", express.static('./static/'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket){
  socket.on('newUser', function(data){
    console.log("New User: ", data.name);
    users.addUser(socket.id, data.name);
    socket.emit('newUserID', socket.id);
  });

  socket.on('sendMessageToServer', function(data){
    var sentTime = moment().format('LT');
    messageData = {
      name: data.name,
      message: data.message,
      id: socket.id,
      time: sentTime
    };
    console.log(messageData);
    socket.emit('sendMessageToUsers', messageData );
    socket.broadcast.emit('sendMessageToUsers', messageData );
  });



  socket.on('disconnect', function(){
    console.log('Disconnecting');
    users.removeUser(socket.id);
  });

});


server.listen(3000);
