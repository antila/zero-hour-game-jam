
    var enemies = [];
    var bullets = [];

    // create an new instance of a pixi stage
    var interactive = true;
    var stage = new PIXI.Stage(0x205309, interactive);

    // create a renderer instance
    var renderer = PIXI.autoDetectRenderer(1280, 720);

    // add the renderer view element to the DOM
    document.body.appendChild(renderer.view);

    requestAnimFrame( animate );

    // create a texture from an image path
    var texture = PIXI.Texture.fromImage("assets/player.png");
    var enemyTexture = PIXI.Texture.fromImage("assets/enemy.png");
    var bulletTexture = PIXI.Texture.fromImage("assets/bullet.png");
    var bloodTexture = PIXI.Texture.fromImage("assets/blood.png");

    // create a new Sprite using the texture
    var player = new PIXI.Sprite(texture);

    // center the sprites anchor point
    player.anchor.x = 0.5;
    player.anchor.y = 0.5;
    player.width = 64;
    player.height = 64;

    // move the sprite t the center of the screen
    player.position.x = 1200;
    player.position.y = 720/2;

    stage.addChild(player);

    setInterval(function() {
        var enemy =  new PIXI.Sprite(enemyTexture);
        enemy.position.x = -30;
        enemy.position.y = Math.random() * 720;
        enemy.width = 32;
        enemy.height = 32;
        stage.addChild(enemy);
        enemy.buttonMode = true;
        enemy.interactive = true;

        enemy.mouseover = function(data){
            if (mouseDown === true) {
                enemy.killed = true;
                enemy.killCount = 20;
            }
        }
        enemies.push(enemy);
    }, 100);

    var lost = false;

    function animate() {

        requestAnimFrame( animate );

        for (var i = enemies.length - 1; i >= 0; i--) {
            var enemy = enemies[i];

            if (enemy.position.x > 1150) {
                if (lost === false) {
                    alert('You lost');
                    window.location = 'http://0hgame.eu/';
                    lost = true;
                }
            } else {
                enemy.position.x += Math.random();
            }

            if (enemy.killed === true) {
                enemy.position.x -= enemy.killCount;
                enemy.killCount = Math.floor(enemy.killCount / 2);
            }

            if (enemy.killCount === 0) {
                enemies.splice(enemies.indexOf(enemy), 1);
                stage.removeChild(enemy);

                var blood =  new PIXI.Sprite(bloodTexture);
                blood.position.x = enemy.position.x;
                blood.position.y = enemy.position.y;
                blood.rotation = Math.random() * 360; // OR WAS IT RADIANS???
                blood.scale = new PIXI.Point(Math.random() * 3, Math.random() * 3);
                stage.addChild(blood);
            }
        };

        if (mouseDown === true) {
            var bullet =  new PIXI.Sprite(bulletTexture);
            bullet.position.x = mouseX + (Math.random() * 16 - 32) + 16;
            bullet.position.y = mouseY + (Math.random() * 16 - 32) + 16;
            stage.addChild(bullet);

            setTimeout(function() {
                stage.removeChild(bullet);
            }, 40);
        }

        player.position.y = mouseY;

        // render the stage
        renderer.render(stage);
    }

    var mouseY = 0;
    $(document).on('mousemove', function(event) {
        //console.log(event.pageY);
        mouseX = event.pageX;
        mouseY = event.pageY;
    });

    var mouseDown = false;
    $(document).on('mousedown', function(event) {
        mouseDown = true;
    });
    $(document).on('mouseup', function(event) {
        mouseDown = false;
    });


