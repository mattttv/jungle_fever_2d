/*
 * Big Bunch of Globals:
 */
var player;
var people;
var cursors;
var upKey, downKey, leftKey, rightKey;
var shiftKey;
var dashKey;
//var dust;
var plants;
var cursors;

var game;
var level;

var world;
var playermodel;

var emitter;
var screen_gui;

var map;
var layer;

/*
 * Main
 */
window.onload = function() {

	game = new Phaser.Game(
			GAME_SIZE[0], GAME_SIZE[1],
			// window.innerWidth, window.innerHeight,
			Phaser.CANVAS, 
			'Jungle Fever 2.0 - Dr. Voodo returns', 
			{ preload: preload, create: create, update: update, render: render });
	
	world = new CurrentArea(game);
	playermodel = new PlayerModel(game);
	screen_gui = new HUD(game);

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

        game.load.spritesheet('shooter', 'resources/schießblume.png', 110, 100);

        screen_gui.preload();
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
	    
        //define keys




        screen_gui.create();

	}

	function update() {
	    doGameController(game, cursors);
        
        level.update(player);
	    
	    doUpdates(game);

        screen_gui.update();
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

