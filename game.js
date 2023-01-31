let items = document.getElementsByClassName('items');
let audioTurn = new Audio("./music/turnChange.mp3");
let audioEnd = new Audio("./music/endAudio.mp3");
let audioReset = new Audio("./music/reset.mp3");
let audioBg = new Audio("./music/Bg-music.mp3");
let turn = "X";
let gameOver = false;
let ismute = false;

// Change Turn For Player.
const changeTurn = (turn) => {
    console.log(turn);
    return turn === "X" ? "O" : "X"
}

// Checking for winners
const checkWin = ()=>{
    let boxtexts = document.getElementsByClassName('boxtext');
    win = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ]
    win.forEach((e)=>{
        if ((boxtexts[e[0]].innerText === boxtexts[e[1]].innerText) && (boxtexts[e[1]].innerText === boxtexts[e[2]].innerText) && boxtexts[e[0]].innerText  !== '') {
            document.querySelector('.myTurn').innerText = boxtexts[e[0]].innerText + " Won The Game.";
            audioBg.pause();
            audioTurn.pause();
            audioEnd.play();
            gameOver = true;
            document.querySelector('.gif').style.width = "200px";
        }
    })

}
Array.from(items).forEach(element => {
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', () => {
        if (boxtext.innerText === '') {
            boxtext.innerText = turn;
            turn = changeTurn(turn);
            audioTurn.play();
            checkWin();
            if (!gameOver) {
                document.querySelector('.myTurn').innerText = "Turn For " + turn;
            }
        }

    })
})


let reset = document.querySelector(".btn");
reset.addEventListener('click',()=>{
    let boxtext = document.querySelectorAll('.boxtext');
    boxtext.forEach((e)=>{
        e.innerText = "";
        audioReset.play();
    })
    turn = "X";
    gameOver = false
})

let mute = document.querySelector(".mute");
mute.addEventListener('click',()=>{
    if (ismute) {
        audioBg.pause();
        ismute = false;
    }else{
        ismute = true;
        audioBg.play();
    }
})