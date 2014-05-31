/*
 * Big Bunch of Globals
    by the way this works suprisingly well without globals and i dont know why?
 */
var player;
var game;
var world;
var playermodel;
var gui;
var map;

//var layer;
//var people;

//var shiftKey;
//var dashKey;
//var dust;
//var plants;
//var cursors;
//var level;
//var emitter;

// Global source of normally distributed random numbers
var gaussRand;

/*
 * Main
 */
window.onload = function() {

	game = new Phaser.Game(
			GAME_SIZE[0], GAME_SIZE[1],
			Phaser.CANVAS, 
			'Jungle Fever 2.0 - Dr. Voodo returns', 
			{ preload: preload, create: create, update: update, render: render });
	world = new CurrentArea(game);
	playermodel = new PlayerModel(game);
	gui = new GUI(game);
	
	gaussRand = new GaussianNoise();
	
	function preload() {
        
        level = new Level(game);
        level.preload();

        game.load.image('people', 'resources/pineapple.png');
        game.load.image('baddie', 'resources/weeds.png');
        game.load.image('enemie', 'resources/pineapple.png');
        game.load.spritesheet('girl', 'resources/spieler1.png', 64, 100);
        game.load.audio('village', 'resources/sounds/Jungle_Fever_Village_1v0.mp3');
        game.load.spritesheet('rain', 'resources/rain.png', 17, 17);
        game.load.spritesheet('dust', 'resources/dust.png', 17, 17);
        game.load.spritesheet('villageguy', 'resources/people.png', 64, 80);

        
        // plant-sources - plant stuff to pick up
        game.load.image('pltsrc1', 'resources/weeds.png');
        game.load.image('pltsrc2', 'resources/s2.png');
        game.load.image('pltsrc3', 'resources/wnd.png');
        game.load.spritesheet('shooter', 'resources/schiessblume1.png', 110, 100);

        gui.preload();
	}


    function create () {
        
        level.create();

        //setup.js
        setupPlayer();
        setupMusic();
        setupPhysics();
        setupFullScreen();
        setupKeys();

        if (START_RAIN) {
            setupAndStartRain();
        }
	    // setUpDemoPlants(game);
	    spawnArea(game, world);

        gui.create();


	}

	function update() {
        doGameController(game, cursors);
        
        level.update(player);
        
        doUpdates(game); //what is called here? worldmodel or controls?

        gui.update();
	}

	function render() {

        if (DEBUGCAMERA) {
          game.debug.cameraInfo(game.camera, 32, 32);
          game.debug.spriteCoords(player, 32, 200);
        }
        
		if(RENDER_DEBUG) {
 	    	game.debug.quadTree(game.physics.arcade.quadTree);
 	    }

	}

 
};

