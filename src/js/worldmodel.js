
/**
 * All the things in the "current area" -> for example, the screen. Or the 
 * world. Or an arbitrary area.
 * 
 * Worldmodel class.
 * 
 */
function CurrentArea(game) {
	this.game = game;
	this.game.worldmodel = this;
	this.plants=[];
	//this.people=[];
	this.sprites={};
	this.people=[];
	this.enemies=[];
	this.enivronment = new Environment(game);
}

CurrentArea.prototype.doUpdates = function(game) {
	//TODO [mv] we should use event handling here
	var ticks = game.time.now - this.last_time ;
	
	if (ticks < 1000) return;
	
	this.last_time = game.time.now;
	
	
	for (var p in this.people) {
		var pers = this.people[p];
		
		// Skip dead persons - until they're properly removed from the list
		if (pers.died) continue;
		
		if(pers.diseases && pers.diseases.length) {
			for (var d in pers.diseases) {
				pers.diseases[d].affectPerson(pers, ticks);
			}
			
			if(pers.isDead()) {
				pers.die();
				// TODO: remove from people list !
			}
		}
		
		pers.update(ticks);
	}
	
	this.enivronment.update(ticks);
	
	// Update plants
	for (var p in this.plants) {
		this.plants[p].update(ticks);
	}
}

CurrentArea.prototype.init = function(game) {
	this.last_time = game.time.now;
	world.sprites['plants'] = game.add.group();
	world.sprites['people'] = game.add.group();
	world.sprites['enemies'] = game.add.group();
}

//----------------------------------------------------------------------------

///**
// * Class to represent the VODOO PLANTS !
// */
//function VoodoPlant(name) {
//	this.type="plant";
//	this.name = name;
//}

//----------------------------------------------------------------------------

/**
 * Housekeeping of player skills, items, etc.
 * @returns
 */
function PlayerModel(game) {
	this.HERB_A = plantMap[0];
	this.game = game;
	//this.inventory=[];
	this.game.playermodel = this;
	this.invcounts={};
    this.dashSpeed=300;
    
    // init inventory 
    for (var i in plantMap) { this.invcounts[plantMap[i]] = 0; }
}

PlayerModel.prototype = {
		healPerson : function(person) {
			
			if (person.hasDisease()) {
				if (person.attemptHeal(this.invcounts)) {
					person.beHealed();
					console.log("you healed " + person.last_heal);
				}
			}
			
		},
		addPlant : function(plantname) {
			if (this.invcounts[plantname] == undefined) {
				this.invcounts[plantname] = 0;
			}
			
			// Add inventory counter
			this.invcounts[plantname]+=1;
		},
		
		getInventoryCount : function() {
			return this.invcounts[this.HERB_A] || 0;
		}
}

//----------------------------------------------------------------------------

/**
 * Persons / your fellow village-people.
 * They get affected by sickness and want healing.
 * @returns
 */

function Person() {
	this.hp = 100;
	this.diseases = [];
	this.died = false;
	this.immunity = 1;
	
	this.last_heal = ''; // helper  
}

Person.prototype.preload = function() {
	
}

Person.prototype.create = function() {
	
}


Person.prototype.update = function(ticks) {
	
}

Person.prototype.addDefaultDisease = function() {
	this.addDisease(new Disease(1));
}	

Person.prototype.hasDisease = function() {
	return this.diseases.length > 0;
}	

Person.prototype.addDisease = function(dis) {
	if (this.immunity < 1) {
		// gets sick
		this.diseases.push(dis);
		this.sprite.animations.play('getsick');
	} else {
		// not sick this time
		this.immunity--;
	}
}	

Person.prototype.isDead = function() {
	return this.hp < 0;
}

Person.prototype.die = function() {
	this.sprite.destroy();
	this.died = true;
}

Person.prototype.attemptHeal = function (inventory) {
	for (var d in this.diseases) {
		
		var can_heal = true;
		for(var med in this.diseases[d].healedBy) {
			if (inventory[this.diseases[d].healedBy[med]] < 3) {
				can_heal = false;
			}
		}
		if (can_heal) {
			for(var med in this.diseases[d].healedBy) {
				inventory[this.diseases[d].healedBy[med]] -= 3;
			}
			this.last_heal = this.diseases[d];
			this.diseases = []; // this heals all at once ...
								// but ATM there is only one disease per person anyway
			return true;
		}
	}
}

Person.prototype.beHealed = function () {
	// Set immunity level
	this.immunity = 1+ Math.round(Math.random()*2,0);
	
	this.sprite.animations.play('gethealed');
	sounds.play('heal');
}


// ----------------------------------------------------------------------------


function diseaseFactory(diseasetype) {
	var d = new Disease(1.0);
	
	var dtype = Math.floor(Math.random() * 2); 
	
	switch (dtype) {
		case 0:
			d.name="Fever";
			d.healedBy = [plantMap[0]]
			break;
			
		case 1:
			d.name="Curse";
			d.healedBy = [plantMap[1], plantMap[2]];
			break;
	}
	
	return d;
}


/** 
 * Disease.
 * Has an effect on persons.
 */
function Disease(drain) {
	this.name = "Voodoo curse";
	this.drain = 0.025;	// drain per effective drain
	this.TICKLIMIT = 1000;	// drain every TICKLIMIT ticks
	this.tickcount = this.TICKLIMIT;
	this.healedBy = [];
}

/**
 * Disease 'does its thing' - e.g. drain life
 */
Disease.prototype.affectPerson = function(person, time_ticks) {
	
	// limit the amount of time_ticks that are processed
	// TODO : move this limit to the globald worldupdate
	time_ticks = time_ticks > 10 ? 10 : time_ticks;
	
	this.tickcount-= time_ticks;
	if (this.tickcount < 0) {
		this.timeval = this.TICKLIMIT;
		person.hp-= this.drain;;
	}
}


// ----------------------------------------------------------------------------


/**
 * 
 */
function RandomActionEmitter(val) {
	this.state = 0;
	this.DEFAULT_VAL = 1000;
	
	if(val!=undefined) {
		this.DEFAULT_VAL = val;
	}
}

RandomActionEmitter.prototype = {
	getNewRandomState: function(value) {
		return value + Math.random() * value;
	},
	reset: function() {
		this.state = this.getNewRandomState(this.DEFAULT_VAL);
	},
	update: function(ticks) {
		this.state-=ticks;
		if (this.state < 0) {
			this.state = this.getNewRandomState(this.DEFAULT_VAL);
			// return true ? or accept callback call that ? 
			return true;
		} else {
			return false;
		}
	}
}


/**
 * Box-Muller, see http://en.wikipedia.org/wiki/Box%E2%80%93Muller_transform#Implementation
 * Generate standard, normally distributed random numbers.
 */
function GaussianNoise() {
	this.has_spare = false;
	this.rand1=0;
	this.rand2=0
}
GaussianNoise.prototype = {
	generate: function(variance) {
		if(variance==undefined) {
			variance = 1.0;
		}
		if(this.has_spare)
		{
			this.has_spare = false;
			return Math.sqrt(variance * this.rand1) * Math.sin(this.rand2);
		}
	 
		this.has_spare = true;
		this.rand1 = Math.random();
		if(this.rand1 < 1e-10) this.rand1 = 1e-10;
		this.rand1 = -2 * Math.log(this.rand1);
		this.rand2 = Math.random() * 2 * Math.PI;
		return Math.sqrt(variance * this.rand1) * Math.cos(this.rand2);	
	}
}


// ----------------------------------------------------------------------------
/**
 * This will produce random events after certain ticks.
 * (To make people sick, change weather, re-grow plants etc.)
 */
function Environment(game) {
	this.game = game;
	this.next_disease_state = new RandomActionEmitter(this.DEFAULT_VAL);
	this.DEFAULT_VAL = 15000;
}

Environment.prototype = {
	reset: function() {
		this.next_disease_state = new RandomActionEmitter(this.DEFAULT_VAL);
	},
	update: function(ticks) {
		var worldpeople = this.game.worldmodel.people;
		
		if (this.next_disease_state.update(ticks)) {
			// Find a person to make sick ...
			// TODO : make random or something
			for (var i in worldpeople) {
				if (Math.random() < 0.65) {
					continue; // random spare this person
				}
				if (!worldpeople[i].died && worldpeople[i].diseases.length==0) {
					worldpeople[i].addDisease(diseaseFactory());
					break;
				}
			}
		}
	}
}
