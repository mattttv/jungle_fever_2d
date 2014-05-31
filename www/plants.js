/**
 * World model of plants
 */

function PlantSource() {
	this.tag_name="gingerblossom";
	this.position={x:500, y:500};
	this.spritename = 'pltsrc2';
	this.spawnvar = 150; // variance of distribution
	this.action_indicator = new RandomActionEmitter(10000);
	
}

/**
 * Factory method to create and set a new plantsource on the map.
 */
setPlantSource = function(world, x, y, typename, options) {
	var spritemapping = {
			'gingerblossom':'pltsrc1',
			'mandrake':'pltsrc2',
			'cheesecake':'pltsrc3',
	}
	
	var psrc = new PlantSource();
	
	var s = world.sprites['treeplants'].create(
    		x, y,
    		'growtree');
    s.body.collideWorldBounds = true;
    s.body.bounce.set(1);
    
    psrc.sprite = s;
    s.worldEntity = psrc;
	
	psrc.position.x = x;
	psrc.position.y = y;
	psrc.tag_name = typename;
	psrc.spritename = spritemapping[typename];
	psrc.spawnvar = 800;
	world.plants.push(psrc);
};

PlantSource.prototype = {
	/**
	 * Called regularily to do updates.
	 */
	update : function(ticks) {
		
		// Check if it is time to generate a new resource
		if(this.action_indicator.update(ticks)) {
			this.generateResource();
		}
		
	}, 
	
	/**
	 * Creates a new plant resource in the vicinity of the motherplant.
	 */
	generateResource: function() {
		var newx = this.position.x + gaussRand.generate(this.spawnvar),
			newy = this.position.y + gaussRand.generate(this.spawnvar);
		
		var s = world.sprites['plants'].create(
        		newx, newy,
        		this.spritename);
        s.body.collideWorldBounds = true;
        s.body.bounce.set(1);
        s.plant_tag=this.tag_name;
        debugPrint(this.tag_name + 'was created')
	}
}
