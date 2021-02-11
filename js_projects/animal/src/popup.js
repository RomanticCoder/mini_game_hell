export default class PopUp{
    constructor(){
        this.popup = document.querySelector(".pop-up");
        this.popupMessage = this.popup.querySelector(".pop-up__message");
        this.popupRefresh = this.popup.querySelector(".pop-up__refresh");
        this.popupRefresh.addEventListener("click",()=>{
            this.hide();
            this.onRetryClick && this.onRetryClick();
        });
        this.popupNextLevel = this.popup.querySelector(".pop-up__next-level");
        this.popupNextLevel.addEventListener("click",()=>{
            this.hide();
            this.onNextLevelClick && this.onNextLevelClick();
        });

        this.modal = document.querySelector(".modal");
    }

    showWithText(win,text){
        if(win){
            this.popupRefresh.style.display = "none";
            this.popupNextLevel.style.display = "block";
        }else{
            this.popupRefresh.style.display = "block";
            this.popupNextLevel.style.display = "none";
        }
        this.popup.classList.remove('pop-up--hide');
        this.popupMessage.innerText = text;
    }

    showModal(){
        this.modal.style.visibility = "visible";
    }
    
    hide(){
        this.popup.classList.add('pop-up--hide');
    }
    
    setRetryClickListener = (onRetryClick) => {
        this.onRetryClick = onRetryClick;
    }
    setNextLevelClickListener = (onNextLevelClick) => {
        this.onNextLevelClick = onNextLevelClick;
    }

}