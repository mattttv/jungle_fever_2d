
function doAttackPlayerLogic() {
  //TODO del
  //debugPrint("attack logi");
  
  player.rangex = 70;
  player.rangey = 60;
  player.damage = 10;
  
  var markerX;
  var markerY;
  var markerW; 
  var markerH; 

  switch(player.last) {
  	case DIRECTION.RIGHT: 
    markerX = player.x + player.width/2;
    markerY = player.y;// + player.height/2;
    markerW = player.rangex;
    markerH = player.rangey;
  	break;
    case DIRECTION.LEFT: 
    markerX = player.x - 1.5*player.width;
    markerY = player.y;// + player.height/2;
    markerW = player.rangex;
    markerH = player.rangey;
    break;
    case DIRECTION.DOWN: 
    markerX = player.x - player.width/2;
    markerY = player.y + player.height/2;
    markerW = player.rangey;
    markerH = player.rangex;
    break;
    case DIRECTION.UP: 
    markerX = player.x - player.width/2;
    markerY = player.y - player.height/2;
    markerW = player.rangey;
    markerH = player.rangex;
    break;
  }
    doAttackOverlapWithPlayer(  
    markerX,
    markerY, 
    markerW, 
    markerH);
}    
function doAttackWalkerLogic(enemy) {
  //TODO del
  //debugPrint("attack logi");
  
  enemy.rangex = 70;
  enemy.rangey = 60;
  enemy.damage = 10;
  
  var markerX;
  var markerY;
  var markerW; 
  var markerH; 

  switch(enemy.last) {
  	case DIRECTION.RIGHT: 
    markerX = enemy.x + enemy.width/2;
    markerY = enemy.y;// + player.height/2;
    markerW = enemy.rangex;
    markerH = enemy.rangey;
  	break;
    case DIRECTION.LEFT: 
    markerX = enemy.x - 1.5*enemy.width;
    markerY = enemy.y;// + player.height/2;
    markerW = enemy.rangex;
    markerH = enemy.rangey;
    break;
    case DIRECTION.DOWN: 
    markerX = enemy.x - enemy.width/2;
    markerY = enemy.y + enemy.height/2;
    markerW = enemy.rangey;
    markerH = enemy.rangex;
    break;
    case DIRECTION.UP: 
    markerX = enemy.x - enemy.width/2;
    markerY = enemy.y - enemy.height/2;
    markerW = enemy.rangey;
    markerH = enemy.rangex;
    break;
  }    

  
}

function doAttackOverlapWithPlayer(markerX,markerY,markerW,markerH) {
  var hitbox = game.add.sprite(markerX, markerY, 'empty');

  var watchRange = false;
  if (watchRange)
    hitbox.visible = true;
  else
    hitbox.visible = false;
  
  game.physics.enable(hitbox, Phaser.Physics.ARCADE);

  hitbox.enableBody = true;
  hitbox.body.x = markerX;
  hitbox.body.y = markerY;
  hitbox.height = markerH;
  hitbox.width = markerW;


  game.physics.arcade.overlap(hitbox, world.sprites['enemies'], function(hitbox,enemy) {
      enemy.damage(player.damage);
      if (enemy.health <= 0) {
        // console.log("i'm dead");
        var blood = game.add.emitter(enemy.x , enemy.y);
        blood.makeParticles('blood');
        blood.start(true, 450, 30, 30);

        var dropItem = world.sprites['plants'].create(enemy.x , enemy.y , 'baddie');
      }
      debugPrint("player hits " + enemy.id + " for " + player.damage + " points");
      debugPrint("HP: " + enemy.health + "/" + (enemy.health + player.damage));
    }
  );
  game.physics.arcade.overlap(hitbox, world.sprites['walkers'], function(hitbox,enemy) {
      enemy.damage(player.damage);
      if (enemy.health <= 0) {
        // console.log("i'm dead");
        var blood = game.add.emitter(enemy.x , enemy.y);
        blood.makeParticles('blood');
        blood.start(true, 450, 30, 30);

        var dropItem = world.sprites['plants'].create(enemy.x , enemy.y , 'baddie');
      }
      debugPrint("player hits " + enemy.id + " for " + player.damage + " points");
      debugPrint("HP: " + enemy.health + "/" + (enemy.health + player.damage));
    }
  );    
    
  if (!watchRange){
    hitbox.destroy();
  }
    
}

    
function doAttackOverlapWithWalker(enemy, markerX,markerY,markerW,markerH) {
  var hitbox = game.add.sprite(markerX, markerY, 'empty');

  var watchRange = false;
  if (watchRange)
    hitbox.visible = true;
  else
    hitbox.visible = false;
  
  game.physics.enable(hitbox, Phaser.Physics.ARCADE);

  hitbox.enableBody = true;
  hitbox.body.x = markerX;
  hitbox.body.y = markerY;
  hitbox.height = markerH;
  hitbox.width = markerW;


  game.physics.arcade.overlap(hitbox, player, function(hitbox,player) {
      player.damage(WALKER_DAMAGE);
      if (player.health <= 0) {
        // console.log("i'm dead");
        var blood = game.add.emitter(player.x , player.y);
        blood.makeParticles('blood');
        blood.start(true, 450, 30, 30);

        //var dropItem = world.sprites['plants'].create(enemy.x , enemy.y , 'baddie');
      }
      debugPrint("player hits " + enemy.id + " for " + player.damage + " points");
      debugPrint("HP: " + enemy.health + "/" + (enemy.health + player.damage));
    }
  );
    
  if (!watchRange){
    hitbox.destroy();
  }
    
}    


function bulletHitPlayer(bul) {
    sounds.play('hurt');

    debugPrint("player gets hit for " + BULLET_DAMAGE + " health points");

    bul.destroy();

    player.health -= BULLET_DAMAGE;
      if (player.alive && player.health <= 0) {
        player.kill();
      }
      else if(player.health <= 10) {
        debugPrint("you are gonna die!!!");
      }
};      



