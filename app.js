const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor")
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c"
const CANVAS_SIZE = 700;

// 캔버스에 사이즈 지정하지 않을 경우 작동 X
canvas.width= CANVAS_SIZE;
canvas.height= CANVAS_SIZE;

// 캔버스 초기값 생성
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle = INITIAL_COLOR;    /*초기 붓 색상 */
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth=2.5; /*초기 붓 크기 */

let painting = false;
let filling = false;    /*칠하기,선긋기 모드 변수*/

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    // console.log(event);
    const x = event.offsetX;
    const y = event.offsetY;
    // console.log(x,y);
    //  마우스를 누르기전까지 선을 만들어주지만,
    //  화면에 그리지는 않아서 생성만 됨.
    if(!painting){
        // console.log("creating path in ", x, y);
        ctx.beginPath();
        ctx.moveTo(x,y);
        //  위에서 생성된 선의 마지막 부분부터
        //  마우스를 뗄때까지 계속해서 stroke 기능이 작동.
    } else {
        // console.log("creating line in ", x, y);
        ctx.lineTo(x,y);
        ctx.stroke();   /* 획을 긋는기능 */
    }
}
/*
function onMouseDown(event){
    // console.log(event);
    painting = true;
}
*/

function handleColorClick(event){
    // console.log(event.target.style);
    const color = event.target.style.backgroundColor;
    // console.log(color);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event){
    // log를 찍어서 필요한 정보를 가진 객체의 위치파악하기
    // console.log(event.target.value);
    const size = event.target.value;
    ctx.lineWidth = size; 
}

function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "Paint";
    } else {
        filling = true;
        mode.innerText = "Fill";
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    } 
}

function handleCM(event){
    // console.log(event);
    event.preventDefault();
}

function handleSaveClick(){
    // const image = canvas.toDataURL("image/jpeg");
    const image = canvas.toDataURL();   /* 기본값이 png */
    // console.log(image);
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[EXPORT]";
    // console.log(link);
    link.click();

}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));
// console.log(Array.from(colors));

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}