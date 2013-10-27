
    var enemies = [];

    // create an new instance of a pixi stage
    var stage = new PIXI.Stage(0x66FF99);

    // create a renderer instance
    var renderer = PIXI.autoDetectRenderer(1280, 720);

    // add the renderer view element to the DOM
    document.body.appendChild(renderer.view);

    requestAnimFrame( animate );

    // create a texture from an image path
    var texture = PIXI.Texture.fromImage("assets/player.png");
    var enemyTexture = PIXI.Texture.fromImage("assets/enemy.png");
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
        enemies.push(enemy);
    }, 100);


    function animate() {

        requestAnimFrame( animate );

        // just for fun, lets rotate mr rabbit a little
        //bunny.rotation += 0.1;

        for (var i = enemies.length - 1; i >= 0; i--) {
            var enemy = enemies[i];

            if (enemy.position.x > 1150) {
                console.log('SHIT!');
            } else {
                enemy.position.x += Math.random();
            }
        };

        // render the stage
        renderer.render(stage);
    }

    console.log('go');
    $('canvas').on('click', function(event) {
        console.log(event.clientX);

        var bullet =  new PIXI.Sprite(texture);
        bullet.position.x = event.clientX;
        bullet.position.y = event.clientY;
        stage.addChild(bullet);
        enemies.push(bullet);

    });

