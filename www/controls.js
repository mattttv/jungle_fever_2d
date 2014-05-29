
function doGameController(game, cursors) {
	
    if (cursors.left.isDown)
    {
        player.body.velocity.x -= 6;
        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x += 6;
        player.animations.play('right');
    }
    else if (cursors.up.isDown)
    {
        player.body.velocity.y -= 6;
        player.animations.play('left');
    }
    else if (cursors.down.isDown)
    {
        player.body.velocity.y += 6;
        player.animations.play('right');
    } else {
    	player.animations.play('idle');
    }
    // console.log("down");
    
}


function gofull(){
        	Phaser.StageScaleMode.EXACT_FIT = 0;
        	game.stage.scale.startFullScreen();
        	alert('full screen');
}
        





/****
Game Updates
*****/
function doUpdates(game) {

	// Test for overlaps between the player and the group of plants
    game.physics.arcade.overlap(player, plants, function(o1,o2) {
		o2.destroy();
	});
    
    
    // Slow down the player
    // TODO: can this be solved via physics / friction ? 
    player.body.velocity.x = Math.abs(player.body.velocity.x) > 1 ? player.body.velocity.x*0.95 : 0;
    player.body.velocity.y = Math.abs(player.body.velocity.y) > 1 ? player.body.velocity.y*0.95 : 0;
}