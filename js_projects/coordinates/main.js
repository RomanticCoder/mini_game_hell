const horizontal = document.querySelector(".horizontal");
const vertical = document.querySelector(".vertical");
const tag = document.querySelector(".tag");
const target = document.querySelector(".target");

    addEventListener("load",()=>{
        const targetHalfWidth = target.width /2;
        const targetHalfHeight = target.height /2;
        window.addEventListener("mousemove",(event)=>{
            const x = event.clientX;
            const y = event.clientY;
            //moveToTarget(x-beforeX,y-beforeY);
            vertical.style.transform= `translateX(${x}px)`;
            horizontal.style.transform= `translateY(${y}px)`;
            target.style.transform= `translate(${x - targetHalfWidth}px,${y-targetHalfHeight}px)`;
            tag.innerHTML=`${x}px,${y}px`;
            tag.style.transform= `translate(${x+30}px,${y+20}px)`;
        
        });

    });
