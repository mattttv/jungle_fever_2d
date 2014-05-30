DIRECTION = {
    LEFT : 0,
    RIGHT : 1,
    UP : 2,
    DOWN : 3
}

PLAYER_STATE = {
    ATTACKING: 0,
    MOVING: 1,
    PICKUPING: 2
}

function debugPrint(message) {
  var debugOutput = true
  if (debugOutput) {
  	console.log(message);
  }
};