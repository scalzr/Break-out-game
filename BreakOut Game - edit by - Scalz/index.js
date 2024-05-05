let canvas = document.getElementById('game'),
        ctx = canvas.getContext('2d'),
    ballRadius = 9,
    x = canvas.width / (Math.floor(Math.random() * Math.random() * 10) + 3),
    y = canvas.height - 40,
    dx = 2,
    dy = -2;

// corpo da barrinha:
let paddleHeight = 12,
    paddleWidth = 72;
// posição inicial da barrinha:
let paddleX = (canvas.width - paddleWidth) / 2;

// tijolos //
let rowCount = 5,
    columnCount = 9,
    brickWidth = 54,
    brickHeight = 18,
    brickPadding = 12,
    topOffset = 40,
    leftOffset = 33,
    score = 0;
// variedade dos tijolos:
let bricks = [];
for (let c = 0; c < columnCount; c++){
    bricks[c] = [];
    for(let r = 0; r < rowCount; r++){ 
        // posição dos tijolos:
        bricks[c][r] = { x: 0, y: 0, status: 1};
    }
}

// função de mover o mouse ( eventListener ) e função:
document.addEventListener("mousemove", mouseMoveHandler, false);

// mover a barrinha com o mouse:
function mouseMoveHandler(e){
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width){
        paddleX = relativeX - paddleWidth / 2;
    }
}
// desenhar barrinha:
function drawPaddle() {
    ctx.beginPath();
    ctx.roundRect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight, 30);
    ctx.fillStyle = '#333';
    ctx.fill();
    ctx.closePath();
}

// desenhar bola:
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#333';
    ctx.fill();
    ctx.closePath();
}

// desenhar tijolos:
function drawBricks() {
    for (let c = 0; c < columnCount; c++) {
        for (let r = 0; r < rowCount; r++) {
            if (bricks[c][r].status === 1) {
                let brickX = (c * (brickWidth + brickPadding)) + leftOffset;
                let brickY = (r * (brickHeight + brickPadding)) + topOffset;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.roundRect(brickX, brickY, brickWidth, brickHeight, 30);
                ctx.fillStyle = '#333';
                ctx.fill();
                ctx.closePath();                
            }
        }
    }
}

// track score:
function trackScore(){
    ctx.font = 'bold 16px sans-serif';
    ctx.fillStyle = '#333';
    ctx.fillText('Score : ' + score, 8, 24);
}

// check bola acertar os tijolos:
function hitDetection(){
    for (let c = 0; c < columnCount; c++){
        for (let r = 0; r < rowCount; r++) {
            let b = bricks[c][r];
            if(b.status === 1){
                if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight){
                    dy = -dy;
                    b.status = 0;
                    score++;
                    // checar vitória:
                    if(score === rowCount * columnCount){
                        alert('You Win!');
                        document.location.reload();    
                    }   
                }
            }
        }
    }
}

// main function:
function init(){
    ctx.clearRect(0,0, canvas.width, canvas. height);
    trackScore();
    drawBricks();
    drawBall();
    drawPaddle();
    hitDetection();

    // detect left and right walls:
    if(x + dx > canvas.width - ballRadius || x + dx < ballRadius){
        dx = -dx;
    }
    // detect top wall:
    if(y + dy < ballRadius){
        dy = -dy;
    } else if ( y + dy > canvas.height - ballRadius){
        // detect paddle hits:
        if ( x > paddleX && x < paddleX + paddleWidth){
            dy = -dy;
        } else {
            // if ball don't hit paddle:
            alert('Game Over!');
            document.location.reload();
        }
    }

    // bottom wall:
    if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
        dy = -dy;
    }

    // move ball:
    x += dx;
    y += dy;
}

setInterval(init, 10);
