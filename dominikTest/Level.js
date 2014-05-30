Level = function (game) {

	this.game = game;
	this.map = null;
	this.tileset = null;
	this.layer = null;
};

Level.prototype = {

	preload: function () {
		this.game.load.tilemap('level', 'theRealThing.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.tileset('tiles', 'ergrdg.jpg');
	},

	create: function () {

		this.map = this.game.add.tilemap('level', 64, 64);
        this.map.add.tileset('tiles');
        this.layer = this.map.createLayer(0);
        this.layer.resizeWorld();   
	},

	update: function () {

	}
};

