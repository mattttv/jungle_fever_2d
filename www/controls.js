
function doGameController(game, cursors) {
	
    if (cursors.left.isDown)
    {
        player.body.velocity.x -= 4;
        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x += 4;
        player.animations.play('right');
    }

    if (cursors.up.isDown)
    {
        player.body.velocity.y -= 4;
        player.animations.play('left');
    }
    else if (cursors.down.isDown)
    {
        player.body.velocity.y += 4;
        player.animations.play('right');
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
    
    
//    // Slow down the player
//    player.velocity*=0.5;
//    if (player.velocity < 0.5) 
//    	plyer.velocity = 0;
}