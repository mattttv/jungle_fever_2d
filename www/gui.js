function HUD(game) {
	this.game = game;	
	this.font;
	this.bmpText;	
	this.textpos=0;

	this.texts=[];
}

HUD.prototype = {

	preload: function () {
		// Load a bitmap font
        this.font = this.game.load.bitmapFont('nokia', 
        		'resources/fonts/nokia.png', 
        		'resources/fonts/nokia.xml');
	},

	create: function () {
		
	},

	update: function () {
		
		// Sliding text
		this.textpos-=2;
		if(this.textpos< -600) this.textpos = 400;
		game.world.remove(this.bmpText);
		this.bmpText = game.add.bitmapText(this.textpos, 100, 'nokia','J-U-N-G-L-E-F-E-V-E-R!', 64);

		
		for(var t in this.texts) {
			game.world.remove(this.texts[t]);
		}
		
		for (p in this.game.worldmodel.people) {
			var pers = this.game.worldmodel.people[p];
			var nmbr = game.add.bitmapText(pers.sprite.body.x,
					pers.sprite.body.y,
					'nokia',
					pers.hp.toString(), 12);
			this.texts.push(nmbr);
		}
	}
};

