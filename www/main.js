var sprite;
var player;
window.onload = function() {

    var game = new Phaser.Game(800, 600, Phaser.AUTO, '', 
      { preload: preload, create: create, update: update  });

    function preload () {

        game.load.image('logo', 'phaser.png');
        game.load.spritesheet('dude', 'dude.png', 32, 48);

    }

    function create () {
       
       // sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
        
        // The player and its settings
        setup_player();
        upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

    }

    function update() {
        doGameController();
    }



function setup_player(){
    

        player   = game.add.sprite(32, 0.5, 'dude');

        //  Our two animations, walking left and right.
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);

        player.animations.add('down', [4], 10, true);    
    
}    
    };