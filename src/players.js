define(['player'], function(Player) {
    var players = [],
        currentPlayerIndex = 0;

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

            player.tapped.add(function(tappedPlayer) {
                tappedPlayer.setActive(false);
                activateNextPlayer();
            });

            player.doubleTapped.add(function(tappedPlayer) {
                tappedPlayer.setActive(false);
                activatePreviousPlayer();
            });

            player.draw(100 * index, 0);
        });
    }

    function activateNextPlayer() {
        currentPlayerIndex++;
        if(currentPlayerIndex === players.length) {
            currentPlayerIndex = 0;
        }
        players[currentPlayerIndex].setActive(true);
    }

    function activatePreviousPlayer() {
        currentPlayerIndex--;
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