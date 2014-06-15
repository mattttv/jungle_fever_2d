// menu.js

Game.Menu = function (game) {

};

Game.Menu.prototype = {

    create: function () {
        console.log("hello menu");
        this.cursor = game.input.keyboard.createCursorKeys();

        this.cover = this.game.add.sprite(width / 2, heigth / 2, 'cover');
        this.label = this.game.add.bitmapText(width / 2, heigth - 50, 'nokia', 'Press UP to start', 24)
    },

    update: function () {
        console.log('update');
        if (this.cursor.up.isDown) {
            this.game.state.start('Play');
        }
    }
};