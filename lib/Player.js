/* ************************************************
** GAME PLAYER CLASS
************************************************ */
var Player = function (startX, startY, startName) {
  var name = name;
  var round = 0;
  var score = 0;
  var x = startX;
  var y = startY;
  var id;

  // Getters and setters
  var getName = function () {
    return name;
  }

  var getRound = function () {
    return round;
  }

  var getScore = function () {
    return score;
  }


  var setName = function (newName) {
    name = newName;
  }

  var setRound = function () {
    round++;
  }

  var setScore = function (newScore) {
    score = newScore;
  }

  var getX = function () {
    return x;
  }

  var getY = function () {
    return y;
  }

  var setX = function (newX) {
    x = newX;
  }

  var setY = function (newY) {
    y = newY;
  }

  // Define which variables and methods can be accessed
  return {
    getName: getName,
    getRound: getRound,
    setName: setName,
    setRound: setRound,
    getScore: getScore,
    setScore: setScore,
    
    getX: getX,
    getY: getY,
    setX: setX,
    setY: setY,
    id: id
  }
}

// Export the Player class so you can use it in
// other files by using require("Player")
module.exports = Player
