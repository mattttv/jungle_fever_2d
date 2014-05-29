var sprite;
var sp2;
var people;
var cursors;
var upKey, downKey, leftKey, rightKey;
window.onload = function() {

	var game = new Phaser.Game(window.innerWidth, window.innerHeight,
			Phaser.CANVAS, 
			'drvoodo', 
			{ preload: preload, create: create, update: update, render: render });

	
	function preload() {
        game.load.image('drvoodo', 'resources/pineapple.png');
        game.load.image('baddie', 'resources/mushroom.png');
	}

	var drvoodo;
	var plants;
	var cursors;

	function create() {

	    game.physics.startSystem(Phaser.Physics.ARCADE);

	    plants = game.add.group();
	    plants.enableBody = true;


	    for (var i = 0; i < 50; i++)
	    {
	        var s = plants.create(game.world.randomX, game.world.randomY, 'baddie');
	        s.body.collideWorldBounds = true;
	        s.body.bounce.set(1);
	        // s.body.velocity.setTo(10 + Math.random() * 40, 10 + Math.random() * 40);
	    }

	    drvoodo = game.add.sprite(400, 400, 'drvoodo');

	    game.physics.enable(drvoodo, Phaser.Physics.ARCADE);

	    drvoodo.body.collideWorldBounds = true;
	    drvoodo.body.bounce.set(1);

	    cursors = game.input.keyboard.createCursorKeys();

	}

	function update() {

	    game.physics.arcade.collide(drvoodo, plants);

	    if (cursors.left.isDown)
	    {
	        drvoodo.body.velocity.x -= 4;
	    }
	    else if (cursors.right.isDown)
	    {
	        drvoodo.body.velocity.x += 4;
	    }

	    if (cursors.up.isDown)
	    {
	        drvoodo.body.velocity.y -= 4;
	    }
	    else if (cursors.down.isDown)
	    {
	        drvoodo.body.velocity.y += 4;
	    }

	}

	function render() {

// 	    game.debug.quadTree(game.physics.arcade.quadTree);

	}

};

