/* ************************************************
** Rock Paper Scissor CLASS
************************************************ */
'use strict';

const P1_WON = 1;
const P2_WON = 2;
const DRAW = 3;

class RpsGame {
  constructor(sock1, sock2) {
    this._players = [sock1, sock2];
    this._turns = [];
    this._initSockets();
  }
  
  _initSockets() {
    let self = this;
    this._players.forEach(function(sock, index){
      sock.emit('msg', 'Match starts!');
      sock.on('turn', function(turn) {
        sock.emit('msg', turn);
        self._turns[index] = turn;
        if(self._turns[0] && self._turns[1]){
          self._onRoundEnd();
        }
        //console.log('Player', index , 'chooses' , turn );
      });
    });
  }

  _onRoundEnd() {
    let text = 'Round ends. Results - ' + this._turns.join(':');
    let p1 = this._players[0];
    let p2 = this._players[1];

    this._players.forEach((sock) => sock.emit('msg', text));
    let result = this._getRoundResult();
    switch (result) {
      case DRAW:
        p1.emit('msg', 'Draw!');
        p2.emit('msg', 'Draw!');
        break;
      case P1_WON: 
        p1.emit('msg', 'You won!');
        p2.emit('msg', 'You lose!');
        break;
      case P2_WON: 
        p1.emit('msg', 'You lose!');
        p2.emit('msg', 'You won!');
        break;
    }
    this._turns = [];
  } 

  _getRoundResult() {
    let t1 = this._decodeTrun(this._turns[0]);
    let t2 = this._decodeTrun(this._turns[1]);

    let dist = (t2 - t1 + 3) % 3;
    switch (dist) {
      case 0:
        return DRAW;
      case 1:
        return P1_WON;
      case 2: 
        return P2_WON;
    }
  }

  _decodeTrun(turn) {
    switch (turn) {
      case 'rock':
        return 0;
      case 'scissor':
        return 1;
      case 'paper': 
        return 2;
    }
  }
}

// Export the Player class so you can use it in
// other files by using require("Player")
module.exports = RpsGame;
