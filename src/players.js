define(['Phaser', 'player'], function(Phaser, Player) {
    var players = [],
        currentPlayerIndex = 0,
        playerIterator = 1;

    function init(game) {
        var KEYS = [
            Phaser.Keyboard.ONE,
            Phaser.Keyboard.TWO,
            Phaser.Keyboard.THREE,
            Phaser.Keyboard.FOUR,
            Phaser.Keyboard.FIVE
        ];

        for(var i = 0; i < 5; i++) {
            players.push(new Player(game, {
                name:'Player ' + (i + 1),
                key: KEYS[i]
            }));
        }
    }

    function load() {
        players.forEach(function(player) {
            player.load();
        });
    }

    function startPlaying() {
        players.forEach(function(player, index) {
            if(index === currentPlayerIndex) {
                player.setActive(true);
            }

            player.tapped.add(function(tappedPlayer, n) {
                tappedPlayer.setActive(false);
                if(n === 2) {
                    playerIterator *= -1;
                }
                activateNextPlayer(playerIterator);
            });

            player.draw(100 * index, 0);
        });
    }

    function activateNextPlayer(iterator) {
        currentPlayerIndex += iterator;

        if(currentPlayerIndex === players.length) {
            currentPlayerIndex = 0;
        }

        if(currentPlayerIndex === -1) {
            currentPlayerIndex = players.length - 1;
        }

        players[currentPlayerIndex].setActive(true);
    }

    return {
        init: init,
        load: load,
        startPlaying: startPlaying
    };
});