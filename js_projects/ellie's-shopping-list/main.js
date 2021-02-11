const items = document.querySelector(".items");
const input = document.querySelector(".footer__input");
const addBtn = document.querySelector(".footer__button");

input.focus();

function onAdd(){
    //1.사용자가 입력한 텍스트를 받아옴
    const text = input.value;
    if(text === ''){
        input.focus();
        return;
    }
    //2.새로운 아이템을 만듦
    const item = createItem(text);
    //3.컨테이너안에 추가
    items.appendChild(item);
    //4.새로 추가된 아이템으로 스크롤링
    item.scrollIntoView({block:'center'});
    //5.인풋 초기화
    input.value = '';
    input.focus();
}

let id = 0; //uuid

function createItem(text){
    const itemRow = document.createElement("li");
    itemRow.setAttribute("class",'item__row');
    itemRow.setAttribute("data-id",id);

    itemRow.innerHTML = `
        <div class="item">
            <span class="item__name">${text}</span>
            <button class="item__delete">
                <i class="fas fa-trash-alt" data-id=${id}></i>
            </button>
        </div>
        <div class="item__divider"></div>
        `;
        id++;

    return itemRow;
}

items.addEventListener("click",(event)=>{
    const id = event.target.dataset.id;
    if(id){
        const toBeDeleted = document.querySelector(`.itemRow[data-id = "${id}"]`);
        console.log(toBeDeleted);
        items.removeChild(toBeDeleted);
    }
    
});


items.addEventListener('click', event => {
    const id = event.target.dataset.id;
    if (id) {
      const toBeDeleted = document.querySelector(`.item__row[data-id="${id}"]`);
      toBeDeleted.remove();
    }
  });
addBtn.addEventListener("click",()=>{
    onAdd();
});

input.addEventListener('keypress',(event)=>{
    if(event.key === 'Enter'){
        onAdd();
    }
})