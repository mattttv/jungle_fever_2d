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
function CurrentArea() {
	//this.plants=[];
	//this.people=[];
	this.sprites={};
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

