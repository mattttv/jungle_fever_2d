function HUD(game) {
	this.game = game;	
	this.font;
	this.bmpText;	
	this.textpos=0;
}

HUD.prototype = {

	preload: function () {
		// Load a bitmap font
        this.font = this.game.load.bitmapFont('nokia', 
        		'resources/fonts/nokia.png', 
        		'resources/fonts/nokia.xml');
	},

	create: function () {
		//this.textpos = 500;
		//this.bmpText = game.add.bitmapText(this.textpos, 100, 'nokia','J-U-N-G-L-E-F-E-V-E-R!', 64);

		
	},

	update: function () {
		this.textpos-=2;
		if(this.textpos< -600) this.textpos = 400;
		game.world.remove(this.bmpText);
		this.bmpText = game.add.bitmapText(this.textpos, 100, 'nokia','J-U-N-G-L-E--F-E-V-E-R!', 64);
		console.log(this.textpos);
	}
};

