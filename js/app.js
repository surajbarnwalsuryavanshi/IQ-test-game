let gameSeq = [];
let userSeq = [];
let colorArr = [];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");
let start = document.querySelector("#btn");
let inp = document.querySelector("#userInput");

let boxContainer = document.querySelector("#container");
let userBox = Object.values(boxContainer);

let reset = document.querySelector("#reset");

start.addEventListener("click",
    function createDiv() {

        

        inputBox();

        pushArray();

        gameStart();

        click();

    }
)

function inputBox(){

    let userInputValue = inp.value;


    btn.style.display = "none";
    inp.style.display = "none";

    if (userInputValue > 1 && userInputValue < 11) {
        boxContainer.innerHTML = "";

        for (let i = 0; i < userInputValue; i++) {
            let newBox = document.createElement('div');
            newBox.setAttribute("id", `box-${i + 1}`);
            newBox.classList.add("box");
            boxContainer.appendChild(newBox);


            let randomColor = getRandomColor()

            newBox.style.backgroundColor = randomColor;

        }

    } else {
        alert("Please enter nunber 2-10")
    }
}

function gameStart(){
    if (started == false) {
        console.log("game is started");
        started = true;

        levelUp();
    }
}

function pushArray(){
    let allNewBox = document.querySelectorAll(".box");

        for (box of allNewBox) {
            box.className = "box";
            colorArr.push(box.id);
        }
}

function click(){
    let allBoxs = document.querySelectorAll(".box");
    for (box of allBoxs) {
        box.addEventListener("click", btnPress);

        box.addEventListener("click", function () {
            let sound = document.getElementById("clickSound");
            sound.play();
        });
    }
}


function getRandomColor() {
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);

    let color = `rgb(${red}, ${green}, ${blue})`;
    return color;
}

function gameFlash(btn) {
    btn.classList.add("flash");
    gameSound();
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 500);
}


function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 400);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerHTML = `Game is started.<br>Lets chech your mindset level.<br>"Level-<b>${level}"<b/>`;

    let randIdx = Math.floor(Math.random() * (colorArr.length));
    let randColor = colorArr[randIdx];
    let randBox = document.querySelector(`#${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBox);
}

function checkAns(idx) {

    if (userSeq[idx] === gameSeq[idx]) {

        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }

    } else {
        gameOver();
        h2.innerHTML = `Game Over. <br> Your score was "<b>${level}<b/>".<br>Reload page to start.`;
        changeBackgroundImage("../img/gameover.jpg");
        setTimeout(function () {
            document.querySelector("body").style.background = "maroon";
        }, 150);

        
        reset.style.display = "contents";
        console.log(reset);
    }
}

function changeBackgroundImage(newImage) {
    document.body.style.backgroundImage = "url('" + newImage + "')";
  }


function gameOver(){
    let sound = document.getElementById("clickSound2");
    sound.play();
}

function gameSound(){
    let sound = document.getElementById("clickSound3");
    sound.play();
}

function btnPress() {
    let box = this;
    userFlash(box);

    userColor = box.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
}

function reloadPage() {
    location.reload();
  }