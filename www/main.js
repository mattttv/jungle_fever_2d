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
        
        /*game.load.tilemap('map', 'resources/firstGround.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles', 'resources/werfeg.jpg');*/
        
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
        
        //define keys
	    cursors = game.input.keyboard.createCursorKeys();
        attackKey = game.input.keyboard.addKey(Phaser.Keyboard.X);
        attackKey.onDown.add(doAttack, this);
        
        shiftKey = game.input.keyboard.addKey(Phaser.Keyboard.C);
        
        dashKey = game.input.keyboard.addKey(Phaser.Keyboard.V);
        dashKey.onDown.add(doDash, this);

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
        
        player.animations.play('down');

        if (START_RAIN) {
        	emitter.start(false, 1600, 5, 0);
    	}

        screen_gui.create();

	}

	function update() {
	    doGameController(game, cursors);
        
        // game.physics.collide(player, level.layer[2]);
        game.physics.arcade.TILE_BIAS = 40;
	    
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

	function setup_player(){
        player   = game.add.sprite(64, 0.5, 'girl');
        player.attack_happened = false;
        player.last = DIRECTION.DOWN;
        player.state = PLAYER_STATE.IDLE
        
        player.animations.add('up', [4, 0], 8, false);
        player.animations.add('right', [5, 1], 8, false);
        player.animations.add('down', [6, 2], 8, false);
        player.animations.add('left', [7, 3], 8, false);

        player.animations.add('idleup', [0], 10, true);
        player.animations.add('idleright', [1], 10, true);
        player.animations.add('idledown', [2], 10, true);
        player.animations.add('idleleft', [3], 10, true); 
        
        player.animations.add('attack_up', [12, 8], 5, false);
        player.animations.add('attack_right', [13, 9], 5, false);
        player.animations.add('attack_down', [14, 10], 5, false);
        player.animations.add('attack_left', [15, 11], 5, false);
        
        player.worldEntity = playermodel;
    
	}    
 
};

