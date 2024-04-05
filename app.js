let gameSeq = [];
let userSeq = [];
let highestScore = 0; // Variable to track the highest score

let btns = ["red", "yellow", "blue", "green"];
let h2 = document.querySelector("h2");
let highestScoreDisplay = document.getElementById("highest-score"); // Reference to the element displaying the highest score

let started = false;
let level = 0;

document.addEventListener("keypress", function(){
    if(started == false){
    console.log("Game has started..!");
    started = true;

    levelUp();
    }
});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 250);
}
function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash");
    }, 250);
}

function updateHighestScore() {
    highestScoreDisplay.innerText = `Highest Score: ${highestScore}`; // Update the text content of the highest score display
}

function levelUp(){
    userSeq = [];
    level ++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    console.log(gameSeq);

    gameFlash(randBtn);
}

function checkAns(idx){
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            if (level > highestScore) {
                highestScore = level; // Update the highest score if the current level is higher
                updateHighestScore(); // Update the display of the highest score
            }
            setTimeout(levelUp, 1000);
        }
    }else{
        h2.innerHTML = `Game Over..! Your score is <b>${level}</b> <br> Press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },150);
    
        reset();
    }
}

function btnPress(){
    let btn = this;
    userFlash(btn);

    userColor=btn.getAttribute("id");
    console.log(userColor);

    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(let btn of allBtns){
    btn.addEventListener("click", btnPress)
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

// Call updateHighestScore initially to display the highest score
updateHighestScore();
