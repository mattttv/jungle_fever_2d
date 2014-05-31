Level = function (game) {

	this.game = game;
	this.map = null;
	this.layer = null;
};

Level.prototype = {

	preload: function () {
		this.game.load.tilemap('map', 'resources/karte1.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tiles', 'resources/floor_TILES.png');
	},

	create: function () {

        this.layer = {};
		this.game.stage.backgroundColor = '#4f5d3e';
        
        this.map = this.game.add.tilemap('map');
        this.map.addTilesetImage('floor_TILES', 'tiles');   
        
        this.layer[0] = this.map.createLayer('floor');
        this.layer[0].resizeWorld();
        this.layer[1] = this.map.createLayer('grass');
        this.layer[1].resizeWorld();
        this.layer[2] = this.map.createLayer('items');
        this.layer[2].resizeWorld();
        this.layer[3] = this.map.createLayer('wall');
        this.layer[3].resizeWorld();
        this.layer[4] = this.map.createLayer('plants');
        this.layer[4].resizeWorld();

        /*for (var i = 0; i <= this.map.layers.length(), i++) {
            this.layer[i] = this.map.createLayer(i);
            this.layer[i].resizeWorld();
        }*/
        
        this.map.setCollision(
            [77, 73, 74, 75, 76, 123, 124, 88, 82, 87, 129, 130, 113, 94, 93, 135, 136, 119, 87, 94, 93, 87, 105, 106, 106, 76, 103, 104, 111, 112, 120, 109, 117, 118, 117, 118, 115, 116, 113, 106, 117, 118, 124, 113, 129, 125, 126, 103, 104, 135, 136, 131, 132, 109, 106, 137, 138, 128, 113, 125, 126, 134, 117, 118, 131, 132, 106, 137, 138, 113,  124, 103, 104, 117, 118, 113, 129, 128, 109, 106, 113, 103, 104, 135, 136,  134, 125, 126, 109, 110, 131, 132, 117, 118, 116, 137, 138],
             true, this.layer[3]);
        this.layer[3].debug = true;

    },

	update: function (player) {
        this.game.physics.arcade.collide(player, this.layer[3]);
	}
};

