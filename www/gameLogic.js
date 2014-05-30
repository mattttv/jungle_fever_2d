
var markerRect;
function doAttackPlayerLogic() {
  //TODO del
  debugPrint("attack log");
  
  player.rangex = 70;
  player.rangey = 60;
  player.damage = 10;
  var thickness = 0;
  
  if (debugOutput) {
  	thickness = 2;
  }

  var markerX;
  var markerY;
  var markerW; 
  var markerH; 

  marker = game.add.graphics();
  marker.lineStyle(thickness, 0x000000, 1);

  //drawRect(100, 100, 50, 50); // (x, y, w, h) 
  switch(player.last) {
  	case DIRECTION.RIGHT: 
    markerX = player.x + player.width/2;
    markerY = player.y + player.height/2;
    markerW = player.rangex;
    markerH = player.rangey;
  	break;
    case DIRECTION.LEFT: 
    markerX = player.x - player.width/2;
    markerY = player.y + player.height/2;
    markerW = player.rangex;
    markerH = player.rangey;
    break;
    case DIRECTION.DOWN: 
    markerX = player.x;
    markerY = player.y + player.height;
    markerW = player.rangey;
    markerH = player.rangex;
    break;
    case DIRECTION.UP: 
    markerX = player.x;
    markerY = player.y - player.height/2 + 25;
    markerW = player.rangey;
    markerH = player.rangex;
    break;
  }
  marker.drawRect(
      markerX, //x
      markerY,
      markerW,
      markerH); //h

  /*markerRect = Phaser.Rectangle(
    markerX,
    markerY, 
    markerW, 
    markerH);*/
  
  //debugPrint(markerRect.centerX);
  doAttackOverlapWithPlayer(
    markerX,
    markerY, 
    markerW, 
    markerH);
}

function doAttackOverlapWithPlayer(markerX,markerY,markerW,markerH) {
  var sprites = world.sprites['sprites'];
  debugPrint("number of sprites: " + world.sprites['plants'].length);
  var plantX = 0;
  var plantY = 0;
  debugPrint("hitbox: markerX: " + markerX + 
    " markerY " + markerY +
    " markerW " + markerW +
    " markerH " + markerH);
  for (var i = 0; i < 15; i++)
    {
      plantX = world.sprites['plants'].getAt(i).x;
      plantY = world.sprites['plants'].getAt(i).y;
      debugPrint(world.sprites['plants'].getAt(i).id+ " plantx: "+plantX + 
        " planty: " + plantY);
      if (plantX >= markerX && 
         plantX <= markerX + markerW &&
         plantY >= markerY &&
         plantY <= markerY + markerH) {
        debugPrint("plant in range "+world.sprites['plants'].getAt(i).id)
      }
    }  
  /*
  game.physics.arcade.overlap(marker, world.sprites['people'], function(o1,o2) {
      debugPrint("player hits plant");
      o2.worldEntity.hp -= (player.damage);
    }
  );  
  //marker.destroy();
  */
}
