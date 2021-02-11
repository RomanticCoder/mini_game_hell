import * as Sound from './sound.js';
import {Field, ItemType} from './field.js';
import PopUp from './popup.js';

export class GameBuilder {

    animalType(emoji){
        this.animalType = emoji;
        return this;
    }

    feedableIcon(emoji){
        this.feedableIcon = emoji;
        return this;
    }

    feedableCount(num){
        this.feedableCount = num;
        return this;
    }

    unfeedableIcon(emoji){
        this.unfeedableIcon = emoji;
        return this;
    }

    unfeedableCount(num){
        this.unfeedableCount = num;
        return this;
    }

    gameDuration(duration){
        this.gameDuration = duration;
        return this;
    }

    build(){
        return new Game(
            this.animalType,
            this.feedableIcon,
            this.feedableCount,
            this.unfeedableIcon,
            this.unfeedableCount,
            this.gameDuration,
            )
    } 
}
export const Reason = Object.freeze({
    win: 'win',
    lose: 'lose',
    cancel: 'cancel',
});

class Game{
    constructor(animalType,feedableIcon,feedableCount,unfeedableIcon,unfeedableCount,gameDurationSec){
        this.gameBtn = document.querySelector(".game__button");                
        this.gameBtn.addEventListener("click",()=>{
            if(this.started){
                this.stop(Reason.cancel);
            }else{
                this.start();
            }
        });        
        this.animalType = animalType;
        this.feedableCount = feedableCount;
        this.unfeedableCount = unfeedableCount;
        this.gameDurationSec = gameDurationSec;

        this.field = new Field(feedableIcon,this.feedableCount,unfeedableIcon,this.unfeedableCount);//feedable, unfeedable
        this.field.setItemClickListener(item => this.onItemClick(item));

        this.gameTimer= document.querySelector(".game__timer");
        this.gameScore= document.querySelector(".game__score");
        this.gameStatus = document.querySelector(".game__status");
        this.gameImage = document.querySelector(".game__image");
        this.gameAnimal = this.gameImage.querySelector("span");
        this.gameAnimal.innerText = animalType;

        this.started = false;
        this.score = 0;
        this.timer = undefined;
    }

    setGameStopListener(showBanner){
        this.showBanner = showBanner;
    }

    onGameStop(reason){
        let message ='';
        switch(reason){
            case 'win':
                this.gameStatus.innerText ='💖';
                message = 'YOU WON\n';
                Sound.playWin();
                break;
            case 'lose':
                message = 'YOU LOST';
                Sound.playBug();
                break;
            case 'cancel':
                message ='REPLAY?';
                Sound.playAlert();
                break;
            default:
                throw new Error("not valid");
        }
        this.showBanner && this.showBanner(reason,message);
    }

    onItemClick(item){
        if(!this.started){
            return;
        }
        if(item === ItemType.unfeedable){
            Sound.playCarrot();
            this.score++;
            this.updateScoreBoard();
            if(this.score === this.unfeedableCount){
                this.stop(Reason.win);
            }
        }else if(item === ItemType.feedable){ //못먹는거
            this.stop(Reason.lose);
        }
    }

    //control flow 
    start(){
        this.started = true;
        this.init();
        this.showStopButton();
        this.showTimerAndScore();
        this.startTimer(); 
        Sound.playBackground();
    }
    
    stop(reason){
        this.started = false;
        this.hideGameButton();
        this.stopTimer();
        Sound.stopBackground();
        this.onGameStop && this.onGameStop(reason);
    }

    //init
    init(){
        this.score = 0;
        this.gameStatus.innerText = '💬';
        this.gameScore.innerText = this.unfeedableCount;
        this.field.init();
    }
    
    //button control
    showStartButton(){
        const icon = this.gameBtn.querySelector('.fa-pause');
        if(icon){
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');
        }
        this.gameBtn.style.visibility = 'visible';
    }

    showStopButton(){
        const icon = this.gameBtn.querySelector('.fa-play');
        if(icon){
            icon.classList.add('fa-pause');
            icon.classList.remove('fa-play');
        }
        this.gameBtn.style.visibility = 'visible';
    }
    
    hideGameButton(){
        this.gameBtn.style.visibility = 'hidden';
    }


    //timer, score
    showTimerAndScore(){
        this.gameTimer.style.visibility = "visible";
        this.gameScore.style.visibility = "visible";
    }
    
    //timer
    startTimer(){
        let remainingTimeSec = this.gameDurationSec;
        this.updateTimerText(remainingTimeSec);
        this.timer = setInterval(() => {
            if(remainingTimeSec <= 0){
                this.stopTimer(this.timer);
                this.stop(this.unfeedableCount === this.score ? Reason.win : Reason.lose);
                return;
            }
            this.updateTimerText(--remainingTimeSec);
        }, 1000);
    }

    updateTimerText(time){
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        this.gameTimer.innerText = `${minutes}:${seconds}`;
    }

    stopTimer(){
        clearInterval(this.timer);
    }

    //score
    updateScoreBoard(){
        this.gameScore.innerText = this.unfeedableCount - this.score;
    }
}