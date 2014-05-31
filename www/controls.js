
function doGameController(game, cursors) {
	var pspeed = 10;
	var movement_happend = false;
    var one_direction = player.last;
    
    if (!player.animations.currentAnim.isFinished)
    {


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
        {
            player.last = one_direction;
        }
    }

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

            //TODO i changed & to &&, is that correct?
            if (!cursors.up.isDown && !cursors.down.isDown)
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

function doDash() {
    var pspeed = game.playermodel.dashSpeed;
    debugPrint("dash");
    doAttackPlayerLogic();
    player.attack_happened = true;
    
    if (player.last == DIRECTION.RIGHT)
        dust = game.add.emitter(player.body.x-player.body.width/2+40, player.body.y-player.body.height/2+60, 50);
    else if (player.last == DIRECTION.LEFT)
        dust = game.add.emitter(player.body.x-player.body.width/2, player.body.y-player.body.height/2+60, 50);
    else
        dust = game.add.emitter(player.body.x-player.body.width/2+12, player.body.y-player.body.height/2+25, 50);
    dust.width = 0;
    

    dust.makeParticles('dust');

    dust.minParticleScale = 0.1;
    dust.maxParticleScale = 0.5;

    dust.minRotation = 0;
    dust.maxRotation = 0;
    
    switch(player.last) {
        case DIRECTION.LEFT:
        player.animations.play('attack_left');
        player.body.velocity.x -= pspeed;
        dust.setXSpeed(10, 100);
        dust.setYSpeed(-40, 5);
        break;
        case DIRECTION.RIGHT:
        player.animations.play('attack_right');
        player.body.velocity.x += pspeed;
        dust.setXSpeed(-10, -100);
        dust.setYSpeed(-40, 5);
        break;
        case DIRECTION.UP:
        player.animations.play('attack_up');
        player.body.velocity.y -=pspeed;
        dust.setYSpeed(10, 100);
        dust.setXSpeed(-30, 30);
        break;
        case DIRECTION.DOWN:
        player.animations.play('attack_down');
        player.body.velocity.y +=pspeed;
        dust.setYSpeed(-30, -150);
        dust.setXSpeed(-30, 30);
        break;                
        default:
        player.animations.play('attack_down');
    }
    
    //debugPrint(dust);
    dust.start(true, 300, 30, 50);
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
    	debugPrint("Picked up " + o2.plant_tag);
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