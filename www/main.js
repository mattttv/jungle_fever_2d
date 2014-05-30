/*
 * Big Bunch of Globals:
 */
var player;
var people;
var cursors;
var upKey, downKey, leftKey, rightKey;

var plants;
var cursors;

var game;
var level;

var world;
var playermodel;

var debugOutput = true;
var debugCamera = false;
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
	playermodel = new PlayerModel();
	screen_gui = new HUD(game);

	// Attach the "worldmodel" to the game (for easy retrieval).
	// (game.world is the internal phaser.io world, this one is for the
	// 'behind the scenes' model.
    game.worldmodel = world;

	function preload() {
        
        /*game.load.tilemap('map', 'resources/firstGround.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles', 'resources/werfeg.jpg');*/
        
        level = new Level(game);
        level.preload();

        game.load.image('people', 'resources/pineapple.png');
        game.load.image('baddie', 'resources/weeds.png');
        game.load.spritesheet('girl', 'resources/spieler1.png', 64, 100);
        game.load.audio('village', 'resources/sounds/Jungle_Fever_Village_1v0.mp3');
        game.load.spritesheet('rain', 'resources/rain.png', 17, 17);

        screen_gui.preload();
	}


    function create () {

        /*game.stage.backgroundColor = '#4f5d3e';
        
        map = game.add.tilemap('map');
        map.addTilesetImage('werfeg', 'tiles');
        layer = map.createLayer('ground');
        layer.resizeWorld();*/
        
        level.create();
            
        // setup_player(game, player);
        setup_player();
        game.camera.follow(player);
        
        music = game.add.audio('village',1,true);

        if (START_MUSIC) {
        	music.play('',0,1,true);
    	}
        
        game.stage.backgroundColor = '#462';
            
        
	    // setUpDemoPlants(game);
	    spawnArea(game, world);
	    

	    // enable physics for collision etc.
	    game.physics.startSystem(Phaser.Physics.ARCADE);
	    game.physics.enable(player, Phaser.Physics.ARCADE);
	    player.body.collideWorldBounds = true;
	    player.body.bounce.set(1);
	    // reduce player body size - collision happens not as far away ? 
	    player.body.offset.x=20;
	    player.body.offset.y=30;
	    player.body.height-=35;
	    player.body.width-=35;
        

	    cursors = game.input.keyboard.createCursorKeys();

        attackKey = game.input.keyboard.addKey(Phaser.Keyboard.X);
        attackKey.onDown.add(doAttack, this);

        setupFullScreen();
        
        emitter = game.add.emitter(game.world.centerX, 0, 400);

        emitter.width = game.world.width;
        // emitter.angle = 30; // uncomment to set an angle for the rain.

        emitter.makeParticles('rain');

        emitter.minParticleScale = 0.1;
        emitter.maxParticleScale = 0.5;

        emitter.setYSpeed(300, 500);
        emitter.setXSpeed(-5, 5);

        emitter.minRotation = 0;
        emitter.maxRotation = 0;

        if (START_RAIN) {
        	emitter.start(false, 1600, 5, 0);
    	}

        screen_gui.create();

	}

	function update() {
	    doGameController(game, cursors);
	    
	    doUpdates(game);

        screen_gui.update();
	    
	}

	function render() {

        if (debugCamera) {
          game.debug.cameraInfo(game.camera, 32, 32);
          game.debug.spriteCoords(player, 32, 200);
        }
        
		if(RENDER_DEBUG) {
 	    	game.debug.quadTree(game.physics.arcade.quadTree);
 	    }

	}

	function setup_player(){
        player   = game.add.sprite(64, 0.5, 'girl');
        player.last = 2;


        //  Our two animations, walking left and right.
        player.animations.add('up', [0, 4], 8, true);
        player.animations.add('right', [1, 5], 8, true);
        player.animations.add('down', [2, 6], 8, true);
        player.animations.add('left', [3, 7], 8, true);

        player.animations.add('idleup', [0], 10, true);
        player.animations.add('idleright', [1], 10, true);
        player.animations.add('idledown', [2], 10, true);
        player.animations.add('idleleft', [3], 10, true);
        
        player.animations.add('attack_up', [8, 12], 5, true);
        player.animations.add('attack_right', [9, 13], 5, true);
        player.animations.add('attack_down', [10, 14], 5, true);
        player.animations.add('attack_left', [11, 15], 5, true);       
    
	}    
 
};

