export const ItemType = Object.freeze({
    feedable : 'feedable',
    unfeedable : 'unfeedable',
});

export class Field{
    constructor(feedable_icon,feedable_count,unfeedable_icon,unfeedable_count){
        this.feedable_icon = feedable_icon;
        this.unfeedable_icon = unfeedable_icon;
        this.feedable_count = feedable_count;
        this.unfeedable_count = unfeedable_count;
    
        this.field = document.querySelector(".game__field");
        this.field.addEventListener("click",(event)=>{
            this.onFieldClickListener(event);
        });
        this.fieldRect = this.field.getBoundingClientRect();
    }

    setItemClickListener(onItemClick){
        this.onItemClick = onItemClick;
    }

    onFieldClickListener(event) {
        const target = event.target;
        if(target.matches('.unfeedable')){
            target.remove();
            this.onItemClick && this.onItemClick(ItemType.unfeedable);
        }else if(target.matches('.feedable')){
            this.onItemClick && this.onItemClick(ItemType.feedable);
        }
    }

    init(){
        this.field.innerHTML = ``;
        this.addItem(ItemType.unfeedable,this.unfeedable_count,this.unfeedable_icon);
        this.addItem(ItemType.feedable,this.feedable_count,this.feedable_icon);
    }

    addItem(className,count,emoji){
        const x1 = 0;
        const y1 = 0;
        const x2 = this.fieldRect.width - 80;
        const y2 = this.fieldRect.height - 80;
    
        for(let i = 0; i < count; i++){
            const item = document.createElement("div");
            item.setAttribute('class',className);
            item.innerText = emoji;
            const x = randomNumber(x1,x2);
            const y = randomNumber(y1,y2);
            item.style.left = `${x}px`;
            item.style.top = `${y}px`;
            this.field.appendChild(item);
        }
    }
}

function randomNumber(min,max){
    return min + Math.floor(Math.random() * (max - min));
}
