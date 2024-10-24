game.ia = {
    margeCenter : game.groundHeight / 4,
    margePredict : 20,
    margeFollow : 20,
    player : null,
    ball : null,
    i : 0,
    setPlayerAndBall : function(player, ball) {
        // game.display.drawTextInLayer(game.scoreLayer, "this.ball.posX", "10px Arial", "#FF0000", 100, 100);
        this.player = player;
        this.ball = ball;
    },
    moveIa : function(player, ball){
        this.setPlayerAndBall(player, ball);
        //game.clearLayer(game.scoreLayer);
        
        //game.display.drawTextInLayer(game.scoreLayer, this.ball.posX, "10px Arial", "#FF00FF", 100, 320);
        //game.display.drawTextInLayer(game.scoreLayer, game.groundWidth / 2, "10px Arial", "#FF00FF", 100, 330);
        if (this.i % 60 == 0)
        {
            if (this.ball.directionX >= 0){
                if (this.player.originalPosition == "left" )
                {
                    //game.display.drawTextInLayer(game.scoreLayer, "Cas position left and go center", "10px Arial", "#FF0000", 100, 100);
                    this.goCenter();
                }
                if (this.player.originalPosition == "right" && this.ball.posX >= game.groundWidth / 2)
                {
                    //game.display.drawTextInLayer(game.scoreLayer, "Cas position right and go follow", "10px Arial", "#FF0000", 100, 150);
                    //this.followBall();
                    this.predictBall(this.ball.posRecX, this.ball.posRecY, this.ball.directionX, this.ball.directionY);
                }
            }
            else
            {
                if (this.player.originalPosition == "left" && this.ball.posX <= game.groundWidth / 2)
                {
                    //game.display.drawTextInLayer(game.scoreLayer, "Cas position right and go follow", "10px Arial", "#FF00FF", 100, 100);
                    //this.followBall();
                    this.predictBall(this.ball.posRecX, this.ball.posRecY, this.ball.directionX, this.ball.directionY);
                }
                if (this.player.originalPosition == "right")
                {
                    //game.display.drawTextInLayer(game.scoreLayer, "Cas position right and go center", "10px Arial", "#FF00FF", 100, 150);
                    this.goCenter();
                }
            }
        }
        this.i = this.i + 1;
        //game.display.drawTextInLayer(game.scoreLayer, this.i, "10px Arial", "#FFFF00", 100, 200);
    },

    // goCenter : function(){
    //     if (this.player.originalPosition == "left")
    //     {
    //         game.playerOne.goDown = false;
    //         game.playerOne.goUp = false;
    //         if (this.player.posY + this.player.height / 2 > game.groundHeight / 2 + this.margeCenter)
    //             game.playerOne.goUp = true;
    //         else if (this.player.posY + this.player.height / 2 < game.groundHeight / 2 - this.margeCenter)
    //             game.playerOne.goDown = true;
    //     }
    //     if (this.player.originalPosition == "right")
    //     {
    //         game.playerTwo.goDown = false;
    //         game.playerTwo.goUp = false;
    //         if (this.player.posY + this.player.height / 2 > game.groundHeight / 2 + this.margeCenter)
    //             game.playerTwo.goUp = true;
    //         else if (this.player.posY + this.player.height / 2 < game.groundHeight / 2 - this.margeCenter)
    //             game.playerTwo.goDown = true;
    //     }
    // },

    // followBall : function(){
    //     if (this.player.originalPosition == "left")
    //     {
    //         game.playerOne.goDown = false;
    //         game.playerOne.goUp = false;
    //         if (this.player.posY > this.ball.posY + this.ball.height / 2 + this.margeFollow)
    //             game.playerOne.goUp = true;
    //         else if (this.player.posY < this.ball.posY - this.ball.height / 2 - this.margeFollow)
    //             game.playerOne.goDown = true;
    //     }
    //     if (this.player.originalPosition == "right")
    //     {
    //         game.playerTwo.goDown = false;
    //         game.playerTwo.goUp = false;
    //         if (this.player.posY > this.ball.posY + this.ball.height / 2 + this.margeFollow)
    //             game.playerTwo.goUp = true;
    //         else if (this.player.posY < this.ball.posY - this.ball.height / 2 - this.margeFollow)
    //             game.playerTwo.goDown = true;
    //     }
    // }
    goCenter : function(){
        //game.display.drawTextInLayer(game.scoreLayer, "je suis dans center", "10px Arial", "#FF00FF", 100, 300);
        if (this.player.originalPosition == "left")
        {
            this.player.goDown = false;
            this.player.goUp = false;
            if (this.player.posY + this.player.height / 2 > game.groundHeight / 2 + this.margeCenter)
                this.player.goUp = true;
            else if (this.player.posY + this.player.height / 2 < game.groundHeight / 2 - this.margeCenter)
                this.player.goDown = true;
        }
        if (this.player.originalPosition == "right")
        {
            this.player.goDown = false;
            this.player.goUp = false;
            if (this.player.posY + this.player.height / 2 > game.groundHeight / 2 + this.margeCenter)
                this.player.goUp = true;
            else if (this.player.posY + this.player.height / 2 < game.groundHeight / 2 - this.margeCenter)
                this.player.goDown = true;
        }
    },

    followBall : function(){
        if (this.player.originalPosition == "left")
        {   
            this.player.goDown = false;
            this.player.goUp = false;
            if (this.player.posY > this.ball.posY + this.ball.height / 2 + this.margeFollow)
                this.player.goUp = true;
            else if (this.player.posY < this.ball.posY - this.ball.height / 2 - this.margeFollow)
                this.player.goDown = true;
        }
        if (this.player.originalPosition == "right")
        {
            this.player.goDown = false;
            this.player.goUp = false;
            if (this.player.posY + this.player.height / 2 > this.ball.posY + this.ball.height / 2 + this.margeFollow)
                this.player.goUp = true;
            else if (this.player.posY + this.player.height / 2 < this.ball.posY - this.ball.height / 2 - this.margeFollow)
                this.player.goDown = true;
        }
    },
    predictBall : function(posPredictX, posPredictY, directionPredictX, directionPredictY)
    {
        this.player.goDown = false;
        this.player.goUp = false;
        var limit_y = directionPredictY < 0 ? 0 : game.groundHeight - this.ball.height;
        var time_y = (limit_y - posPredictY) / directionPredictY;
        var limit_x  = directionPredictX < 0 ? game.playerOne.posX + game.playerOne.width : game.playerTwo.posX;
        var predict_x = posPredictX + (directionPredictX * time_y);
        if (directionPredictX < 0 && predict_x < limit_x)
        {
            var time_x = (limit_x - posPredictX) / directionPredictX;
            var predict_y = posPredictY + (directionPredictY * time_x);
            if (this.player.posY + this.player.height / 2 > predict_y + this.margePredict)
                this.player.goUp = true;
            else if (this.player.posY + this.player.height / 2 < predict_y - this.margePredict)
                this.player.goDown = true;
        }
        else if (directionPredictX > 0 && predict_x > limit_x)
        {
            var time_x = (limit_x - posPredictX) / directionPredictX;
            var predict_y = posPredictY + (directionPredictY * time_x);
            if (this.player.posY + this.player.height / 2 > predict_y + this.margePredict)
                this.player.goUp = true;
            else if (this.player.posY + this.player.height / 2 < predict_y - this.margePredict)
                this.player.goDown = true;
        }
        else
        {
            this.predictBall(predict_x, limit_y, directionPredictX, -directionPredictY);
        }
    }
    
}