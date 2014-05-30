
function doGameController(game, cursors) {
	var pspeed = 10;
	var movement_happend = false;
    if (cursors.left.isDown)
    {
        player.body.velocity.x -=pspeed;
        player.animations.play('left');
        player.last = 0;
        movement_happend = true;
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x +=pspeed;
        player.animations.play('right');
        player.last = 1;
        movement_happend = true;
    }
    
    if (cursors.up.isDown)
    {
        player.body.velocity.y -=pspeed;
        player.animations.play('up');
        player.last = 2;
        movement_happend = true;
    }
    else if (cursors.down.isDown)
    {
        player.body.velocity.y +=pspeed;
        player.animations.play('down');
        player.last = 3;
        movement_happend = true;
    } 
    
    /*if (!movement_happend) {
    	switch(player.last) {
        case DIRECTION.LEFT:
            player.animations.play('idleleft');
            break;
        case DIRECTION.RIGHT:
            player.animations.play('idleright');
            break;
        case DIRECTION.UP:
            player.animations.play('idleup');
            break;
        case DIRECTION.DOWN:
            player.animations.play('idledown');
            break;                
        default:
            player.animations.play('idledown');
        }
    }*/
}
        
function doAttack() {
    debugPrint("attack");
    doAttackPlayerLogic();
    switch(player.last) {
        case DIRECTION.LEFT:
            player.animations.play('attack_left');
            break;
        case DIRECTION.RIGHT:
            player.animations.play('attack_right');
            break;
        case DIRECTION.UP:
            player.animations.play('attack_up');
            break;
        case DIRECTION.DOWN:
            player.animations.play('attack_down');
            break;                
        default:
            player.animations.play('attack_down');
        }
}

/****
Game Updates
*****/
function doUpdates(game) {

	world.doUpdates(game);
    
	// Test for overlaps between the player and the group of plants
    // in world object.
    game.physics.arcade.overlap(player, world.sprites['plants'], function(o1,o2) {
		console.log(o2.plant_tag);
    	o2.destroy();
    	// TODO : put into player's inventory
		
	});
    
//    game.physics.arcade.collide(player, world.sprites['people'], function(o1,o2) {
//		//console.log(o2.plant_tag);
//    	//o2.destroy();
//		
//	});
    

    world.sprites['all'].sort('y', Phaser.Group.SORT_ASCENDING);
    
    // Slow down the player
    // TODO: can this be solved via physics / friction ? 
    player.body.velocity.x = Math.abs(player.body.velocity.x) > 1 ? player.body.velocity.x*0.92 : 0;
    player.body.velocity.y = Math.abs(player.body.velocity.y) > 1 ? player.body.velocity.y*0.92 : 0;
}