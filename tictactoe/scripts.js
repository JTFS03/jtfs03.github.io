const spaces = document.querySelectorAll(".GameSpace");
const turnDisplay = document.querySelector("#turn");
const winnerText = document.querySelector("#winner");

let currentPlayer = "X";

let gameboard = [
 "", "", "",
 "", "", "",
 "", "", ""
];


// add click event to each space
for (let i = 0; i < spaces.length; i++) {

  spaces[i].addEventListener("click", function(){

    // stop if space already used
    if(gameboard[i] !== ""){
      return;
    }

    // stop if game already finished
    if(winnerText.innerHTML !== ""){
      return;
    }

    // place symbol
    spaces[i].innerHTML = currentPlayer;
    gameboard[i] = currentPlayer;

    // check for winner
    let winState = checkGameboard(gameboard);

    if(winState === "X"){
      winnerText.innerHTML = "Player X Wins!";
      return;
    }

    if(winState === "O"){
      winnerText.innerHTML = "Player O Wins!";
      return;
    }

    // check for draw
    if(!gameboard.includes("")){
      winnerText.innerHTML = "It's a Draw!";
      return;
    }

    // switch player
    if(currentPlayer === "X"){
      currentPlayer = "O";
    } else {
      currentPlayer = "X";
    }

    turnDisplay.innerHTML = "Turn: Player " + currentPlayer;

  });

}



// function to check rows, columns, diagonals
function checkGameboard(board){

  // convert board into rows
  let rowA = [board[0], board[1], board[2]];
  let rowB = [board[3], board[4], board[5]];
  let rowC = [board[6], board[7], board[8]];

  let grid = [rowA, rowB, rowC];


  // Row check
  for (let i = 0; i < 3; i++) {
    if (
      grid[i][0] !== "" &&
      grid[i][0] === grid[i][1] &&
      grid[i][1] === grid[i][2]
    ) {
      return grid[i][0];
    }
  }


  // Column check
  for (let i = 0; i < 3; i++) {
    if (
      grid[0][i] !== "" &&
      grid[0][i] === grid[1][i] &&
      grid[1][i] === grid[2][i]
    ) {
      return grid[0][i];
    }
  }


  // Diagonal check
  if (
    grid[0][0] !== "" &&
    grid[0][0] === grid[1][1] &&
    grid[1][1] === grid[2][2]
  ) {
    return grid[0][0];
  }

  if (
    grid[0][2] !== "" &&
    grid[0][2] === grid[1][1] &&
    grid[1][1] === grid[2][0]
  ) {
    return grid[0][2];
  }

  return "";
}