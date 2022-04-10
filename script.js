// 1.basic setup
// 2.determine winner
// 3.basic AI and winner notification
// 4.Minimax Algorithm

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
  //   to be entered later
  let gameWon = checkWin(origBoard, player);
  if (gameWon) gameOver(gameWon);
}

function checkWin(newboard, player) {
  // find all the moves played by the player
  //a->accumulator, e->element, i->index, []->initial val of accumulator
  let moves = newboard.reduce(
    (a, e, i) => (e === player ? a.concat(i) : a),
    []
  );
  let gameWon = null;
  // const [key,value] of object.entries
  for (let [index, win] of winnningCombos.entries()) {
    //for every win combination see if the moves array contains each one of them
    // if so the for that combination the respective player wins
    // for eg, for index=0 -> val=[0,1,2] and if a = [0,1,2,5] then player wins
    // The every() method tests whether all elements in the array pass the test implemented by the provided function. It returns a Boolean value.
    if (win.every((elem) => moves.indexOf(elem) > -1)) {
      //elem = 0,1,2
      gameWon = { index: index, player: player };
      break;
    }
  }
  return gameWon;
}

function gameOver(gameWon) {
  //to prevent player from clicking more boxes and highlight winning player box
  for (let index of winnningCombos[gameWon.index]) {
    document.getElementById(index).style.backgroundColor =
      gameWon.player == huPlayer ? "blue" : "red";
  }
  for (var i = 0; i < cells.length; i++) {
    cells[i].removeEventListener("click", turnClick, false);
  }
}
