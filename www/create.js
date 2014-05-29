

function setUpDemoPlants(game) {

	plants = game.add.group();
    plants.enableBody = true;
    for (var i = 0; i < 5; i++)
    {
        var s = plants.create(
        		game.world.randomX, game.world.randomY, 
        		'baddie');
        s.body.collideWorldBounds = true;
        s.body.bounce.set(1);
        // s.body.velocity.setTo(10 + Math.random() * 40, 10 + Math.random() * 40);
    }
    
}