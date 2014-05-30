
var game;
var level;

window.onload = function () {
	// init game
	game = new Phaser.Game(896, 640, Phaser.AUTO, '', {
		preload: preload, create: create, update: update
	});



	function preload () {
		level = new Level(game);
		level.preload();
	}

	function create () {
		level.create();
	}

	function update () {

	}


}