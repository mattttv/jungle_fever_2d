var sprite;
var player;
var sp2;
var people;
var cursors;
var upKey, downKey, leftKey, rightKey;

var drvoodo;
var plants;
var cursors;


window.onload = function() {

	var game = new Phaser.Game(
			400,300,
			// window.innerWidth, window.innerHeight,
			Phaser.CANVAS, 
			'drvoodo', 
			{ preload: preload, create: create, update: update, render: render });

	
	function preload() {
        game.load.image('drvoodo', 'resources/pineapple.png');
        game.load.image('baddie', 'resources/mushroom.png');
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

	    game.physics.startSystem(Phaser.Physics.ARCADE);

	    plants = game.add.group();
	    plants.enableBody = true;



	    for (var i = 0; i < 5; i++)
	    {
	        var s = plants.create(
	        		game.world.randomX, game.world.randomY, 
	        		'baddie');
	        s.body.collideWorldBounds = true;
	        s.body.bounce.set(1);
	        // s.body.velocity.setTo(10 + Math.random() * 40, 10 + Math.random() * 40);
	    }

	    drvoodo = game.add.sprite(game.world.randomX, game.world.randomY, 'drvoodo');

	    game.physics.enable(drvoodo, Phaser.Physics.ARCADE);

	    drvoodo.body.collideWorldBounds = true;
	    drvoodo.body.bounce.set(1);

	    cursors = game.input.keyboard.createCursorKeys();

	}

	function update() {

	    game.physics.arcade.collide(drvoodo, plants);

	    doGameController(game, cursors);
	    


	}

	function render() {

// 	    game.debug.quadTree(game.physics.arcade.quadTree);

	}




function setup_player(){
    

        player   = game.add.sprite(32, 0.5, 'dude');

        //  Our two animations, walking left and right.
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);

        player.animations.add('down', [4], 10, true);    
    
}    
    };

