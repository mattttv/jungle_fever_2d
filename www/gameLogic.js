function doAttackPlayerLogic() {
  //TODO del
  debugPrint("attack log");
  
  player.rangex = 70;
  player.rangey = 60;
  
  if (debugOutput) {
  	var thickness = 2;
  }

  var marker = game.add.graphics();
  marker.lineStyle(thickness, 0x000000, 1);

  //drawRect(100, 100, 50, 50); // (x, y, w, h) 
  switch(player.last) {
  	case DIRECTION.RIGHT: 
  	marker.drawRect(
      player.x + player.width/2,
      player.y + player.height/2, 
      player.rangex, 
      player.rangey);
  	break;
    case DIRECTION.LEFT: 
    marker.drawRect(
      player.x - player.width/2, //x
      player.y + player.height/2, //y
      player.rangex, //w
      player.rangey); //h
    break;
    case DIRECTION.DOWN: 
    marker.drawRect(
      player.x, //x
      player.y + player.height, //y
      player.rangey, //w
      player.rangex); //h
    break;
    case DIRECTION.UP: 
    marker.drawRect(
      player.x, //x
      player.y - player.height/2 + 25, //ugly i know
      player.rangey, //w
      player.rangex); //h
    break;
  }
  doAttackOverlapWithPlayer(marker);
}


function doAttackOverlapWithPlayer(marker) {

  //marker.destroy();
	/*
	game.physics.arcade.overlap(player, , function(o1,o2) {
		console.log(o2.plant_tag);
    	o2.destroy();
    	// TODO : put into player's inventory
		
	});
*/
return true;
debugPrint("saufst du js?");
}
