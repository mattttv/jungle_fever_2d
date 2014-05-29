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
	
}

Person.prototype.addDefaultDisease = function(dis) {
	this.diseases.push(new Disease(0.01));
}	

Person.prototype.addDisease = function(dis) {
	this.diseases.push(dis);
}	

Person.prototype.isDead = function() {
	return this.hp < 0;
}

Person.prototype.die = function() {
	this.sprite.destroy();
	this.died = true;
}


/** 
 * Disease.
 * Has an effect on persons.
 */
function Disease(drain) {
	this.name = "Voodoo curse";
	this.drain = 0.01;
	if (drain) {
		this.drain = drain;
	}
	
}

Disease.prototype.affectPerson = function(person, time_ticks) {
	person.hp-=this.drain * time_ticks;
	// console.log(person.hp);
}
