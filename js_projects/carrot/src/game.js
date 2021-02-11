'use strict';

import * as sound from './sound.js';
import Field from './field.js';

export const Reason = Object.freeze({
    win:'win',
    lose:'lose',
    cancel:'cancel'
});

export default class GameBuilder{
    //return this를 하는 이유
    //array 패턴에서 map이나 reduce같은 걸 쓰면 어레이 자체를 리턴하기 때문에 계속 체이닝이 가능
    //그런 것처럼 하려고 this를 리턴하는거
    withGameDuration(duration){
        this.gameDuration = duration;
        return this;
    }

    withCarrotCount(num){
        this.carrotCount = num;
        return this;
    }

    withBugCount(num){
        this.bugCount = num;
        return this;
    }

    build(){
        return new Game(
            this.carrotCount,
            this.bugCount,
            this.gameDuration
        );
    }
}

class Game {
    constructor(carrot_count, bug_count,game_duration_sec){
        this.carrot_count = carrot_count;
        this.bug_count=bug_count;
        this.game_duration_sec = game_duration_sec;

        this.gameBtn = document.querySelector(".game__button");
        this.gameBtn.addEventListener("click",()=>{
            if(this.started){
                this.stop(Reason.cancel)
            }else{
                this.start();
            }
        });
        this.gameTimer= document.querySelector(".game__timer");
        this.gameScore= document.querySelector(".game__score");

        this.gameField = new Field(carrot_count,bug_count);
        this.gameField.setClickListener((event)=>{this.onItemClick(event);});
        
        this.started = false;
        this.score = 0;
        this.timer = undefined;
    }

    setGameStopListener(onGameStop){
        this.onGameStop = onGameStop;
    }

    start(){
        this.started = true;
        this.init();
        this.showStopButton();
        this.showTimerAndScore();
        this.startTimer();
        sound.playBackground();
    }
    
    stop(reason){
        console.log(reason);
        this.started = false;
        this.stopTimer();
        this.hideButton();
        sound.stopBackground();
        this.onGameStop && this.onGameStop(reason);
    }

    init(){
        this.gameField.init();
        this.score = 0;
        this.gameScore.innerText = this.carrot_count;
    }

    // for game field
    onItemClick = (item)=>{
        if(!this.started){
            return;
        }
        if(item === 'carrot'){
            this.score++;
            this.updateScore();
            if(this.score === this.carrot_count){
                this.stop(Reason.win);
            }
        }else if(item==='bug'){
            this.stop(Reason.lose);
        }
    }

    // button control
    showStartButton(){
        const icon = this.gameBtn.querySelector('.fa-stop');
        if(icon){
            icon.classList.remove('fa-stop');
            icon.classList.add('fa-play');
        }
        this.gameBtn.style.visibility = 'visible';
    }

    showStopButton(){
        const icon = this.gameBtn.querySelector('.fa-play');
        if(icon){
            icon.classList.add('fa-stop');
            icon.classList.remove('fa-play');
        }
        this.gameBtn.style.visibility = 'visible';
    }

    hideButton(){
        this.gameBtn.style.visibility = 'hidden';
    }

    //timer, scroe
    showTimerAndScore(){
        this.gameTimer.style.visibility = "visible";
        this.gameScore.style.visibility = "visible";
    }

    //timer control
    startTimer(){
        let remainingTimeSec = this.game_duration_sec;
        this.updateTimerText(remainingTimeSec);
        this.timer = setInterval(() => {
            if(remainingTimeSec <= 0){
                this.stopTimer();
                this.stop(this.carrot_count === this.score ? Reason.win : Reason.lose);
                return;
            }
            this.updateTimerText(--remainingTimeSec);
        }, 1000);
    }

    stopTimer(){
        clearInterval(this.timer);
    }

    updateTimerText(time){
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        this.gameTimer.innerText = `${minutes}:${seconds}`;
    }

    //scroe
    updateScore(){
        this.gameScore.innerText = this.carrot_count - this.score;
    }
}
