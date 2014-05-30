Level = function (game) {

	this.game = game;
	this.map = null;
	this.layer = null;
};

Level.prototype = {

	preload: function () {
		this.game.load.tilemap('map', 'resources/firstGround.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tiles', 'resources/werfeg.jpg');
	},

	create: function () {

		this.game.stage.backgroundColor = '#4f5d3e';
        
        this.map = this.game.add.tilemap('map');
        this.map.addTilesetImage('werfeg', 'tiles');
        this.layer = this.map.createLayer('ground');
        this.layer.resizeWorld();
    },

	update: function () {

	}
};

