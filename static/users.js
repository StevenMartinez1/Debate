module.exports = {addUser, removeUser};

users = [];

function addUser(socketID, name){

  user = {
    ID: socketID,
    name: name
  };

  users.push(user);

  console.log(user.name);
  console.log(user.ID);
}

function removeUser(socketID){

  for(var i = 0; i < users.length; i++)
  {
    if(users[i].ID == socketID)
    {
      console.log('Remove');
      users.splice(i,1);
    }
  }

  console.log('Current Users: ');
  console.log(users);

}
