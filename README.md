# Misere TicTacToe

![tictactoe](image/misere-tic-tac-toe-thumb.png)

Building a reverse version of tic-tac-toe also called avoidance ttt. The Best First Move In Misere Tic-Tac-Toe (3-In-A-Row Is Losing). I have built the game using AI and minimax Algorithm.

RULES of THE GAME

1. The game is played on a grid that's 3 squares by 3 squares.
2. You are X, your friend (or the computer in this case) is O. Players take turns putting their
   marks in empty squares.
3. The first player to get 3 of her marks in a row (up, down, across, or diagonally) loses the
   game.
4. When all 9 squares are full, the game is over. If no player has 3 marks in a row, the game
   ends in a tie.

In misere tic-tac-toe, you want to avoid strong positions of making 3 in a row. It seems like playing in the center would be bad. However, this is the surprising part of misere tic-tac-toe.

The only non-losing move is the center square! If you play an edge or a corner, you are guaranteed to lose the game against perfect strategy.

Misere tic-tac-toe will always result in a tie, just like regular tic-tac-toe, with proper play.

But how do we know this, and what is that strategy?
