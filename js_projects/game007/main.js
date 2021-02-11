const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

function adjustCanvasSize(){
    console.log("hi");
    canvas.width= window.innerWidth;
    canvas.height= window.innerHeight;
}

canvas.addEventListener("mousemove",getCoordinates);

function getCoordinates(event){
    const x = event.clientX;
    const y = event.clientY;
    drawThings(x,y);
}

function drawThings(x,y){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.strokeStyle = '#ffffff';
    ctx.font = "20px Verdana";
    ctx.fillStyle = '#ffffff';

    ctx.beginPath();       // Start a new path
    ctx.moveTo(x, 0);    // Move the pen to (30, 50)
    ctx.lineTo(x, canvas.height);  // Draw a line to (150, 100)
    ctx.stroke();          // Render the path

    ctx.beginPath();       // Start a new path
    ctx.moveTo(0, y);    // Move the pen to (30, 50)
    ctx.lineTo(canvas.width,y);  // Draw a line to (150, 100)

    ctx.arc(x,y,20,0,Math.PI * 2,true);
    ctx.arc(x,y,13,0,Math.PI * 2,true);
    ctx.lineWidth=3;
    ctx.arc(x,y,5,0,Math.PI * 2,true);

    ctx.stroke();          // Render the path
    ctx.fillText(`${x}px, ${y}px`,x + 20,y + 20);
}

function init(){
    adjustCanvasSize();
    window.addEventListener("resize",adjustCanvasSize);
}

init();