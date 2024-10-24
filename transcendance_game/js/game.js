const game = {
    begin : false,
    winValue : 1,
    winnerGame : "Nothing",
    groundWidth : 700,
    groundHeight : 400,
    groundColor: "#000000",
    netWidth : 6,
    netColor : "#FFFFFF",

    scorePosPlayer1 : 300,
    namePosPlayer1 : 125,
    scorePosPlayer2 : 365,
    namePosPlayer2 : 500,
    scorePlayer1 : 0,
    scorePlayer2 : 0,
    groundLayer : null,
    scoreLayer : null,
    playersBallLayer : null,
    speedPlayerDeplacement : 3,

    ball : {
        width : 12,
        height : 12,
        color : "#FFFFFF",
        posX : 200,
        posY : 200,
        posRecX : 0,
        posRecY : 0,
        radius : 6,
        directionX : 0.5,
        directionY : -0.5,
        speed : 1.5,

        start : function() {
            this.posX = game.groundWidth / 2;
            this.posY = game.groundHeight / 2;
            this.posRecX = this.posX - this.radius;
            this.posRecY = this.posY - this.radius;
            this.height = this.width = this.radius * 2;
            this.speed = 1.5;
            let randomDepart = game.geometry.randomDirection(0,4);
            if (randomDepart <= 1){
                this.directionX = 1 * this.speed;
                this.directionY = 1 * this.speed;
            }
            else if (randomDepart <= 2){
                this.directionX = 1 * this.speed;
                this.directionY = -1 * this.speed;
            }
            else if (randomDepart <= 3){
                this.directionX = -1 * this.speed;
                this.directionY = 1 * this.speed;
            }
            else if (randomDepart <= 4){
                this.directionX = -1 * this.speed;
                this.directionY = -1 * this.speed;
            }
        },
        move : function() {
            this.posX += this.directionX * this.speed;
            this.posY += this.directionY * this.speed;
            this.posRecX = this.posX - this.radius;
            this.posRecY = this.posY - this.radius;
        },
        bounce : function() {
            if (this.posRecX > game.groundWidth - this.width|| this.posRecX < 0)
                this.directionX = -this.directionX;
            if (this.posRecY > game.groundHeight - this.height || this.posRecY < 0)
                this.directionY = -this.directionY;
        },
        collide : function(anotherItem){
            if (!(this.posRecX >= anotherItem.posX + anotherItem.width || this.posRecX <= anotherItem.posX - this.width || this.posRecY >= anotherItem.posY + anotherItem.height || this.posRecY <= anotherItem.posY - this.height)) {
                return true;
            }
            return false;
        }
    },

    playerOne : {
        width : 10,
        height : 80,
        color : "#FFFFFF",
        posX : 10,
        posY : 200,
        goUp : false,
        goDown : false,
        aiOption : false,
        originalPosition : "left",
        playerName : "RandomOne",
        start : function(){
            this.posY = game.groundHeight / 2 - this.height / 2;
            this.goUp = false;
            this.goDown = false;
        }


    },

    playerTwo : {
        width : 10,
        height : 80,
        color : "#FFFFFF",
        posX : 680,
        posY : 200,
        goUp : false,
        goDown : false,
        originalPosition : "right",
        aiOption : false,
        playerName : "RandomTwo",
        start : function(){
            this.posY = game.groundHeight / 2 - this.height / 2;
            this.goUp = false;
            this.goDown = false;
        }
    },

    init : function() {
        this.initValue();
        this.groundLayer = game.display.createLayer("terrain", this.groundWidth, this.groundHeight, undefined, 0, "#000000", 0, 0);
        game.display.drawRectangleInLayer(this.groundLayer, this.netWidth, this.groundHeight, this.netColor, this.groundWidth/2 - this.netWidth/2, 0);
        
        this.scoreLayer = game.display.createLayer("score", this.groundWidth, this.groundHeight, undefined, 1, undefined , 0, 0);
            
        this.displayScore();

        this.playersBallLayer = game.display.createLayer("playerBall", this.groundWidth, this.groundHeight, undefined, 2, undefined, 0, 0);
        //game.display.drawTextInLayer(this.playersBallLayer, "PLAYERBALL", "10px Arial", "#FF0000", 100, 100);
        this.initialPosition();
        this.displayBall();
        this.displayPlayers();
        this.initKeyboard(game.controle.onKeyPush, game.controle.onKeyPull);
        if (this.playerTwo.aiOption == true)
            game.ia.setPlayerAndBall(this.playerTwo, this.ball);
    },

    displayScore : function() {
        //game.display.drawCircleInLayer(this.scoreLayer, "blue", 60, 50, 6);
        game.display.drawTextInLayer(this.scoreLayer, this.scorePlayer1, "60px Arial", "#FFFFFF", this.scorePosPlayer1, 55);
        game.display.drawTextInLayer(this.scoreLayer, this.scorePlayer2, "60px Arial", "#FFFFFF", this.scorePosPlayer2, 55);
        game.display.drawTextInLayer(this.scoreLayer, this.playerOne.playerName, "14px Arial", "#FFFFFF", this.namePosPlayer1, 30);
        game.display.drawTextInLayer(this.scoreLayer, this.playerTwo.playerName, "14px Arial", "#FFFFFF", this.namePosPlayer2, 30);
        
    },

    displayBall : function() {
        //game.display.drawRectangleInLayer(this.playersBallLayer, this.ball.width, this.ball.height, this.ball.color, this.ball.posX, this.ball.posY);
        game.display.drawCircleInLayer(this.playersBallLayer, this.ball.color, this.ball.posX, this.ball.posY, this.ball.radius);
    },

    displayPlayers : function() {
        game.display.drawRectangleInLayer(this.playersBallLayer, this.playerOne.width, this.playerOne.height, this.playerOne.color, this.playerOne.posX, this.playerOne.posY);
        game.display.drawRectangleInLayer(this.playersBallLayer, this.playerTwo.width, this.playerTwo.height, this.playerTwo.color, this.playerTwo.posX, this.playerTwo.posY);
    },

    moveBall : function(){
        this.ball.move();
        this.ball.bounce();
        this.displayBall();
    },

    clearLayer : function(targetLayer) {
        targetLayer.clear();
    },

    initKeyboard : function(onKeyDownFunction, onKeyUpFunction) {
        window.onkeydown = onKeyDownFunction;
        window.onkeyup = onKeyUpFunction;
    },

    movePlayers : function() {
        if (game.playerOne.goUp && game.playerOne.posY > 0){
            game.playerOne.posY -= this.speedPlayerDeplacement;
        }
        else if (game.playerOne.goDown && game.playerOne.posY < game.groundHeight - game.playerOne.height){
            game.playerOne.posY += this.speedPlayerDeplacement;
        }
        if (game.playerTwo.goUp && game.playerTwo.posY > 0){
            game.playerTwo.posY -= this.speedPlayerDeplacement;
        }
        else if (game.playerTwo.goDown && game.playerTwo.posY < game.groundHeight - game.playerTwo.height){
            game.playerTwo.posY += this.speedPlayerDeplacement;
        }
    },

    collideBallWithPlayersAndAction : function() {
        let multiplicateurModifier = 1.1;
        if (this.ball.collide(game.playerOne)) {
            this.ball.speed *= multiplicateurModifier;
            let direc = this.resultCollideRacketVerticalOnBall(game.playerOne);
            this.ball.directionX = direc[0];
            this.ball.directionY = direc[1];
            //game.ball.directionX = -game.ball.directionX;
        }
        if (this.ball.collide(game.playerTwo)) {
            this.ball.speed *= multiplicateurModifier;
            let direc = this.resultCollideRacketVerticalOnBall(game.playerTwo);
            this.ball.directionX = direc[0];
            this.ball.directionY = direc[1];
            //game.ball.directionX = -game.ball.directionX;
        }
    },

    resultCollideRacketVerticalOnBall : function(anotherItem) {
        let ctrBallX = anotherItem.posX + anotherItem.width / 2;
        let ctrBallY = anotherItem.posY + anotherItem.height / 2;
        let angle = (game.geometry.lineAngle(ctrBallX, ctrBallY, this.ball.posX, this.ball.posY) + 360) % 360;
        if (80 <= angle && angle <= 90) {
            angle = 80;
        } else if (90 <= angle && angle <= 100) {
        angle = 100;
        } else if (260 <= angle && angle <= 270) {
        angle = 260;
        } else if (270 <= angle && angle <= 280) {
        angle = 280;
        }
        return (game.geometry.pointTranslate(0, 0, angle, this.ball.speed))
    },

    initialPosition : function(){
        game.ia.i  = 0;
        this.ball.start();
        this.playerOne.start();
        this.playerTwo.start();
    },

    playerScoring : function() {
        if (this.ball.posRecX <= 0){
            this.clearLayer(this.scoreLayer);
            this.scorePlayer2 += 1;
            game.initialPosition()
            game.displayScore(this.scorePlayer1, this.scorePlayer2);
        }
        else if (this.ball.posRecX >= game.groundWidth - this.ball.width){
            this.clearLayer(this.scoreLayer);
            this.scorePlayer1 += 1;
            game.initialPosition();
            game.displayScore(this.scorePlayer1, this.scorePlayer2);
        }
    },

    winCondition : function(){
        if (this.scorePlayer1 == this.winValue)
        {
            winnerGame = this.playerOne.playerName;
            return (true);
        }
        else if (this.scorePlayer2 == this.winValue)
        {
            winnerGame = this.playerTwo.playerName;
            return (true);
        }
        return(false);
    },
    
    initValue : function(){
        const gameMode = sessionStorage.getItem('gameMode'); // 1-2-3-4
        const playerOneName = sessionStorage.getItem('playerOneName'); // player one name
        const playerTwoName = sessionStorage.getItem('playerTwoName'); // player two name
        //const gameBackground = sessionStorage.getItem('gameBackground');
        const gamePoints = sessionStorage.getItem('gamePoints'); // 9 max point
        const ballSize = sessionStorage.getItem('ballSize'); //
        const padSize = sessionStorage.getItem('padSize'); 
        if (gameMode != undefined)
        {
            switch (gameMode){
                case 1:
                    this.playerTwo.aiOption = true;
                    break;
                case 2:
                    break;
                case 3:
                    this.playerTwo.aiOption = true;
                    break;
                case 4:
                    break;
            }
        }
        if (playerOneName != undefined)
        {
            this.playerOne.playerName = playerOneName;
        }
        if (playerTwoName != undefined)
        {
            this.playerTwo.playerName = playerTwoName;
        }
        if (gamePoints != undefined)
        {
            this.winValue = gamePoints;
        }
        if (ballSize != undefined)
        {
            if (ballSize == 1)
                this.ball.height = this.ball.width = 6;
            if (ballSize == 2)
                this.ball.height = this.ball.width = 12;
            else if (ballSize == 3)
                this.ball.height = this.ball.width = 18;
        }
        if (padSize != undefined)
        {
            if (padSize == 1)
                this.playerOne.height = this.playerTwo.height = 60;
            else if (padSize == 2)
                this.playerOne.height = this.playerTwo.height = 80;
            else if (padSize == 3)
                this.playerOne.height = this.playerTwo.height = 100;
        }

    }
};