function HUD(game) {
	this.game = game;	
	this.font;
	this.bmpText;	
	this.textpos=0;

	// keep tracks of textparts on the screen
	this.texts=[];
	
	this.lines=['J-U-N-G-L-E-F-E-V-E-R!',
	            'Collect plants ...',
	            '... and heal people!!!',
	            '* * GameJamGraz2014 * *'
	            ];
	this.linecounter = 0;
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
		if(this.textpos< -600) {
			this.textpos = 400;
			this.linecounter = (this.linecounter+1) % this.lines.length;
		}
		game.world.remove(this.bmpText);
		this.bmpText = game.add.bitmapText(this.textpos, 0, 'nokia',
				this.lines[this.linecounter], 64);

		
		for(var t in this.texts) {
			game.world.remove(this.texts[t]);
		}
		
		for (p in this.game.worldmodel.people) {
			var pers = this.game.worldmodel.people[p];
			var nmbr = game.add.bitmapText(pers.sprite.body.x,
					pers.sprite.body.y,
					'nokia',
					Math.round(pers.hp,0).toString(), 12);
			this.texts.push(nmbr);
		}
	}
};

