define(['Phaser'], function(Phaser) {
    function Player(game, config) {
        this.config = config;
        this.game = game;
        this.name = config.name;
        this.active = false;
        this.tapped = new Phaser.Signal();
        this.numOfTaps = 0;
    }

    Player.prototype.load = function load() {
        this.game.load.image('fingerprint', './assets/fingerprint_62x90.png');
        this.timer = this.game.time.create(false); // TODO: move this somewhere appropriate... fails in constructor.
    };

    Player.prototype.draw = function draw(x, y) {
        this.sprite = this.game.add.sprite(x, y, 'fingerprint');
        this.sprite.inputEnabled = true;
        this.sprite.events.onInputDown.add(tapHandler.bind(this), this);

        this.key = this.game.input.keyboard.addKey(this.config.key);
        this.key.onDown.add(tapHandler, this);
    };

    Player.prototype.setActive = function setActive(state) {
        this.active = state;
        if(this.active) {
            console.log(this.name + ' Active');
        }
    };

    function tapHandler() {
        if(!this.active) {
            console.log(this.name + ' Jonesed it.');
            return;
        }

        this.numOfTaps++;

        if(!this.tapTimerEvent) {
            this.tapTimerEvent = this.timer.add(300, onTapTimerComplete, this);
            this.timer.start(0);
        }
    }

    function onTapTimerComplete() {
        this.timer.stop(true);
        this.tapTimerEvent = null;
        this.tapped.dispatch(this, this.numOfTaps);
        this.numOfTaps = 0;
    }

    return Player;
});