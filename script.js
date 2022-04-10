// basic setup
// determine winner
// basic AI and winner notification
// Minimax Algorithm

// array
var origBoard;
const huPlayer = "X";
const aiPlayer = "O";
const winnningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [2, 5, 8],
  [6, 7, 8],
  [0, 4, 8],
  [6, 4, 2],
  [0, 3, 6],
  [1, 4, 7],
];

const cells = document.querySelectorAll(".cell");
startGame();

function startGame() {
  document.querySelector(".endgame").getElementsByClassName.display = "none";
  origBoard = Array.from(Array(9).keys());
  //   console.log(origBoard);
  for (var i = 0; i < cells.length; i++) {
    //innerText!!
    cells[i].innerText = "";
    cells[i].style.removeProperty("background-color");
    cells[i].addEventListener("click", turnClick, false);
  }
}

function turnClick(box) {
  turn(box.target.id, huPlayer);
}

function turn(boxId, player) {
  origBoard[boxId] = player;
  document.getElementById(boxId).innerText = player;
}
