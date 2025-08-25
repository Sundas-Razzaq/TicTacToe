let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset");
let newbtn = document.querySelector("#new");
let msgContainer = document.querySelector(".msg_container");
let msg = document.querySelector("#msg");
let game = document.querySelector(".game"); // Get the game container
//code to set X's and O's alternatively for player_1 and player_2
let turnO = true;
let count = 0;//To Track Draw
//code to store winning patterns horizontal, vertical or dimentional using 2D array
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];
//adding event listeners for each button
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "0";
            box.style.color = "red";
            box.setAttribute("data-player", "O");
            turnO = false;
        } else {
            box.innerText = "X";
            box.style.color = "blue";
            box.setAttribute("data-player", "X");
            turnO = true;
        }
        box.disabled = true;
        count++;
        //game draw condition
        let isWinner = checkWinner();
        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});
//to disable the buttons after winner is declared
const disableBox = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}
//winner msg function 
const showWinner = (winner, pattern) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBox();
    drawWinningLine(pattern); // Draw the line
};

const drawWinningLine = (pattern) => {
    //Create Canvas Element
    const canvas = document.createElement('canvas');
    //Canvas Dimensions
    canvas.width = game.offsetWidth;
    canvas.height = game.offsetHeight;
    //Position Canvas:
    canvas.style.position = 'absolute';
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.pointerEvents = 'none';
    //Add Canvas to DOM
    game.appendChild(canvas);
    //Get 2D Rendering Context
    const ctx = canvas.getContext('2d');
    //Get Box Positions
    const box1 = boxes[pattern[0]];
    const box2 = boxes[pattern[1]];
    const box3 = boxes[pattern[2]];
    //Calculate Center Points of Boxes
    const x1 = box1.offsetLeft + box1.offsetWidth / 2;
    const y1 = box1.offsetTop + box1.offsetHeight / 2;
    const x2 = box3.offsetLeft + box3.offsetWidth / 2;
    const y2 = box3.offsetTop + box3.offsetHeight / 2;
    //Draw the Line
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 5;
    ctx.shadowColor = 'rgba(0, 255, 0, 0.7)';
    ctx.shadowBlur = 15;
    ctx.stroke();
    //Flag Canvas for Removal
    canvas.winningLine = true;
};

const checkWinner = (() => {
    for (let pattern of winPatterns) {
        let pos0Val = boxes[pattern[0]].innerText;
        let pos1Val = boxes[pattern[1]].innerText;
        let pos2Val = boxes[pattern[2]].innerText;
        if (pos0Val != "" && pos1Val != "" && pos2Val != "") {
            if (pos0Val === pos1Val && pos1Val === pos2Val) {
                showWinner(pos0Val, pattern);
                return true;
            }
        }
    }
});
//to enable the boxes when new game starts
const enableBox = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.style.color = ""; // Reset box colors
        box.removeAttribute("data-player");
    }
    const canvases = game.querySelectorAll('canvas');
    canvases.forEach(canvas => {
        if (canvas.winningLine) {
            game.removeChild(canvas);
        }
    });
};
//code to reset the game
const resetGame = (() => {
    turnO = true;
    count = 0;
    enableBox();
    msgContainer.classList.add("hide");
});

newbtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);

//condition for game draw
const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disableBox();
};