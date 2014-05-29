
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
        