

/**
 * set up a world area
 * @param game
 * @param world
 */
function spawnArea(game, world) {
	world.init(game);

	spawnPlants(game, world);

    world.sprites['enemies'] = game.add.group();
    world.sprites['enemies'].enableBody = true;
    for (i = 0; i < ENEMY_AMOUNT; i++)
    {
        var e = world.sprites['enemies'].create(
                50, 50, 
                'shooter');
        e.body.collideWorldBounds = true;
        e.body.bounce.set(1);
        
        e.name="bad guy ";
        e.id = e.name +  i;
        e.health = ENEMY_HEALTH;
        debugPrint("added enemy " + e.id);
    }
	
	world.sprites['people'] = game.add.group();
	world.sprites['people'].enableBody = true;
	for (var i = 0; i < 5; i++) {
		// Create sprite.
        var s = world.sprites['people'].create(
        		Math.random()*350+300, Math.random()*400+150, 
        		'villageguy');
        
        s.animations.add('happy', [2], 20, false);
        s.animations.add('getsick', [0], 20, false);
        s.animations.add('gethealed', [2], 20, false);
        s.animations.add('die', [1], 20, false);
        s.animations.play('happy');
        
        // Create world object and link the two.
        var p = new Person();
        s.worldEntity = p;
        p.sprite = s;
        world.people.push(p);
	}
	
	// Make one big group of sprites, so we can do (depth) sorting
	world.sprites['all'] = new Phaser.Group(game);
	world.sprites['all'].add(world.sprites['plants']);
	world.sprites['all'].add(world.sprites['people']);
	world.sprites['all'].add(player);
}

function spawnPlants(game, world) {
	// world.sprites['plants'] = game.add.group();
	world.sprites['plants'].enableBody = true;
	for (var i = 0; i < 15; i++)
    {
        var s = world.sprites['plants'].create(
        		game.world.randomX, game.world.randomY, 
        		'baddie');
        s.body.collideWorldBounds = true;
        s.body.bounce.set(1);
        
        s.plant_tag="gingerblossom";
        s.id = s.plant_tag +  i;
    }	
}

function setupPersonsAnim(game) {
	
}

function setupFullScreen() {
    // Maintain aspect ratio
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;

    game.input.onDown.add(gofull, this);
}

function gofull() {
    game.scale.startFullScreen();
}

