function setup_player() {
        player   = game.add.sprite(32, 0.5, 'dude');

        //  Our two animations, walking left and right.
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);

        player.animations.add('down', [4], 10, true);    
    
}    