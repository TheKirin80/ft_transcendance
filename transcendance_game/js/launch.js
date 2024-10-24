function launchGame() {
    const gameMode = sessionStorage.getItem('gameMode');
    const playerName = sessionStorage.getItem('playerName');
    const gameBackground = sessionStorage.getItem('gameBackground');
    const gamePoints = sessionStorage.getItem('gamePoints');
    const ballSize = sessionStorage.getItem('ballSize');
    let requestAnimId;

    let initiate = function() {
        game.init();
        requestAnimId = window.requestAnimationFrame(main);
    };

    let main = function() {
        game.clearLayer(game.playersBallLayer);
        game.movePlayers();
        game.displayPlayers();
        game.moveBall();
        game.collideBallWithPlayersAndAction();
        game.playerScoring();

        if (game.winCondition() == false) {
            requestAnimId = window.requestAnimationFrame(main);
        }
    };

    initiate();
}
