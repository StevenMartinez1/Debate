
var name = prompt("What is your name?");
var socket = io();

socket.emit("newUser", {name});

document.getElementById('form-submit-button').addEventListener("click", function(event) {
  event.preventDefault();
});
