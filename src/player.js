define([], function() {
    function Player(game, name) {
        this.game = game;
        this.name = name;
        this.active = false;
        this.tapped = new Phaser.Signal();
    }

    Player.prototype.init = function init() {
        this.game.load.image('fingerprint', './assets/fingerprint_62x90.png');
    };

    Player.prototype.draw = function draw(x, y) {
        this.sprite = this.game.add.sprite(x, y, 'fingerprint');
        this.sprite.inputEnabled = true;
        this.sprite.events.onInputUp.add(onInputUp.bind(this), this);
    };

    Player.prototype.setActive = function setActive(state) {
        this.active = state;
        if(state)
            console.log(this.name + ' Active');
    };

    function onInputUp() {
        if(this.active) {
            this.tapped.dispatch(this);
        }
    }

    return Player;
});