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

var map;
var layer;


/*
 * Main
 */
window.onload = function() {

	game = new Phaser.Game(
			800,600,
			// window.innerWidth, window.innerHeight,
			Phaser.CANVAS, 
			'Jungle Fever 2.0 - Dr. Voodo returns', 
			{ preload: preload, create: create, update: update, render: render });
	
	world = new CurrentArea(game);
	playermodel = new PlayerModel();
	
	function preload() {
        
        /*game.load.tilemap('map', 'resources/firstGround.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles', 'resources/werfeg.jpg');*/
        
        level = new Level(game);
        level.preload();

        game.load.image('people', 'resources/pineapple.png');
        game.load.image('baddie', 'resources/mushroom.png');
        game.load.spritesheet('girl', 'resources/0000_asdzug.png', 64, 100);
        game.load.audio('village', 'resources/sounds/Jungle_Fever_Village_1v0.mp3');
        game.load.spritesheet('rain', 'resources/rain.png', 17, 17);

	}


    function create () {
        
        /*game.stage.backgroundColor = '#4f5d3e';
        
        map = game.add.tilemap('map');
        map.addTilesetImage('werfeg', 'tiles');
        layer = map.createLayer('ground');
        layer.resizeWorld();*/
        
        level.create();
            
        setup_player(game, player);
        game.camera.follow(player);
        
        music = game.add.audio('village',1,true);
        music.play('',0,1,true);
        
	    // setUpDemoPlants(game);
	    spawnArea(game, world);
	    

	    // enable physics for collision etc.
	    game.physics.startSystem(Phaser.Physics.ARCADE);
	    game.physics.enable(player, Phaser.Physics.ARCADE);

	    player.body.collideWorldBounds = true;
	    player.body.bounce.set(1);

	    cursors = game.input.keyboard.createCursorKeys();

        setupFullScreen();
        
        var emitter = game.add.emitter(game.world.centerX, 0, 400);

        emitter.width = game.world.width;
        // emitter.angle = 30; // uncomment to set an angle for the rain.

        emitter.makeParticles('rain');

        emitter.minParticleScale = 0.1;
        emitter.maxParticleScale = 0.5;

        emitter.setYSpeed(300, 500);
        emitter.setXSpeed(-5, 5);

        emitter.minRotation = 0;
        emitter.maxRotation = 0;

	emitter.start(false, 1600, 5, 0);

	}

	function update() {

		
	    doGameController(game, cursors);
	    

	    doUpdates(game);
	    
	}

	function render() {

// 	    game.debug.quadTree(game.physics.arcade.quadTree);

	}
	function setup_player(){
        player   = game.add.sprite(64, 0.5, 'girl');

        //  Our two animations, walking left and right.
        player.animations.add('up', [0, 4], 8, true);
        player.animations.add('right', [1, 5], 8, true);
        player.animations.add('down', [2, 6], 8, true);
        player.animations.add('left', [3, 7], 8, true);

        player.animations.add('idleup', [0], 10, true);
        player.animations.add('idleright', [1], 10, true);
        player.animations.add('idledown', [2], 10, true);
        player.animations.add('idleleft', [3], 10, true);        
    
}    
 
};

