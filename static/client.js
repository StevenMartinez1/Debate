
var name = prompt("What is your name?");
if (name === '' || name === null){
  name = 'Anonymous Debater';
}
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

  var div = "";
  if(id === userID){
    div = 'sentMessage';
  }
  else{
    div = 'receivedMessage';
  }

  var ul = document.getElementById('messageList');
  var li = document.createElement('li');
  var metadataDiv = document.createElement('div');

  metadataDiv.innerHTML = '<span id="messageName">' + name + '</span> <span id="messageTime">' + time + '</span>';

  li.appendChild(metadataDiv);
  ul.appendChild(li);
  li = document.createElement('li');
  li.appendChild(document.createTextNode(message));

  if(div === 'sentMessage'){
    li.setAttribute("id", "sentMessage");
  }
  else{
    li.setAttribute("id", "receivedMessage");
  }
  ul.appendChild(li);

  window.scrollTo(0,document.body.scrollHeight);
















}
