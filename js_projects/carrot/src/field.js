'use strict';

import * as sound from './sound.js';

export const ItemType = Object.freeze({
    carrot:'carrot',
    bug:'bug',
})
export default class Field {
  constructor(carrotCount,bugCount) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.field = document.querySelector(".game__field");
    this.fieldRect = this.field.getBoundingClientRect();
    // this.onClick = this.onClick.bind(this);
    //arrow function은 디스를 유지
    //this는 어떤 클래스 아네 있는 함수를 다른 콜백으로 전달할때는 그 함수가 포함된 클래스의 정보가 사라짐..
    //그래서 this와 함수를 묶을 수 있는 바인딩 과정이 필요함
    //수동으로 바인딩, arrow functin 이용해서 넘겨줌, 호출하는 함수를 arrow function으로 씀
    this.field.addEventListener('click', (event)=>{this.onClick(event)});
  
    }

    init(){
        this.field.innerHTML = '';
        this._addItem(ItemType.carrot,this.carrotCount,'img/carrot.png');
        this._addItem(ItemType.bug,this.bugCount,'img/bug.png');
    }    

    _addItem(className,count,imagePath){
        const x1 = 0;
        const y1 = 0;
        const x2 = this.fieldRect.width - 80;
        const y2 = this.fieldRect.height - 80;
    
        for(let i = 0; i < count; i++){
            const item = document.createElement("img");
            item.setAttribute('src',imagePath);
            item.setAttribute('class',className);
            const x = randomNumber(x1,x2);
            const y = randomNumber(y1,y2);
            item.style.left = `${x}px`;
            item.style.top = `${y}px`;
            this.field.appendChild(item);
        }
    }

    setClickListener(onItemClick){
        this.onItemClick = onItemClick;
    }

    onClick = (event) =>{ //이렇게 감싸줘도 binding이 알아서 됨
        const target = event.target;
        if(target.matches('.carrot')){
            sound.playCarrot();
            target.remove();
            this.onItemClick && this.onItemClick(ItemType.carrot);
        }else if(target.matches('.bug')){
            this.onItemClick && this.onItemClick(ItemType.bug);
        }
    }

    setClickListener(onItemClick) {
        this.onItemClick = onItemClick;
    }

}

function randomNumber(min,max){
    return min + Math.floor(Math.random() * (max - min));
}
