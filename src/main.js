define(['Phaser', 'players'], function(Phaser, players) {
    var game;

    function init(containerElement) {
        game = new Phaser.Game(800, 600, Phaser.AUTO, containerElement, {
            preload: preload,
            create: create,
            update: update
        });

        players.init(game);
    }

    function preload() {
        game.stage.backgroundColor = '#ffffff';
        players.load();
    }

    function create() {
        players.startPlaying();
    }

    function update() {}

    return {
        init: init
    };
});