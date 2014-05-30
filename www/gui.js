function HUD(game) {
	this.game = game;	
	this.font;
	this.bmpText;	
	this.textpos=0;
	this.show_help = SHOW_HELP;

	// keep tracks of textparts on the screen
	this.texts=[];
	
	this.lines=['J-U-N-G-L-E-F-E-V-E-R!',
	            'Collect plants and heal people!',
	            'Arrow Keys to move',
	            'X attack, C strave, V dash',
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
		var offsetx = game.camera.view.x,
			offsety = game.camera.view.y;
		if (this.show_help) {
			// Sliding text
			this.textpos-=2;
			if(this.textpos< -600) {
				this.textpos = 400;
				this.linecounter = (this.linecounter+1) % this.lines.length;
			}
			
			game.world.remove(this.bmpText);
			this.bmpText = game.add.bitmapText(offsetx + this.textpos, 
					offsety + 0, 
					'nokia',
					this.lines[this.linecounter], 64);
		} else {
			if (this.bmpText) {
				game.world.remove(this.bmpText);
				delete this.bmpText;
			}
		}
		
		// Clean In-Game Texts
		for(var t in this.texts) {
			game.world.remove(this.texts[t]);
		}
		
		// Add in-game texts for people
		for (p in this.game.worldmodel.people) {
			var pers = this.game.worldmodel.people[p];
			var nmbr = game.add.bitmapText(
					pers.sprite.body.x,
					pers.sprite.body.y,
					'nokia',
					Math.round(pers.hp,0).toString()+'/'+Math.round(pers.immunity,0).toString(),
					12);
			this.texts.push(nmbr);
		}
		
		// Add inventory display
	}
};

