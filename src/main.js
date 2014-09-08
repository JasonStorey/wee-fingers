define(['Phaser', 'player'], function(Phaser, Player) {
    var game,
        players = [];

    function init(containerElement) {
        game = new Phaser.Game(800, 600, Phaser.AUTO, containerElement, {
            preload: preload,
            create: create,
            update: update
        });

        players.push(new Player(game));
        players.push(new Player(game));
    }

    function preload() {
        game.stage.backgroundColor = '#ffffff';
        players.forEach(function(player) {
            player.init();
        });
    }

    function create() {
        players.forEach(function(player, index) {
            player.draw(100 * index, 0);
        });
    }

    function update() {}

    return {
        init: init
    };
});