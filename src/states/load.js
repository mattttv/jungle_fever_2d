// load.js

Game = {};

var width = 800;
var height = 600;

Game.Boot = function (game) {

};

Game.Boot.prototype = {

    preload: function () {

        game.stage.backgroundColor = '#fff';
        game.load.image('loading_bar', './resources/loading_bar.png');

    },

    create: function () {

        this.game.state.start('Load');

    }
};

Game.Load = function (game) {

};

Game.Load.prototype = {

    preload: function () {

        var label = game.add.text(Math.floor(width / 2), Math.floor(height / 2) - 80, 'Loading..', { font: '32px Arial', fill: '#fff' });
        label.anchor.setTo(0.5, 0.5);

        var loadingBar = game.add.sprite(width / 2, height / 2, 'loading_bar');
        loadingBar.anchor.setTo(0.5, 0.5);
        game.load.setPreloadSprite(loadingBar);

        // loading Level
        this.game.load.tilemap('map', 'resources/karte1.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tiles', 'resources/floor_TILES.png');

        this.game.load.image('cover', 'resources/cover.png');
        this.game.load.bitmapFont('nokia', 'resources/fonts/nokia.png', 'resources/fonts/nokia.xml');

        this.game.load.image('people', 'resources/pineapple.png');
        this.game.load.image('baddie', 'resources/weeds.png');
        this.game.load.image('enemie', 'resources/pineapple.png');
        this.game.load.spritesheet('girl', 'resources/spieler1.png', 64, 100);
        
        game.load.spritesheet('rain', 'resources/rain.png', 17, 17);
        this.game.load.spritesheet('dust', 'resources/dust.png', 17, 17);
        this.game.load.spritesheet('blood', 'resources/blut.png', 17, 17);
        this.game.load.spritesheet('villageguy', 'resources/people.png', 64, 80);

        this.game.load.spritesheet('shooter', 'resources/schiessblume1.png', 128, 100);
        this.game.load.spritesheet('bullet', 'resources/schiessblume_kugel1.png', 64, 117);


        // // plant-sources - plant stuff to pick up
        // this.game.load.image(plantMap[0], 'resources/weeds.png');
        // this.game.load.image(plantMap[1], 'resources/s2.png');
        // this.game.load.image(plantMap[2], 'resources/wnd.png');
        // this.game.load.spritesheet('growtree', 'resources/plant2.png', 50, 117);
        
        // gui sprites
        this.game.load.image('inventory', 'resources/inventory.png');

        //sounds
        this.game.load.audio('village_music', 'resources/sounds/Jungle_Fever_Village_1v0.mp3');
        this.game.load.audio('all_sounds', 'resources/sounds/_ALL_SOUNDS_v1.mp3');
        console.log("loading done!");
    },

    create: function () {
        console.log("go to Menu");
        this.game.state.start('Menu');
    }
};