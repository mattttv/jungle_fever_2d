///**
// * Object / class to keep track of objects states in the world.
// */
//function WorldModel() {
//
//	
//}

/**
 * All the things in the "current area" -> for example, the screen. Or the 
 * world. Or an arbitrary area.
 * 
 */
function CurrentArea(game) {
	this.game = game;
	//this.plants=[];
	//this.people=[];
	this.sprites={};
	this.people=[];
	
	this.enivronment = new Environment(game);
}

CurrentArea.prototype.doUpdates = function(game) {
	var ticks = game.time.now - this.last_time ;
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
		
		this.enivronment.update(ticks);
	}
	
}

CurrentArea.prototype.init = function(game) {
	this.last_time = game.time.now;
}


/**
 * Class to represent the VODOO PLANTS !
 */
function VoodoPlant(name) {
	this.type="plant";
	this.name = name;
}



/**
 * Housekeeping of player skills, items, etc.
 * @returns
 */
function PlayerModel() {
	this.inventory=[];
}

//PlayerModel.prototype.demoMethod = function() {
//	
//}

function Person() {
	this.hp = 100;
	this.diseases = [];
	this.died = false;
	this.immunity = 0;
	
}

Person.prototype.addDefaultDisease = function() {
	this.addDisease(new Disease(1));
}	

Person.prototype.addDisease = function(dis) {
	if (this.immunity < 1) {
		this.diseases.push(dis);
	} else {
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
	// Remove all diseases
	this.diseases = [];
	
	// Set immunity level
	this.immunity = 5;
}


/** 
 * Disease.
 * Has an effect on persons.
 */
function Disease(drain) {
	this.name = "Voodoo curse";
	this.drain = 0.01;	// drain per effective drain
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

/**
 * This will produce random events after certain ticks.
 * (To make people sick, change weather, re-grow plants etc.)
 */
function Environment(game) {
	this.game = game;
	this.next_disease_state = 0;
	this.DEFAULT_VAL = 10000;
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
