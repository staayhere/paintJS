const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";


// canvs의 사이즈를 css로 설정해두었는데 js는 html만 가져오니까 여기서 한 번더 사이즈를 잡아줘야함(아마도..)
// html 안에서 사이즈를 잡아줬다면 js에서 한 번 더 사이즈 잡아줄 필요는 없음
canvas.width = 700;
canvas.height = 700;

// canvas의 바탕색을 정해주지 않아서 default가 transparent로 되어있음. 그래서 defalut를 white로 만들어주려고 fillStyle을 white로 한 네모를 먼저 만들어주는 것
ctx.fillStyle = "white";
ctx.fillRect(0, 0, 700, 700);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;

    // !painting 은 painting === false와 동일함
    if(!painting) {
        ctx.beginPath();        //경로 생성
        ctx.moveTo(x, y);       //선 시작 좌표
    } else {
        ctx.lineTo(x, y);       //선 끝 좌표
        ctx.stroke();           //선 그리기
    }
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    // 이 때 fillstyle도 같은 값으로 맞춰주면 handleModeClick에서 한 번 더 컬러값 안가져와도 됨
    ctx.fillStyle = color;
}

function handleRangeChange(event){
    const strokeSize = event.target.value;
    ctx.lineWidth = strokeSize;
}

function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "FIll";
    } else {
        // Fill 버튼이 클릭되어있는 상태일 때!
        filling = true;
        mode.innerText = "PAINT";
    }
}

function hanldeCanvasClick(){
    if(filling){
        ctx.fillRect(0, 0, 700, 700);
        // filling = true일 때 일어날 행동
    }    
}

function handleRightClick(event){
    // contextmenu는 우클릭시 나타나는 메뉴를 말하는데 이걸 preventDefault함으로써 우클릭 방지를 할 수 있음
    event.preventDefault();
}

function handleSaveClick(){
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;              //다운로드할 이미지의 url
    link.download = "paintJS[🎨]";  //다운로드할 이미지의 이름
    link.click();
}

// canvas가 있는지 체크할거임
if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", hanldeCanvasClick);
    canvas.addEventListener("contextmenu", handleRightClick);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if(range) {
    range.addEventListener("input", handleRangeChange);
}

if(mode) {
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn) {
     saveBtn.addEventListener("click", handleSaveClick);
}