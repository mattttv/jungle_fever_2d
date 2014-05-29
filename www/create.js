

/**
 * set up a world area
 * @param game
 * @param world
 */
function spawnArea(game, world) {
	world.init(game);
	world.sprites['plants'] = game.add.group();
	world.sprites['plants'].enableBody = true;
	for (var i = 0; i < 15; i++)
    {
        var s = world.sprites['plants'].create(
        		game.world.randomX, game.world.randomY, 
        		'baddie');
        s.body.collideWorldBounds = true;
        s.body.bounce.set(1);
        
        s.plant_tag="shroom";
    }
	
	world.sprites['people'] = game.add.group();
	world.sprites['people'].enableBody = true;
	for (var i = 0; i < 5; i++) {
		// Create sprite.
        var s = world.sprites['people'].create(
        		game.world.randomX, game.world.randomY, 
        		'people');
        // Create world object and link the two.
        var p = new Person();
        s.world_entity = p;
        p.sprite = s;
        world.people.push(p);
	}
	
	// Make one big group of sprites, so we can do (depth) sorting
	world.sprites['all'] = new Phaser.Group(game);
	world.sprites['all'].add(world.sprites['plants']);
	world.sprites['all'].add(world.sprites['people']);
	world.sprites['all'].add(player);
}

function setupFullScreen() {
    // Maintain aspect ratio
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;

    game.input.onDown.add(gofull, this);

}

function gofull() {
    game.scale.startFullScreen();
}

