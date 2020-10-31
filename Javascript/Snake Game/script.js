window.onload = function(){
    
    /*Attributs*/
    var canvas;
    var canvasWidth = 900;
    var canvasHeight = 600;
    var blockSize = 30;
    var ctx;
    var delay = 100;
    var snake;
    var apple;
    var widthInBlocks = canvasWidth/blockSize;
    var heightInBlocks = canvasHeight/blockSize;
    var score;
    var timeOut;

    init();

    function init(){
        /*Création du Canvas*/
        canvas = document.createElement('canvas');
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.border = "20px solid gray";
        canvas.style.margin = "50px auto";
        canvas.style.display = "block";
        canvas.style.backgroundColor = "#ddd";
        document.body.appendChild(canvas);
        /*Création du rectangle*/
        ctx = canvas.getContext('2d'); 
        snake = new Snake([[6,4],[5,4],[4,4]],"right");
        apple = new Apple([10,10]);
        score = 0;
        refreshCanvas();
    }

    function refreshCanvas(){
        snake.advance();
        if(snake.checkCollision()){
            gameOver();
        }
        else {
            if (snake.isEatingApple(apple)){
                // LE SERPENT A MANGÉ LA POMME
                snake.ateApple = true;
                score++;
                do{
                    apple.setNewPosition();
                }
                while(apple.isOnSnake(snake));
            }
            ctx.clearRect(0,0,canvas.width,canvas.height);
            drawScore();
            snake.draw();
            apple.draw();
            timeOut = setTimeout(refreshCanvas,delay);
        }
    }

    function drawBlock(ctx,position){
        var x = position[0]*blockSize;
        var y = position[1]*blockSize;
        ctx.fillRect(x,y,blockSize,blockSize);
    }

    function gameOver(){
        ctx.save();
        ctx.font = "bold 70px sans-serif";
        ctx.fillStyle = "#000";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.strokeStyle = "white";
        ctx.lineWidth = 5;
        var centerX = canvasWidth/2;
        var centerY = canvasHeight/2;
        ctx.strokeText("GAME OVER",centerX,centerY-180);
        ctx.fillText("GAME OVER",centerX,centerY-180);
        ctx.font = "bold 30px sans-serif";
        ctx.strokeText("Appuyer sur la touche espace pour rejouer",centerX,centerY-120)
        ctx.fillText("Appuyer sur la touche espace pour rejouer",centerX,centerY-120);
        ctx.restore();  
    }

    function restart(){
        snake = new Snake([[6,4],[5,4],[4,4]],"right");
        apple = new Apple([10,10]);
        score = 0;
        clearTimeout(timeOut);
        refreshCanvas();
    }

    function drawScore(){
        ctx.save();
        ctx.font = "bold 200px sans-serif";
        ctx.fillStyle = "gray";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        var centerX = canvasWidth/2;
        var centerY = canvasHeight/2;
        ctx.fillText(score.toString(),centerX,centerY);
        ctx.restore();
    }

    /*Constructeur du serpent*/
    function Snake(body, direction){
        this.body = body;
        this.direction = direction;
        this.ateApple = false;
        /*Fonction dessiner*/
        this.draw = function(){
            ctx.save();
            ctx.fillStyle = "#ff0000";
            for(var i=0; i<this.body.length;i++){
                drawBlock(ctx,this.body[i]);
            }
            ctx.restore();
        };
        /*Fonction avancer*/
        this.advance = function(){
            var nextPosition = this.body[0].slice();
            switch(this.direction){
                case "left":
                    nextPosition[0]--;
                    break;
                case "right":
                    nextPosition[0]++;
                    break;
                case "up":
                    nextPosition[1]--;
                    break;
                case "down":
                    nextPosition[1]++;
                    break;
                default:
                    throw("Invalid Direction");
            }
            this.body.unshift(nextPosition);
            if (!this.ateApple){
                this.body.pop()
            }
            else{
                this.ateApple = false;
            }
        }
        this.setDirection = function(newDirection){
            var allowedDirections;
            switch(this.direction){
                case "left":
                case "right":
                    allowedDirections = ["up","down"];
                    break;
                case "up":
                case "down":
                    allowedDirections = ["left","right"];
                    break;
            }
            if(allowedDirections.indexOf(newDirection)>-1){
                this.direction = newDirection;
            }
        }
        this.checkCollision = function(){
            var wallCollision = false;
            var snakeCollision = false;
            var head = this.body[0].slice();
            var rest = this.body.slice(1);
            var headX =  head[0];
            var headY = head[1];
            var minX = 0;
            var minY = 0;
            var maxX = widthInBlocks-1;
            var maxY = heightInBlocks-1;
            var isNotBetweenHorizontalWalls = headX < minX || headX > maxX;
            var isNotBetweenVerticalWalls = headY < minY || headY > maxY;
            /*Le serpent s'est-il pris un mur ?*/
            if(isNotBetweenVerticalWalls || isNotBetweenHorizontalWalls){
                wallCollision = true;
            }
            /*Le serpent s'est-il marché dessus ?*/
            for(var i=0;i<rest.length;i++){
                if(headX==rest[i][0] && headY==rest[i][1]){
                    snakeCollision = true;
                }
            }
            return wallCollision || snakeCollision;
        }
        this.isEatingApple = function(appleToEat){
            var head = this.body[0];
            if(head[0]==appleToEat.position[0] && head[1]==appleToEat.position[1]){
                return true;
            }
            else{
                return false;
            }
        }
    }

    document.onkeydown = function handleKeyDown(e){
        var key = e.keyCode;
        var newDirection;
        switch(key){
            /*Flèche de gauche*/
            case 37:
                newDirection = "left";
                break;
            /*Flèche du haut*/
            case 38:
                newDirection = "up";
                break;
            /*Flèche de droite*/
            case 39:
                newDirection = "right";
                break;
            /*Flèche du bas*/
            case 40:
                newDirection = "down";
                break;
            case 32:
                restart()
                return;
            default:
                return; 
        }
        snake.setDirection(newDirection);
    }

    /*Constructeur de la pomme*/
    function Apple(position){
        this.position = position;
        this.draw = function(){
            ctx.save();
            ctx.fillStyle="#33cc33";
            ctx.beginPath();
            var radius = blockSize/2;
            var x = this.position[0]*blockSize + radius;
            var y = this.position[1]*blockSize + radius;
            ctx.arc(x,y,radius,0,Math.PI*2,true);
            ctx.fill();
            ctx.restore();
        }
        this.setNewPosition = function(){
            var newX = Math.round(Math.random()*(widthInBlocks-1));
            var newY = Math.round(Math.random()*(heightInBlocks-1));
            this.position = [newX,newY];
        }
        this.isOnSnake = function(snakeToCheck){
            var isOnSnake = false;
            for(var i=0;i<snakeToCheck.body.length;i++){
                if(this.position[0]==snakeToCheck.body[i][0] && this.position[1]==snakeToCheck.body[i][1]){
                    isOnSnake = true;
                }
            }
            return isOnSnake;
        }
    }
}