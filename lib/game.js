var util = require('util')
var http = require('http')
var path = require('path')
var ecstatic = require('ecstatic')
var io = require('socket.io')


var RpsGame = require('./RpsGame');
var port = process.env.PORT || 8080

/* ************************************************
** GAME VARIABLES
************************************************ */
var socket;	// Socket controller
var waitingPlayer;
/* ************************************************
** GAME INITIALISATION
************************************************ */

// Create and start the http server
var server = http.createServer(
  ecstatic({ root: path.resolve(__dirname, '../public') })
).listen(port, function (err) {
  if (err) {
    throw err
  }

  init()
})

function init () {
 
  // Attach Socket.IO to server
  socket = io.listen(server)

  // Start listening for events
  setEventHandlers()
}

/* ************************************************
** GAME EVENT HANDLERS
************************************************ */
var setEventHandlers = function () {
  // Socket.IO
  socket.sockets.on('connection', onSocketConnection)
}

// New socket connection
function onSocketConnection (client) {
  util.log('New player has connected: ' + client.id)

  // Listen for client disconnected
  client.on('disconnect', onClientDisconnect)

  // Listen for new player message
  //client.on('new player', onNewPlayer)

  // Listen for move player message
  //client.on('move player', onMovePlayer);

  //Listen for chat 
  client.on('msg', function(txt) {
      socket.sockets.emit('msg', txt);
  });

  //client.on('turn', function(turn) {
    //console.log(turn);
  //});
  //console.log(socket.sockets);
  if(waitingPlayer) {
    //Match starts
    //this.emit('msg', 'Match starts!');
   // waitingPlayer.emit('msg', 'Match starts!');
   new RpsGame(waitingPlayer, client);
   
    waitingPlayer = null;
  } else {
    waitingPlayer = client;
    this.emit('msg', 'You are waiting for a second player.')
  }
}

// Socket client has disconnected
function onClientDisconnect () {
  util.log('Player has disconnected: ' + this.id)

 // var removePlayer = playerById(this.id)

  // Player not found
  //if (!removePlayer) {
   // util.log('Player not found: ' + this.id)
   // return
  //}

  // Remove player from players array
  //players.splice(players.indexOf(removePlayer), 1)

  // Broadcast removed player to connected socket clients
 // this.broadcast.emit('remove player', {id: this.id})
}

// New player has joined
function onNewPlayer (data) {
  // Create a new player
  
}

// Player has moved
function onMovePlayer (data) {
  // Find player in array
}

/* ************************************************
** GAME HELPER FUNCTIONS
************************************************ */
// Find player by ID
function playerById (id) {
  var i
  for (i = 0; i < players.length; i++) {
    if (players[i].id === id) {
      return players[i]
    }
  }

  return false
}
