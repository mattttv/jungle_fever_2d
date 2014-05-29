
function doGameController(game, cursors) {
	var movement_happend = false;
    if (cursors.left.isDown)
    {
        player.body.velocity.x -= 6;
        player.animations.play('left');
        player.last = 0;
        movement_happend = true;
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x += 6;
        player.animations.play('right');
        player.last = 1;
        movement_happend = true;
    }
    
    if (cursors.up.isDown)
    {
        player.body.velocity.y -= 6;
        player.animations.play('up');
        player.last = 2;
        movement_happend = true;
    }
    else if (cursors.down.isDown)
    {
        player.body.velocity.y += 6;
        player.animations.play('down');
        player.last = 3;
        movement_happend = true;
    } 
    
    if (!movement_happend) {
    	switch(player.last) {
        case 0:
            player.animations.play('idleleft');
            break;
        case 1:
            player.animations.play('idleright');
            break;
        case 2:
            player.animations.play('idleup');
            break;
        case 3:
            player.animations.play('idledown');
            break;                
        default:
            player.animations.play('idledown');
        }
    }
}
        
function doAttack(player) {
    console.log("attack");
}

/****
Game Updates
*****/
function doUpdates(game) {

    
	// Test for overlaps between the player and the group of plants
    // in world object.
    game.physics.arcade.overlap(player, world.sprites['plants'], function(o1,o2) {
		console.log(o2.plant_tag);
    	o2.destroy();
    	// TODO : put into player's inventory
		
	});
    
    
    // Slow down the player
    // TODO: can this be solved via physics / friction ? 
    player.body.velocity.x = Math.abs(player.body.velocity.x) > 1 ? player.body.velocity.x*0.95 : 0;
    player.body.velocity.y = Math.abs(player.body.velocity.y) > 1 ? player.body.velocity.y*0.95 : 0;
}