game.controle = {
    onKeyPush : function(event) {
        if (event.keyCode == game.keycode.KEYUP && game.playerTwo.aiOption == false) {
            game.playerTwo.goUp = true;
        }
        else if (event.keyCode == game.keycode.KEYDOWN && game.playerTwo.aiOption == false) {
            game.playerTwo.goDown = true;
        }

        if (event.keyCode == game.keycode.KEY_Z && game.playerOne.aiOption == false) {
            game.playerOne.goUp = true;
        }
        else if (event.keyCode == game.keycode.KEY_S && game.playerOne.aiOption == false) {
            game.playerOne.goDown = true;
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
