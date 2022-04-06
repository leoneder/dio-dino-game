const dino = document.querySelector('.dino');
const background = document.querySelector('.background')


const placar = document.querySelector('.score');
let dinoImage = false;
let pontos = 0;
let position = 0;
let backSpeed = 1000.0;

let isJumping = false;
function handleKeyUp(event){
    if(event.keyCode===32){
        console.log("ponto1");
       if(!isJumping){
            jump();
       }
    }
}


//console.log(

function jump(){
    isJumping = true;

    let upInterval = setInterval(() => {
        if(position >= 150){
            clearInterval(upInterval);
           let downInterval =  setInterval(() => {
             if(position <= 0 ){  
                clearInterval(downInterval);
                isJumping = false;
             }   else {
                    position -= 10;
                    dino.style.bottom = position + 'px';

             }   
            }, 20);
        } else{
            position += 10;
            dino.style.bottom = position + 'px';
        }
    }, 20);
}

function createCactus(){
    const cactus = document.createElement('div');
    let cactusPosition = 1000;    
    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';
    background.appendChild(cactus);
    randomTime = Math.random() * 6000;

    let leftInterval = setInterval(() => {
      
        
    if(cactusPosition < -60){
        clearInterval(leftInterval);
        background.removeChild(cactus);
    } else if(cactusPosition >0 && cactusPosition <60 && position < 60){
        clearInterval(leftInterval);
        document.body.innerHTML = '<h1 class="game-over"> fim de jogo <h1>';
    } else {
        cactusPosition -= backSpeed/100;
        cactus.style.left = cactusPosition + 'px';
    
    }
    
    }, 20);

    setTimeout(createCactus, randomTime)
    
}

setInterval(() => {
    pontos ++;
    placar.textContent = `Score: ${pontos}`;
    backSpeed += pontos/500.0;
}, 100);

setInterval(() => { 
    if (dinoImage){
        dino.style.background = "url(img/dino1.png)";
    } else {
        dino.style.background = "url(img/dino2.png)";
    }
    dinoImage=!dinoImage;
}, 100);

createCactus();
document.addEventListener('keyup', handleKeyUp);