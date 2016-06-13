/* global game */

var RemotePlayer = function (index, player, startX, startY) {
  var x = startX
  var y = startY
  this.health = 3
  this.alive = true
  this.lastPosition = { x: x, y: y }
}

RemotePlayer.prototype.update = function () {
  //if (this.player.x !== this.lastPosition.x || this.player.y !== this.lastPosition.y) {
    //this.player.play('move')
    //this.player.rotation = Math.PI + game.physics.arcade.angleToXY(this.player, this.lastPosition.x, this.lastPosition.y)
  //} else {
    //this.player.play('stop')
  //}

  this.lastPosition.x = this.player.x
  this.lastPosition.y = this.player.y
}

window.RemotePlayer = RemotePlayer
