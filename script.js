let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset");
let newgame = document.querySelector("#newgame");
let msgConatainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let container = document.querySelector(".container");

let moveCount = 0;
let turnX = true;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


boxes.forEach((box) => {
    box.addEventListener("click",() => {
        console.log("box was clicked");
        if(turnX){
            box.innerText = "X";
            turnX = false;
        }else{
            box.innerText = "O";
            turnX = true;
        }
        box.disabled = true;
        moveCount++;

        checkWinner();
    });
});

const checkWinner = () => {
    for(let i of winPatterns){
        let pos1Val = boxes[i[0]].innerText;
        let pos2Val = boxes[i[1]].innerText;
        let pos3Val = boxes[i[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                console.log("winner");
                disableboxes();
                showWinner(pos1Val);
                return;
            }
        }
    }

    if(moveCount == 9){
        showDraw();
    }
}



const showWinner = (winner) => {
    msg.innerText = `Congratulations\n Winner is Player ${winner}`;
    msgConatainer.classList.remove("hide");
    container.classList.add("hide");
    resetbtn.classList.add("hide");
}

const showDraw = () => {
    msg.innerText = `It's a Draw`;
    msgConatainer.classList.remove("hide");
    container.classList.add("hide");
    resetbtn.classList.add("hide");
}

const disableboxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

let restart = ()=>{
    moveCount = 0;
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
    });
    turnX = true;
    msgConatainer.classList.add("hide");
    container.classList.remove("hide");
    resetbtn.classList.remove("hide");
};


resetbtn.addEventListener("click",restart);


newgame.addEventListener("click", restart);

