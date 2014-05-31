

/**
 * set up a world area
 * @param game
 * @param world
 */
function spawnArea(game, world) {
    game.stage.backgroundColor = '#462';

    world.init(game);

	initPlants(game, world);

    initEnemies();
    
    initPeople();
	
	// Make one big group of sprites, so we can do (depth) sorting
	world.sprites['all'] = new Phaser.Group(game);
	world.sprites['all'].add(world.sprites['plants']);
	world.sprites['all'].add(world.sprites['people']);
    world.sprites['all'].add(world.sprites['enemies']);
	world.sprites['all'].add(player);
}

function initPlants(game, world) {

	// Init 'plants' sprite group
	world.sprites['plants'] = game.add.group();
	world.sprites['plants'].enableBody = true;
	
	world.sprites['treeplants'] = game.add.group();
	world.sprites['treeplants'].enableBody = true;

	// Add "Plant sources" that will produce plants over time ...
	setPlantSource(world, 990, 300, "gingerblossom");
	setPlantSource(world, 560, 1300, "gingerblossom");
	setPlantSource(world, 500, 950, "mandrake");
	setPlantSource(world, 1200, 1200, "mandrake");
	setPlantSource(world, 1050, 1200, "cheesecake");
	
	
//	// world.sprites['plants'] = game.add.group();
//	world.sprites['plants'].enableBody = true;
//	for (var i = 0; i < 15; i++)
//    {
//        var s = world.sprites['plants'].create(
//        		game.world.randomX, game.world.randomY, 
//        		'baddie');
//        s.body.collideWorldBounds = true;
//        s.body.bounce.set(1);
//        
//        s.plant_tag="gingerblossom";
//        s.id = s.plant_tag +  i;
//    }	
}

function initEnemies() {
        world.sprites['enemies'] = game.add.group();
    world.sprites['enemies'].enableBody = true;
    for (var i = 0; i < SHOOTER_AMOUNT; i++)
    {
    	var x = game.world.randomX;
    	var y = game.world.randomY;
    	if (x <=350 && x >= 300)
    		x += 100;
    	if (y <=400 && y >= 150)
    		y += 350;	
        var e = world.sprites['enemies'].create(
                x, y, 
                'shooter');
        e.body.collideWorldBounds = true;
        e.body.bounce.set(1);
        
        e.animations.add('shoot', [1, 0], 4, true);
        e.animations.play('shoot');
        
        //e.name="bad guy ";
        //e.id = e.name +  i;
        e.health = SHOOTER_HEALTH;
        e.name = "bad guy";
        e.id = e.name + " " + i;
        
            /* not necessary?
        var eObject = new Enemy("bad guy",i);
        e.worldEntity = eObject;
        debugPrint(eObject);
        eObject.sprite = e;
        world.enemies.push(eObject);
        */
    }

}

function initPeople() {
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
}

function setupPersonsAnim(game) {
	
}

