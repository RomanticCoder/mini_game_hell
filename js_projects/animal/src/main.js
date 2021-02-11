'use strict';

import {GameBuilder,Reason} from './game.js';
import PopUp from './popup.js';

let level = 0; 
let result;

const startLevel={
    feedableCount : 5,
    unfeedableCount :2,
}

let game = new GameBuilder()
.animalType('🐶')
.feedableIcon('🦴')
.feedableCount(startLevel.feedableCount)
.unfeedableIcon('🍫')
.unfeedableCount(startLevel.unfeedableCount)
.gameDuration(5)
.build();

const gameFinishBanner = new PopUp();

game.setGameStopListener((reason,message)=>{
    gameFinishBanner.showWithText(reason === Reason.win ? true : false, message);
})

gameFinishBanner.setRetryClickListener(()=>{
        game.start();
});

gameFinishBanner.setNextLevelClickListener(()=>{
    game = new GameBuilder()
    .animalType('🐶')
    .feedableIcon('🦴')
    .feedableCount(++startLevel.feedableCount)
    .unfeedableIcon('🍫')
    .unfeedableCount(++startLevel.unfeedableCount)
    .gameDuration(5)
    .build();
    game.start();
    game.setGameStopListener((reason,message)=>{
        if(startLevel.unfeedableCount >= 4){
            //겜 끝내기
            console.log("completed")
            return;
        }
        gameFinishBanner.showModal();
        //gameFinishBanner.showWithText(reason === Reason.win ? true : false, message);
    })
});

//feedableIcon🦴🍫