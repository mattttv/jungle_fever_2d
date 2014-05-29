var sprite;
var people;
var cursors;
var upKey, downKey, leftKey, rightKey;
window.onload = function() {

    var game = new Phaser.Game(800, 600, Phaser.AUTO, '', 
      { preload: preload, create: create, update: update  });

    function preload () {

        game.load.image('logo', 'phaser.png');
        game.load.image('ship', 'resources/pineapple.png');
        game.load.image('baddie', 'resources/mushroom.png');


    }

    function create () {
    	
    	
        sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'ship');
        sprite.anchor.setTo(0.5, 0.5);
        
        setUpPhysics(game);

        upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        
        

    }

    function update() {
        doGameController();
    }

};

function setUpPhysics(game) {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    people = game.add.group();
    people.enableBody = true;

    for (var i = 0; i < 50; i++)
    {
        var s = people.create(game.world.randomX, game.world.randomY, 'baddie');
        s.body.collideWorldBounds = true;
        s.body.bounce.set(1);
        s.body.velocity.setTo(10 + Math.random() * 40, 10 + Math.random() * 40);
    }

    game.physics.enable(sprite, Phaser.Physics.ARCADE);
    sprite.body.collideWorldBounds = true;
    sprite.body.bounce.set(1);
}

function render() {

    game.debug.quadTree(game.physics.arcade.quadTree);

}