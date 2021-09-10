const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const button = document.querySelector('.replay')

const eatAudio = new Audio()
eatAudio.src = 'sons/eat.mp3'

const deadAudio = new Audio()
deadAudio.src = 'sons/dead.mp3'

class SnakePart{
    constructor(x,y){
        this.x = x;
        this.y = y;
    } 
}

let score = 0;
let speed = 5;


let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 2;

let appleX = 5;
let appleY =5;

let xVelocity=0;
let yVelocity=0;



// BOUCLE DU JEUX
function drawGame(){
   
    changeSnakePosition();
    let result = isGameOver();
    if(result){
        return;
    }

    clearScreen();

    checkAppleCollision();
    drawApple();
    drawSnake(); 
    drawScore();

    if(score > 3){
        speed = 8;
    }
    if(score > 9){
        speed = 10;9
    }
    if(score > 14){
        speed = 15;
    }
    if(score > 19){
        speed = 20;
    }
    if(score > 24){
        speed = 25;
    }
    if(score > 29){
        speed = 35;
    }

    drawVitesse();

    setTimeout(drawGame, 1000/ speed);
} 

function isGameOver(){
    let gameOver = false;

    if(yVelocity === 0 && xVelocity===0){
        return false;
    }

    // contour
    if(headX < 0 ){
        gameOver = true;
        deadAudio.play()
      
    }
    else if(headX >= tileCount){
        gameOver = true
        deadAudio.play()
    }
    else if (headY < 0 ){
        gameOver = true
        deadAudio.play()
    }
    else if (headY === tileCount){
        gameOver = true
        deadAudio.play()
    }
    //  la corp
    for(let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        if(part.x == headX && part.y === headY){  
            gameOver = true;
            deadAudio.play()
            break;
        }
    }



    if(gameOver){
        ctx.fillStyle = "white";
        ctx.font = "40px Verdana";
        var gradient = ctx.createLinearGradient(0,0, canvas.width,0);
        gradient.addColorStop("0","magenta");
        gradient.addColorStop("0.5","black");
        gradient.addColorStop("1.0","red");

        // fill with gradient
        ctx.fillStyle = gradient;
        ctx.fillText("Votre score est " + score, canvas.width / 15.5, canvas.height /2 )
        
        ctx.font = '25px serif';
        ctx.fillText('Tapez espace pour Recommencer',  canvas.width / 15.5, canvas.height /1.1);
    }

    return gameOver;
}



function drawScore(){
    ctx.fillStyle = 'white';
    ctx.font = "10px vert"
    ctx.fillText("Score " + score, canvas.width-50, 10)
}

function drawVitesse(){
    ctx.fillStyle = 'white';
    ctx.font = "10px vert";
    ctx.fillText("Vitesse " + speed, canvas.width-390, 10);
}

function clearScreen(){
    ctx.fillStyle = 'blue';
    ctx.fillRect(0,0,canvas.width,canvas.height)
}
function drawSnake(){
    ctx.fillStyle = 'orange'
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);

    ctx.fillStyle = 'green';
    for(let i =0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }

    snakeParts.push(new SnakePart(headX, headY));
    if(snakeParts.length > tailLength){
        snakeParts.shift();
    }

    ctx.fillStyle = 'orange'
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);


}
 
// deplacement du serpent
function changeSnakePosition(){
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}
// pomme
function drawApple(){
    ctx.fillStyle = "red";
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize,tileCount)
}

// fonction de la collision et le deplacement du pomme
function checkAppleCollision(){
    if(appleX === headX && appleY === headY){
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLength++;
        score++;
        eatAudio.play()
        button.style.display = 'none'
    }
}

document.body.addEventListener('keydown', keyDown);
function keyDown(event){
    // en haut
    if(event.keyCode == 38){
        if(yVelocity == 1)
            return;
        yVelocity = -1;
        xVelocity = 0;
    }
    // en bas
    if(event.keyCode == 40){
        if(yVelocity == -1)
        return;
        yVelocity = 1;
        xVelocity = 0;
    }
    // a Ggauche
    if(event.keyCode == 37){
        if(xVelocity == 1)
        return;
        yVelocity = 0;
        xVelocity = -1;
    }
     // a droite
     if(event.keyCode == 39){
        if(xVelocity == -1)
        return;
        yVelocity = 0;
        xVelocity = 1;
    }
    if(event.keyCode == 32){
        window.location.reload()
    }
}



drawGame()