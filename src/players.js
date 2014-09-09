define(['player'], function(Player) {
    var players = [],
        currentPlayerIndex = 0,
        playerIterator = 1;

    function init(game) {
        players.push(new Player(game, 'Player 1'));
        players.push(new Player(game, 'Player 2'));
        players.push(new Player(game, 'Player 3'));
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