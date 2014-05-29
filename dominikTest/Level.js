Level = function (game) {

	this.game = game;
	this.map = null;
	this.tileset = null;
	this.layer = null;
	this.layer1 = null;
};

Level.prototype = {

	preload: function () {
		this.game.load.tilemap('level', 'testWelt.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.tileset('tiles', 'testTiles.png', 16, 16);
	},

	create: function () {

		this.map = this.game.add.tilemap('level');
		this.tileset = this.game.add.tileset('tiles');
		this.layer = this.game.add.tilemapLayer(0, 0, 800, 600, this.tileset, this.map, 0);
		this.layer = this.game.add.tilemapLayer(0, 0, 800, 600, this.tileset, this.map, 1);
		this.layer = this.game.add.tilemapLayer(0, 0, 800, 600, this.tileset, this.map, 2);
	},

	update: function () {

	}
};

