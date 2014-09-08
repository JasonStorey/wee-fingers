define(['Phaser'], function(Phaser) {
    function Player(game, name) {
        this.game = game;
        this.name = name;
        this.active = false;
        this.tapped = new Phaser.Signal();
        this.doubleTapped = new Phaser.Signal();
        this.numOfTaps = 0;
    }

    Player.prototype.init = function init() {
        this.game.load.image('fingerprint', './assets/fingerprint_62x90.png');
        this.timer = this.game.time.create(false);
    };

    Player.prototype.draw = function draw(x, y) {
        this.sprite = this.game.add.sprite(x, y, 'fingerprint');
        this.sprite.inputEnabled = true;
        this.sprite.events.onInputDown.add(onInputDown.bind(this), this);
    };

    Player.prototype.setActive = function setActive(state) {
        this.active = state;
        if(this.active) {
            console.log(this.name + ' Active');
        }
    };

    function onInputDown(sprite, pointer) {
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
        dispatchTapEvent.call(this, this.numOfTaps);
        this.numOfTaps = 0;
    }

    function dispatchTapEvent(n) {
        if(n === 2) {
            this.doubleTapped.dispatch(this);
        } else {
            this.tapped.dispatch(this);
        }
    }

    return Player;
});