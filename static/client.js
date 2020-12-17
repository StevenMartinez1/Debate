
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
  displayMessage(data.name, data.id, data.message);
});

function displayMessage(name, id, message){
  console.log(name);
  console.log(id);
  console.log(message);

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








}
