'use strict';

import PopUp from './popup.js';
import GameBuilder, { Reason } from './game.js';
import * as sound from './sound.js';

const game = new GameBuilder()//
.withCarrotCount(2)
.withBugCount(5)
.withGameDuration(3)
.build();

const gameFinishBanner = new PopUp();

game.setGameStopListener((reason)=>{
    let message;
    switch(reason){
        case Reason.win:
            message = 'YOU WON';
            sound.playWin();
            break;
        case Reason.lose:
            message = 'YOU LOST';
            sound.playBug();
            break;
        case Reason.cancel:
            message = 'REPLAY?'
            sound.playAlert();
            break;
        default:
            throw new Error('not valid reason');
    }
    gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(()=>{game.start();});

