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
			// Sliding help text
			this.textpos-=3;
			if(this.textpos< -600) {
				this.textpos = 400;
				this.linecounter = (this.linecounter+1) % this.lines.length;
			}
			game.world.remove(this.bmpText);
			this.bmpText = game.add.bitmapText(
					this.textpos, 
					game.camera.view.height - 100, 
					'nokia',
					this.lines[this.linecounter], 64);
	        this.bmpText.fixedToCamera = true;
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
/*
		for (e in this.game.worldmodel.enemies) {
			var ene = this.game.worldmodel.enemies[e];
			var nmbr = game.add.bitmapText(
					ene.sprite.body.x,
					ene.sprite.body.y,
					'nokia',
					Math.round(ene.hp,0).toString()+'/'+Math.round(ene.immunity,0).toString(),
					12);
			this.texts.push(nmbr);
		}
		*/
		
		// Add inventory display
		var nmbr = game.add.bitmapText(
				offsetx + 10,
				offsety + 10,
				'nokia',
				'Plants: ' + game.playermodel.getInventoryCount().toString(),
				24);
		this.texts.push(nmbr);
	}
};

