

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

//	// Add "Plant sources" that will produce plants over time ...
//	setPlantSource(world, 990, 300, "gingerblossom");
//	setPlantSource(world, 560, 1300, "gingerblossom");
//	setPlantSource(world, 500, 950, "mandrake");
//	setPlantSource(world, 1200, 1200, "mandrake");
//	setPlantSource(world, 1050, 1200, "cheesecake");
	
	
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
    		x += 200;
    	if (y <=400 && y >= 150)
    		y += 450;	
        var e = world.sprites['enemies'].create(
                x, y, 
                'shooter');
        e.body.collideWorldBounds = true;
        e.body.bounce.set(1);
        e.body.immovable = true;
        e.body.offset.x=20;
        e.body.offset.y=5;
        e.body.height-=45;
        e.body.width-=35;
        e.anchor.setTo(0.5, 0.5);
        
        
        e.animations.add('shoot', [1, 0], 4, true);
        e.animations.play('shoot');
        
        //e.name="bad guy ";
        //e.id = e.name +  i;
        e.health = SHOOTER_HEALTH;
        e.name = "bad guy";
        e.id = e.name + " " + i;
        
        e.nextFire = 0;
        
            /* not necessary?
        var eObject = new Enemy("bad guy",i);
        e.worldEntity = eObject;
        debugPrint(eObject);
        eObject.sprite = e;
        world.enemies.push(eObject);
        */
    }
    //init enemy bullets
    
    //  The enemies bullet group
    world.enemyBullets = game.add.group();
    world.enemyBullets.enableBody = true;
    world.enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    world.enemyBullets.createMultiple(100, 'bullet');
    world.enemyBullets.setAll('anchor.x', 0.5);
    world.enemyBullets.setAll('anchor.y', 0.5);
    world.enemyBullets.setAll('outOfBoundsKill', true);
    world.enemyBullets.setAll('checkWorldBounds', true);
    
    //  Now using the power of callAll we can add the same animation to all coins in the group:
    world.enemyBullets.callAll('animations.add', 'animations', 'spin', [0, 1], 10, true);

    //  And play them
    world.enemyBullets.callAll('animations.play', 'animations', 'spin');
    
    

}

function updateShooters() {

    var fireRate = 1200;
    
    for (var i = 0; i < world.sprites['enemies'].length; i++) {
        	var ene = world.sprites['enemies'].getAt(i);
            game.physics.arcade.collide(player, ene);
            if (this.game.physics.arcade.distanceBetween(ene, player) < 300)
            {
                debugPrint("Shoot Bullet"+game.time.now+ene.nextFire+world.enemyBullets.countDead() );
                if (game.time.now > ene.nextFire && world.enemyBullets.countDead() > 0 && ene.alive)
                {
                    //debugPrint("Shoot Bullet");
                    ene.nextFire = game.time.now + fireRate;

                    var bullet = world.enemyBullets.getFirstDead();

                    bullet.reset(ene.body.x + ene.body.width/2, ene.body.y+ene.body.height/2);

                    bullet.rotation = this.game.physics.arcade.moveToObject(bullet, player, 500);
                }
            }	

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

