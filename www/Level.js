Level = function (game) {

	this.game = game;
	this.map = null;
	this.layer = null;
};

Level.prototype = {

	preload: function () {
		this.game.load.tilemap('map', 'resources/level01.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tiles', 'resources/ground.jpg');
        this.game.load.image('tiles1', 'resources/overlaye.png');
        this.game.load.image('tiles2', 'resources/stones.png');
	},

	create: function () {

        this.layer = {};
		this.game.stage.backgroundColor = '#4f5d3e';
        
        this.map = this.game.add.tilemap('map');
        this.map.addTilesetImage('ground', 'tiles');
        this.map.addTilesetImage('overlaye', 'tiles1');
        this.map.addTilesetImage('stones', 'tiles2');
        
        this.layer[0] = this.map.createLayer('ground');
        this.layer[0].resizeWorld();
        this.layer[1] = this.map.createLayer('overlaye');
        this.layer[1].resizeWorld();
        this.layer[2] = this.map.createLayer('walls');
        this.layer[2].resizeWorld();
        
        
        //this.layer[2].debug = true;

    },

	update: function () {

	}
};

