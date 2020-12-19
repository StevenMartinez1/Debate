
var name = prompt("What is your name?");
var socket = io();
var userID = "";

socket.emit("newUser", {name});
socket.on('newUserID', function(data){
  userID = data;
  console.log('New User ID: ', userID);
});

document.getElementById('form-submit-button').addEventListener("click", function(event) {
  event.preventDefault();
  var message = document.getElementById('send-msg').value
  document.getElementById('send-msg').value = "";

  socket.emit('sendMessageToServer', {message, name});
});

socket.on('sendMessageToUsers', function(data){
  console.log('In sendMessageToUsers: ', name);
  displayMessage(data.name, data.id, data.message, data.time);
});

function displayMessage(name, id, message, time){
  console.log(name);
  console.log(id);
  console.log(message);
  console.log(time);

  var div = "";
  if(id === userID)
  {
    console.log('Sender');
    div = 'sentMessage';
  }
  else
  {
    console.log('Reciever');
    div = 'receivedMessage';
  }

  if(div === 'sentMessage'){
    var ul = document.getElementById('messageList');
    var li = document.createElement('li');
    li.appendChild(document.createTextNode(message));
    li.setAttribute("id", "sentMessage");
    ul.appendChild(li);
  }

  if(div === 'receivedMessage'){
    var ul = document.getElementById('messageList');
    var li = document.createElement('li');
    //li.appendChild(document.createTextNode(name + ': \r\n ' + message));
    li.appendChild(document.createTextNode(name));
    var br = document.createElement("br");
    li.appendChild(document.createTextNode(br));
    li.appendChild(document.createTextNode(message));
    li.setAttribute("id", "receivedMessage");
    ul.appendChild(li);
  }




}
