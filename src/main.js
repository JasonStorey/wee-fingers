define(['Phaser'], function(Phaser) {
    var game;

    function init(containerElement) {
        game = new Phaser.Game(800, 600, Phaser.AUTO, containerElement, {
            preload: preload,
            create: create,
            update: update
        });
    }

    function preload() {
        game.stage.backgroundColor = '#ffffff';
        game.load.image('fingerprint', './assets/fingerprint_62x90.png');
    }
    function create() {
        game.add.sprite(0, 360, 'fingerprint');
    }
    function update() {}

    return {
        init: init
    };
});