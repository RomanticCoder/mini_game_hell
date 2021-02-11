const container = document.querySelector(".container");
const controlBtn = document.querySelector(".controlBtn");
const remainingTime = document.querySelector(".remainingTime");
const remainingCarrot = document.querySelector(".remainingCarrot");
const body = document.querySelector("body");
const playground =document.querySelector(".playground");
const modal = document.querySelector(".modal");
const modal__closeBtn = modal.querySelector(".modal__closeBtn");
const modal__text = modal.querySelector(".modal__text");
const timeoutIds = [];

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  }

modal__closeBtn.addEventListener("click",()=>{
    modal.style.display = "none";
    controlBtn.style.opacity = 1;
    gameStart();
})
function randomCoords(){
    //n ~m (m ㄴㄴ)
    const left = 30;
    const right = container.offsetWidth - 90;

    const top = container.offsetHeight/ 2;
    const bottom = container.offsetHeight -90;

    const x = left+ Math.floor(Math.random()* (right-left));
    const y = top + Math.floor(Math.random()* (bottom-top));
    return [x,y];
}

function drawImage(type){
    [x,y] =randomCoords();
    const img = document.createElement("img");
    const body = document.querySelector("body");
    if(type === 'bug'){
        img.src = "img/bug.png";
        img.className="bug";
    
    }else if(type === 'carrot'){
        img.src = "img/carrot.png";
        img.className="carrot";
    }
    img.style.top = `${y}px`;
    img.style.left= `${x}px`;
    playground.appendChild(img);
}

function startTimeout(){
    for(let i = 10 ; i >= 0; i--){
        const timeoutId = setTimeout(() => {
            remainingTime.innerHTML = `0:${i}`
            if(i === 0){
                stopGame(false);
                console.log("lost timeout");
            }
        }, (10 - i)*1000);
        timeoutIds.push(timeoutId);
    }
    return timeoutIds;
}

function stopGame(gameResult){
    backgroundSound.stop();
    controlBtn.style.opacity = 0;
    timeoutIds.forEach((id)=>{
        clearTimeout(id);
    })
    modal.style.display="block";
    if(gameResult){
        winSound = new sound("sound/game_win.mp3");
        winSound.play();    
        modal__text.innerText = "You won!";
    }else if(gameResult === undefined){
        modal__text.innerText = "Replay?";
        alertSound = new sound("sound/alert.wav");
        alertSound.play();    

    }
    else{
        modal__text.innerText = "You lost...";
    }
}

function gameStart(){
    backgroundSound = new sound("sound/bg.mp3");
    backgroundSound.play();
    playground.innerHTML = '';
    remainingCarrot.innerText = 10;
    console.log(playground);
    for(let i = 0; i < 10;i++){
        drawImage("bug");
        drawImage("carrot");
    }
    startTimeout();
    controlBtn.innerText = "⏹";

}
function controlGame(event){
    if(controlBtn.innerText === "▶"){
        gameStart();
    }else if(controlBtn.innerText === "⏹"){
        stopGame(undefined);
        console.log("you pressed stop button")
    }
}

function handleClick(e){
    if(e.target.nodeName !== 'IMG') return;

    if(e.target.className === 'carrot'){
        carrotSound = new sound("sound/carrot_pull.mp3");
        carrotSound.play();
    
        playground.removeChild(e.target);
        remainingCarrot.innerText = +(remainingCarrot.innerText) - 1;

        console.log(+remainingCarrot.innerText )
        if(+remainingCarrot.innerText <= 0){
            console.log("here")
            console.log("you won");
            stopGame(true);

        }

    }else if(e.target.className === 'bug'){
        bugSound = new sound("sound/bug_pull.mp3");
        bugSound.play();

        stopGame(false);
        console.log("lost bug clicked");
    }
}

controlBtn.addEventListener("click",controlGame);
playground.addEventListener("click",handleClick);