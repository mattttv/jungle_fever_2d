/*
 * Big Bunch of Globals:
 */
var player;
var people;
var cursors;
var upKey, downKey, leftKey, rightKey;

var plants;
var cursors;


/*
 * Main
 */
window.onload = function() {

	var game = new Phaser.Game(
			400,300,
			// window.innerWidth, window.innerHeight,
			Phaser.CANVAS, 
			'Jungle Fever 2.0 - Dr. Voodo returns', 
			{ preload: preload, create: create, update: update, render: render });

	
	function preload() {
        game.load.image('drvoodo', 'resources/pineapple.png');
        game.load.image('baddie', 'resources/mushroom.png');
        game.load.spritesheet('dude', 'dude.png', 32, 48);
	}


    function create () {
        setup_player(game, player);

	    game.physics.startSystem(Phaser.Physics.ARCADE);

	    setUpDemoPlants(game);

	    game.physics.enable(player, Phaser.Physics.ARCADE);

	    player.body.collideWorldBounds = true;
	    player.body.bounce.set(1);

	    cursors = game.input.keyboard.createCursorKeys();

	}

	function update() {

		
	    doGameController(game, cursors);
	    

	    doUpdates(game);
	    
//	    game.physics.arcade.ovelap(player, plants, function() {
//			consolo.log("Collide !")
//		});

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

