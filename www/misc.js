DIRECTION = {
    UP : 0,
    DOWN : 1,
    RIGHT : 2,
    LEFT : 3
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