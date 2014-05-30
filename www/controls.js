
function doGameController(game, cursors) {
	var pspeed = 10;
	var movement_happend = false;
    var one_direction = player.last;
    
    if (cursors.left.isDown)
    {
        player.body.velocity.x -= pspeed;        
        one_direction = DIRECTION.LEFT;
        movement_happend = true;
    }
    else if (cursors.right.isDown)
    {

        player.body.velocity.x +=pspeed;
        one_direction = DIRECTION.RIGHT;
        movement_happend = true;
    }
    
    if (cursors.up.isDown)
    {
        
        one_direction = DIRECTION.UP;
        player.body.velocity.y -=pspeed;
        movement_happend = true;
    }
    else if(cursors.down.isDown)
    {

        
        one_direction = DIRECTION.DOWN;
        player.body.velocity.y +=pspeed;
        movement_happend = true;
    } 
    if (!shiftKey.isDown)
        player.last = one_direction;
    
    
    if (player.animations.currentAnim.isFinished)
   
    {
        if(!shiftKey.isDown)
        {    
            if (cursors.up.isDown)
            {

                player.animations.play('up');

            }
            else if(cursors.down.isDown)
            {

                player.animations.play('down');

            } 

            if (!cursors.up.isDown & !cursors.down.isDown)
            {    
                if(cursors.right.isDown)    
                    player.animations.play('right');

                else if( cursors.left.isDown)
                    player.animations.play('left');
            }
        }    
        else if(cursors.up.isDown || cursors.down.isDown || cursors.left.isDown || cursors.right.isDown ){
            switch(player.last) {
                case DIRECTION.LEFT:
                    player.animations.play('left');
                    break;
                case DIRECTION.RIGHT:
                    player.animations.play('right');
                    break;
                case DIRECTION.UP:
                    player.animations.play('up');
                    break;
                case DIRECTION.DOWN:
                    player.animations.play('down');
                    break;                
                default:
                    player.animations.play('down');
            }
        }
        

        player.attack_happened = false;
        lastanim_blocked = false;
    }
    
    if ( ! movement_happend) {
    	//player.body.velocity.x = 0;
        //player.body.velocity.y = 0;	
    }

}
        
function doAttack() {
    debugPrint("attack");
    doAttackPlayerLogic();
    player.attack_happened = true;
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
    	o2.destroy();
    	console.log("Picked up " + o2.plant_tag);
    	game.playermodel.addPlant(o2.plant_tag);
	});

    game.physics.arcade.overlap(player, world.sprites['people'], function(plr, pers) {
    	plr.worldEntity.healPerson(pers.worldEntity);
	});
    
    
    // DEMO : kick things around
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