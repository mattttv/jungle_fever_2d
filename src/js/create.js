

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
	// Add 0 and 2 . Resource 1 is gained by slashing the big blooms
	setPlantSource(world, 700, 150, plantMap[2]);
	setPlantSource(world, 750, 160, plantMap[2]);
	setPlantSource(world, 720, 130, plantMap[0]);
	setPlantSource(world, 720, 210, plantMap[0]);
	
	
}

function initEnemies() {
        world.sprites['enemies'] = game.add.group();
    world.sprites['enemies'].enableBody = true;
    for (var i = 0; i < SHOOTER_AMOUNT; i++)
    {
    	var x = game.world.randomX;
    	var y = game.world.randomY;
    	// [mf] changed make enemy plants appear mostly bottom/right
    	if (x <=500)
    		x += 500;
    	if (y <=500 )
    		y += 500;
    	
        var e = world.sprites['enemies'].create(
                x, y, 
                'shooter');
        e.body.collideWorldBounds = true;
        e.body.bounce.set(1);
        e.body.immovable = true;
        
        
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
    world.enemyBullets.createMultiple(BULLETS_IN_GAME, 'bullet');
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
    var fireRate = 3000;
//without kill of bullet    
//game.physics.arcade.overlap(world.enemyBullets, player, bulletHitPlayer, null, this);
     //check if player was hit  


    game.physics.arcade.overlap(world.enemyBullets, player, function(b,p) {
        bulletHitPlayer(p);
    });

/*
    if (game.physics.arcade.distanceBetween(world.enemyBullets, player) <= 0) {
        var t = game.time.now;
        bulletHitPlayer(t);
    }
    */

    
    for (var i = 0; i < world.sprites['enemies'].length; i++) {
        	var ene = world.sprites['enemies'].getAt(i);
            game.physics.arcade.collide(player, ene);
            if (this.game.physics.arcade.distanceBetween(ene, player) < 300)
            {
                //debugPrint("Shoot Bullet"+game.time.now+ene.nextFire+world.enemyBullets.countDead() );
                if (game.time.now > ene.nextFire && world.enemyBullets.countDead() > 0 && ene.alive)
                {
                    //debugPrint("Shoot Bullet");
                    ene.nextFire = game.time.now + fireRate;


                    var bullet = world.enemyBullets.getFirstDead();

                    bullet.reset(ene.body.x + ene.body.width/2, ene.body.y+ene.body.height/2);

                    bullet.rotation = this.game.physics.arcade.moveToObject(bullet, player, 500);
                    /* wont work here
                    if (game.physics.arcade.distanceBetween(bullet, player) <= 2)
                    {
                            debugPrint("HIT");
                    }
                    */

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

