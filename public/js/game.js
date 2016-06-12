/* global RemotePlayer io */


var socket; // Socket connection
var player;
var enemies;

function create () {
  socket = io.connect();

  // The base of our player
  var startX = Math.round(Math.random() * (1000) - 500);
  var startY = Math.round(Math.random() * (1000) - 500);
  player = { name:'dude', round: 0 , score:0};
 
  // Create some baddies to waste :)
  enemies = [];
  // Start listening for events
  setEventHandlers();
}

var setEventHandlers = function () {
  // Socket connection successful
  socket.on('connect', onSocketConnected);

  // Socket disconnection
  socket.on('disconnect', onSocketDisconnect);

  // New player message received;
  socket.on('new player', onNewPlayer);

  // Player move message received
  socket.on('move player', onMovePlayer);

  // Player removed message received
  socket.on('remove player', onRemovePlayer);

  socket.on('msg', onMessage);
}

// Socket connected
function onSocketConnected () {
  console.log('Connected to socket server');
  enemies = [];
  // Send local player data to the game server
  socket.emit('new player', { round: player.round, score: player.score, name: player.name});
}

// Socket disconnected
function onSocketDisconnect () {
  console.log('Disconnected from socket server')
}

// New player
function onNewPlayer (data) {
  console.log('New player connected:', data.name)

  // Avoid possible duplicate players
  var duplicate = playerById(data.id)
  if (duplicate) {
    console.log('Duplicate player!')
    return
  }

  // Add new player to the remote players array
  enemies.push(new RemotePlayer(data.id, player, data.x, data.y))
}

// Move player
function onMovePlayer (data) {
  var movePlayer = playerById(data.id)

  // Player not found
  if (!movePlayer) {
    console.log('Player not found: ', data.id)
    return
  }

  // Update player position
  movePlayer.player.x = data.x
  movePlayer.player.y = data.y
}

// Remove player
function onRemovePlayer (data) {
  var removePlayer = playerById(data.id)

  // Player not found
  if (!removePlayer) {
    console.log('Player not found: ', data.id)
    return
  }

  removePlayer.player.kill()

  // Remove player from array
  enemies.splice(enemies.indexOf(removePlayer), 1)
}

function update () {
  
}

function render () {

}

// Find player by ID
function playerById (id) {
  for (var i = 0; i < enemies.length; i++) {
    if (enemies[i].player.name === id) {
      return enemies[i]
    }
  }

  return false
}

function onMessage(text) {
  var list = document.getElementById('chat');
  var el = document.createElement('li');
  el.innerHTML = text;
  list.appendChild(el);
}

var from = document.getElementById('chat-form');
from.addEventListener('submit', function(e){
  var input = document.getElementById('chat-input');
  var value = input.value;
  input.value = '';
  onMessage(value);
  socket.emit('msg', value);
  e.preventDefault();

});

create();












