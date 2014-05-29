
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
}