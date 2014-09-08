define([], function() {
    function Player(game) {
        this.game = game;
    }

    Player.prototype.init = function init() {
        this.game.load.image('fingerprint', './assets/fingerprint_62x90.png');
    };

    Player.prototype.draw = function draw() {
        this.game.add.sprite(0, 360, 'fingerprint');
    };

    return Player;
});