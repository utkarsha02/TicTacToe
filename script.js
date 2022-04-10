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
  //to disable clicked place
  if (typeof origBoard[box.target.id] == "number") {
    turn(box.target.id, huPlayer);
    if (!checkTie()) turn(bestSpot(), aiPlayer);
  }
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
  declareWinner(gameWon.player == huPlayer ? "You win!" : "You lose.");
}

function declareWinner(winner_name) {
  document.querySelector(".endgame").style.display = "block";
  document.querySelector(".endgame .text").innerText = winner_name;
}

function emptySquares() {
  return origBoard.filter((s) => typeof s == "number");
}

function bestSpot() {
  //   return emptySquares()[0];
  return minimax(origBoard, aiPlayer).index;
}

function checkTie() {
  if (emptySquares().length == 0) {
    for (var i = 0; i < cells.length; i++) {
      cells[i].style.backgroundColor = "green";
      cells[i].removeEventListener("click", turnClick, false);
    }
    declareWinner("Tie Game!");
    return true;
  }
  return false;
}

function minimax(newBoard, player) {
  var availSpots = emptySquares();

  if (checkWin(newBoard, huPlayer)) {
    return { score: -10 };
  } else if (checkWin(newBoard, aiPlayer)) {
    return { score: 10 };
  } else if (availSpots.length === 0) {
    return { score: 0 };
  }
  var moves = [];
  for (var i = 0; i < availSpots.length; i++) {
    var move = {};
    move.index = newBoard[availSpots[i]];
    newBoard[availSpots[i]] = player;

    if (player == aiPlayer) {
      var result = minimax(newBoard, huPlayer);
      move.score = result.score;
    } else {
      var result = minimax(newBoard, aiPlayer);
      move.score = result.score;
    }

    newBoard[availSpots[i]] = move.index;

    moves.push(move);
  }

  var bestMove;
  if (player === aiPlayer) {
    var bestScore = -10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    var bestScore = 10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  return moves[bestMove];
}
