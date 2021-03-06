
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
	this.HERB_A = 'gingerblossom';
	this.game = game;
	//this.inventory=[];
	this.game.playermodel = this;
	this.invcounts={};
    this.dashSpeed=300;
    
    // init the "default" plant 
    this.invcounts[this.HERB_A] = 0;
}

PlayerModel.prototype = {
		healPerson : function(person) {
			
			// TODO : add more complex logic to determine which
			// 			herbs can heal which disease ...
			
			if (person.hasDisease()) {
				 
				if (this.invcounts[this.HERB_A] >= 5) {
					
					// can heal + use herbs
					
					this.invcounts[this.HERB_A]-=5;
					person.beHealed();
					
				} else {
					
					// sorry not enough herbs
				}
			}
			
		},
		addPlant : function(plantname) {
			if (this.invcounts[plantname] == undefined) {
				this.invcounts[plantname] = 0;
			}
			
			// Add inventory counter
			this.invcounts[plantname]+=1;
			
			// TODO : remove, once the real healing system is 
			// in place. For now, always count up HERB_A
			if(plantname != this.HERB_A) {
				this.invcounts[this.HERB_A]+=1;	
			}
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
	this.immunity = 0;
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

Person.prototype.beHealed = function () {
	
	if (this.diseases.length > 0) {
		// Remove (heal) all disease
		this.diseases = [];
		
		// Set immunity level
		this.immunity = 1+ Math.round(Math.random()*2,0);
		
		this.sprite.animations.play('gethealed');
		sounds.play('heal');
	}
}


// ----------------------------------------------------------------------------


/** 
 * Disease.
 * Has an effect on persons.
 */
function Disease(drain) {
	this.name = "Voodoo curse";
	this.drain = 0.025;	// drain per effective drain
	this.TICKLIMIT = 1000;	// drain every TICKLIMIT ticks
	this.tickcount = this.TICKLIMIT;
	
//	if (drain) {
//		this.drain = drain;
//	}
	
	
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
	this.next_disease_state = 0;
	this.DEFAULT_VAL = 5000;
	
	this.plants_respawn = new RandomActionEmitter(this.DEFAULT_VAL*5);
}

Environment.prototype = {
	getNewRandomState: function(value) {
		return value + Math.random() * value;
	},
	reset: function() {
		this.next_disease_state = this.getNewRandomState(this.DEFAULT_VAL);
	},
	update: function(ticks) {
		var worldpeople = this.game.worldmodel.people;
		this.next_disease_state-=ticks;
		
//		if (this.plants_respawn.update(ticks)) {
//			//debugPrint('respawn plants');
//			initPlants(game, world); // call works only with globals - WTF
//		}
		
		if (this.next_disease_state < 0) {
			this.next_disease_state = this.getNewRandomState(this.DEFAULT_VAL);
			
			// Find a person to make sick ...
			// TODO : make random or something
			for (var i in worldpeople) {
				if (Math.random() < 0.75) {
					continue; // random spare this person
				}
				if (!worldpeople[i].died && worldpeople[i].diseases.length==0) {
					worldpeople[i].addDefaultDisease();
					break;
				}
			}
		}
	}
}
