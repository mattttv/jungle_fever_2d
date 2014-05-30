
function setupPlayer(){
    player   = game.add.sprite(64, 0.5, 'girl');
    player.attack_happened = false;
    player.last = DIRECTION.DOWN;
    player.state = PLAYER_STATE.IDLE

    player.animations.add('up', [4, 0], 8, false);
    player.animations.add('right', [5, 1], 8, false);
    player.animations.add('down', [6, 2], 8, false);
    player.animations.add('left', [7, 3], 8, false);

    player.animations.add('idleup', [0], 10, true);
    player.animations.add('idleright', [1], 10, true);
    player.animations.add('idledown', [2], 10, true);
    player.animations.add('idleleft', [3], 10, true); 

    player.animations.add('attack_up', [12, 8], 5, false);
    player.animations.add('attack_right', [13, 9], 5, false);
    player.animations.add('attack_down', [14, 10], 5, false);
    player.animations.add('attack_left', [15, 11], 5, false);

    player.worldEntity = playermodel;

    //this is important or else the char wont turn!
    player.animations.play('down');

    game.camera.follow(player);
    
};

function setupMusic() {
    music = game.add.audio('village',1,true);

    if (START_MUSIC) {
        music.play('',0,1,true);
    }   
};

function setupPhysics() {
        // enable physics for collision etc.
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.enable(player, Phaser.Physics.ARCADE);
        player.body.collideWorldBounds = true;
        player.body.bounce.set(1);
        // reduce player body size - collision happens not as far away ? 
        player.body.offset.x=20;
        player.body.offset.y=30;
        player.body.height-=35;
        player.body.width-=35;
    }

    function setupFullScreen() {
    // Maintain aspect ratio
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;

    game.input.onDown.add(gofull, this);
};

function gofull() {
    game.scale.startFullScreen();
};

function setupAndStartRain() {
    emitter = game.add.emitter(game.world.centerX, 0, 400);

    emitter.width = game.world.width;
            // emitter.angle = 30; // uncomment to set an angle for the rain.

            emitter.makeParticles('rain');

            emitter.minParticleScale = 0.1;
            emitter.maxParticleScale = 0.5;

            emitter.setYSpeed(300, 500);
            emitter.setXSpeed(-5, 5);

            emitter.minRotation = 0;
            emitter.maxRotation = 0;

            emitter.start(false, 1600, 5, 0);
        };     

        function setupKeys () {
            cursors = game.input.keyboard.createCursorKeys();
            attackKey = game.input.keyboard.addKey(Phaser.Keyboard.X);
            attackKey.onDown.add(doAttack, this);
            
            shiftKey = game.input.keyboard.addKey(Phaser.Keyboard.C);
            
            dashKey = game.input.keyboard.addKey(Phaser.Keyboard.V);
            dashKey.onDown.add(doDash, this);
        };   
