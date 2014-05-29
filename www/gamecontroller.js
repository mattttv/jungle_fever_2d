
function doGameController() {

			if (upKey.isDown)
            {
                player.y--;
                // console.log("down");
                player.animations.play('left');
            }
            else if (downKey.isDown)
            {
                player.y++;
                player.animations.play('right');
            }

            if (leftKey.isDown)
            {
                player.x--;
                player.animations.play('left');
            }
            else if (rightKey.isDown)
            {
                player.x++;
                player.animations.play('right');
            }
}



function gofull(){
        	Phaser.StageScaleMode.EXACT_FIT = 0;
        	game.stage.scale.startFullScreen();
        	alert('full screen');
        }
        

