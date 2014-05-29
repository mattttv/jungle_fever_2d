
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