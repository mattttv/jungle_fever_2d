function GUI(game) {
	this.game = game;
	this.game.gui = this;
	this.font;
	this.bmpText;	
	this.textpos=0;
	this.show_help;
	this.lastTimeGui = 0; //getTime darf hier nicht aufgerufen werden
	this.currentTimeGui = 0;
	this.textDelay = TEXT_DELAY;

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

GUI.prototype = {

	preload: function () {
		// Load a bitmap font
		this.font = this.game.load.bitmapFont('nokia', 
			'resources/fonts/nokia.png', 
			'resources/fonts/nokia.xml');
	},

	create: function () {
		this.show_help = SHOW_HELP;
	},

	update: function () {
		
		if (this.show_help) {
			// Sliding help text
			this.textpos-=3;
			if(this.textpos< -600) {
				this.textpos = game.camera.width;
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
		this.currentTimeGui = getTime();

		if ((getTime() - this.lastTimeGui) >= this.textDelay) {
			this.lastTimeGui = getTime();
			
			// Clean In-Game Texts
			for(var t in this.texts) {
				game.world.remove(this.texts[t]);
			}

			// Add in-game texts for people
			for (p in this.game.worldmodel.people) {
				var pers = this.game.worldmodel.people[p];
				var playertext;
				// playertext = Math.round(pers.hp,0).toString();
				
				if (pers.hasDisease() && ! pers.isDead()) {
					playertext = "Help.. ";
					if (pers.hp < 40) playertext += 'o_O';
					else if (pers.hp < 60) playertext += ':o';
					else if (pers.hp < 80) playertext += ':(';
					else playertext += ':|';
					var nmbr = game.add.bitmapText(
						pers.sprite.body.x,
						pers.sprite.body.y,
						'nokia',
						playertext,
						12);
					this.texts.push(nmbr);
				}
			}

	        // Add in-game texts for enemies
	        //debugPrint(this.game.worldmodel.enemies);
	        for (var i = 0; i < world.sprites['enemies'].length; i++) {
	        	var ene = world.sprites['enemies'].getAt(i);
	        	if (ene.health > 0) {
	        		var nmbr = game.add.bitmapText(
	        			ene.x + ene.width/2,
	        			ene.y + ene.height/10,
	        			'nokia',
	        			Math.round(ene.health,0).toString() + '/'+ SHOOTER_HEALTH.toString(),
	        			12);
	
	        		this.texts.push(nmbr);
	        	}
	        }


			// Add inventory display
			var nmbr = game.add.bitmapText(
				10,
				10,
				'nokia',
				'Plants: ' + game.playermodel.getInventoryCount().toString(),
				24);
			nmbr.fixedToCamera = true;
			this.texts.push(nmbr);
			
			// Add inventory graphic
			var inventorysprite = game.add.sprite(0, game.camera.height-90,'inventory');
			inventorysprite.fixedToCamera = true;
		}
	}
};

