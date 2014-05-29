
function doGameController() {

	if (upKey.isDown)
		{
			sprite.y--;
                // console.log("down");
        }
    else if (downKey.isDown)
    {
    	sprite.y++;
    }

    if (leftKey.isDown)
    {
    	sprite.x--;
    }
    else if (rightKey.isDown)
    {

    	sprite.x++;
    }
    else if (fullScreenKey.isDown){
    	console.log("full screen");
    	//gofull();
    	requestFullscreen();
    }
}


function gofull(){
        	Phaser.StageScaleMode.EXACT_FIT = 0;
        	game.stage.scale.startFullScreen();
        	alert('full screen');
        }
        