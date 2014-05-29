var sprite;
window.onload = function() {

    var game = new Phaser.Game(800, 600, Phaser.AUTO, '', 
      { preload: preload, create: create, update: update  });

    function preload () {

        game.load.image('logo', 'phaser.png');

    }

    function create () {
       
        sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
        sprite.anchor.setTo(0.5, 0.5);

        upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

    }

    function update() {
        doGameController();
    }

};