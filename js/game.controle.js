game.controle = {
    onKeyPush : function(event) {
        if (event.keyCode == game.keycode.KEYUP) {
            game.playerTwo.goUp = true;
        }
        else if (event.keyCode == game.keycode.KEYDOWN) {
            game.playerTwo.goDown = true;
        }

        if (event.keyCode == game.keycode.KEY_Z) {
            game.playerOne.goUp = true;
        }
        else if (event.keyCode == game.keycode.KEY_S) {
            game.playerOne.goDown = true;
        }
    },
    onKeyPull : function(event){
        if (event.keyCode == game.keycode.KEYUP) {
            game.playerTwo.goUp = false;
        }
        else if (event.keyCode == game.keycode.KEYDOWN) {
            game.playerTwo.goDown = false;
        }
        if (event.keyCode == game.keycode.KEY_Z) {
            game.playerOne.goUp = false;
        }
        else if (event.keyCode == game.keycode.KEY_S) {
            game.playerOne.goDown = false;
        }
    }
}
