var sprite;
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
	}



	function create() {

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

};

