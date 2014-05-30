function doAttackPlayerLogic() {
  //TODO del
  debugPrint("attack log");
  
  player.rangex = 50;
  player.rangey = 20;
  
  if (debugOutput) {
  	var thickness = 2;
  }

  var marker = game.add.graphics();
  marker.lineStyle(thickness, 0x000000, 1);

  switch(player.last) {
  	case DIRECTION.RIGHT: 
  	marker.drawRect(player.x, player.y, player.rangex, player.rangey);
  	break;
  }
}


function doAttackOverlapWithPlayer() {
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
