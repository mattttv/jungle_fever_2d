

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
    
    initWalkers();
    
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
	setPlantSource(world, 700, 150, "mandrake");
	setPlantSource(world, 750, 160, "mandrake");
	setPlantSource(world, 720, 130, "mandrake");
	
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

function initWalkers() {
        world.sprites['walkers'] = game.add.group();
    world.sprites['walkers'].enableBody = true;
    for (var i = 0; i < WALKER_AMOUNT; i++)
    {
    	var x = game.world.randomX;
    	var y = game.world.randomY;
    	if (x <=350 && x >= 300)
    		x += 200;
    	if (y <=400 && y >= 150)
    		y += 450;	
        var e = world.sprites['walkers'].create(
                x, y, 
                'walker');
        e.body.collideWorldBounds = true;
        e.body.bounce.set(1);
        e.body.immovable = true;
        e.body.offset.x=20;
        e.body.offset.y=5;
        e.body.height-=45;
        e.body.width-=35;
        e.anchor.setTo(0.5, 0.5);
        
        e.animations.add('up', [4, 0], 8, false);
        e.animations.add('right', [5, 1], 8, false);
        e.animations.add('down', [6, 2], 8, false);
        e.animations.add('left', [7, 3], 8, false);

        e.animations.add('attack_up', [12, 8], 5, false);
        e.animations.add('attack_right', [13, 9], 5, false);
        e.animations.add('attack_down', [14, 10], 5, false);
        e.animations.add('attack_left', [15, 11], 5, false);
        
        //e.name="bad guy ";
        //e.id = e.name +  i;
        e.health = WALKER_HEALTH;
        e.name = "walker";
        e.id = e.name + " " + i;
        
        e.nextFire = 0;
        e.last = DIRECTION.DOWN;
        e.animations.play('down');
            /* not necessary?
        var eObject = new Enemy("bad guy",i);
        e.worldEntity = eObject;
        debugPrint(eObject);
        eObject.sprite = e;
        world.enemies.push(eObject);
        */
    }
        
}

function updateWalkers() {

    var fireRate = 500;
    
    for (var i = 0; i < world.sprites['walkers'].length; i++) {
            pspeed = 10;
        	var ene = world.sprites['walkers'].getAt(i);
            var x = player.position.x - ene.position.x;
            var y = player.position.y - ene.position.y;
        
            game.physics.arcade.collide(player, ene);
        
            if(Math.abs(x)>Math.abs(y)){
                if(x>0)
                    ene.last = DIRECTION.RIGHT;
                else
                    ene.last = DIRECTION.LEFT;
            }else{
                if(y>0)
                    ene.last = DIRECTION.DOWN;
                else
                    ene.last = DIRECTION.UP;
            }    
        
            if (this.game.physics.arcade.distanceBetween(ene, player) < 150)
            {
                
                if (game.time.now > ene.nextFire && world.enemyBullets.countDead() > 0 && ene.alive)
                {
                    //debugPrint("Shoot Bullet");
                    ene.nextFire = game.time.now + fireRate;
                    doAttackWalkerLogic(ene);
                    switch(ene.last) {
                    case DIRECTION.LEFT:
                    ene.animations.play('attack_left');
                    break;
                    case DIRECTION.RIGHT:
                    ene.animations.play('attack_right');
                    break;
                    case DIRECTION.UP:
                    ene.animations.play('attack_up');
                    break;
                    case DIRECTION.DOWN:
                    ene.animations.play('attack_down');
                    break;                
                    default:
                    ene.animations.play('attack_down');
                    }
                    
                }
            }else{
                if (!ene.animations.currentAnim.isFinished)
                {

                    switch(ene.last) {
                        case DIRECTION.LEFT:
                        ene.body.velocity.x -= pspeed;        
                        break;
                        case DIRECTION.RIGHT:
                        ene.body.velocity.x +=pspeed;
                        break;
                        case DIRECTION.UP:
                        ene.body.velocity.y -=pspeed;
                        break;
                        case DIRECTION.DOWN:
                        ene.body.velocity.y +=pspeed;
                        break;                
                        default:
                        ene.body.velocity.y +=pspeed;
                    }
                    
                }else{
                    switch(ene.last) {
                        case DIRECTION.LEFT:
                        ene.animations.play('left');
                        break;
                        case DIRECTION.RIGHT:
                        ene.animations.play('right');
                        break;
                        case DIRECTION.UP:
                        ene.animations.play('up');
                        break;
                        case DIRECTION.DOWN:
                        ene.animations.play('down');
                        break;                
                        default:
                        ene.animations.play('down');
                    }
            
                }    

        }
    ene.body.velocity.x = Math.abs(ene.body.velocity.x) > 1 ? ene.body.velocity.x*0.92 : 0;
    ene.body.velocity.y = Math.abs(ene.body.velocity.y) > 1 ? ene.body.velocity.y*0.92 : 0;
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

