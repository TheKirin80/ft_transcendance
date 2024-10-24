game.controle = {
    onKeyPush : function(event) {
        if (event.keyCode == game.keycode.KEYUP && game.playerTwo.aiOption == false && game.begin == true) {
            game.playerTwo.goUp = true;
        }
        else if (event.keyCode == game.keycode.KEYDOWN && game.playerTwo.aiOption == false && game.begin == true) {
            game.playerTwo.goDown = true;
        }

        if (event.keyCode == game.keycode.KEY_Z && game.playerOne.aiOption == false && game.begin == true) {
            game.playerOne.goUp = true;
        }
        else if (event.keyCode == game.keycode.KEY_S && game.playerOne.aiOption == false && game.begin == true) {
            game.playerOne.goDown = true;
        }
        
        if (event.keyCode == game.keycode.KEY_Space && game.begin == false)
        {
            game.begin = true;
        }
        if (event.keyCode == game.keycode.KEY_Space && game.winCondition() == true)
        {
            sessionStorage.setItem("winnerGame", game.winnerGame);
            game.clearLayer(game.playersBallLayer);
            document.body.removeChild(game.playersBallLayer.canvas);
            game.clearLayer(game.scoreLayer);
            document.body.removeChild(game.scoreLayer.canvas);
            game.clearLayer(game.groundLayer);
            document.body.removeChild(game.groundLayer.canvas);
        }
        if (event.keyCode == game.keycode.KEY_IA)
        {
            if (game.playerTwo.aiOption == true)
                game.playerTwo.aiOption = false;
            else
            game.playerTwo.aiOption = true;
        }
    },
    onKeyPull : function(event){
        if (event.keyCode == game.keycode.KEYUP && game.playerTwo.aiOption == false) {
            game.playerTwo.goUp = false;
        }
        else if (event.keyCode == game.keycode.KEYDOWN && game.playerTwo.aiOption == false) {
            game.playerTwo.goDown = false;
        }
        if (event.keyCode == game.keycode.KEY_Z && game.playerOne.aiOption == false) {
            game.playerOne.goUp = false;
        }
        else if (event.keyCode == game.keycode.KEY_S && game.playerOne.aiOption == false) {
            game.playerOne.goDown = false;
        }
    }
}
