
function doGameController(game, cursors) {
	
    if (cursors.left.isDown)
    {
        drvoodo.body.velocity.x -= 4;
    }
    else if (cursors.right.isDown)
    {
        drvoodo.body.velocity.x += 4;
    }

    if (cursors.up.isDown)
    {
        drvoodo.body.velocity.y -= 4;
    }
    else if (cursors.down.isDown)
    {
        drvoodo.body.velocity.y += 4;
    }
}


function gofull(){
        	Phaser.StageScaleMode.EXACT_FIT = 0;
        	game.stage.scale.startFullScreen();
        	alert('full screen');
}
        