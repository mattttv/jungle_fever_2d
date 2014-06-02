function Enemy (name, idnum) {
  this.name = name;
  this.id = this.name + "" + idnum;
  this.health = SHOOTER_HEALTH;
}

Enemy.prototype.create = function() {
	
}

Enemy.prototype.update = function(ticks) {
	
}
