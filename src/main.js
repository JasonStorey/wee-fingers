define(['Phaser', 'player'], function(Phaser, Player) {
    var game,
        player;

    function init(containerElement) {
        game = new Phaser.Game(800, 600, Phaser.AUTO, containerElement, {
            preload: preload,
            create: create,
            update: update
        });

        player = new Player(game);
    }

    function preload() {
        game.stage.backgroundColor = '#ffffff';
        player.init();
    }

    function create() {
        player.draw();
    }

    function update() {}

    return {
        init: init
    };
});