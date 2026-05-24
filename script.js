// Total number of rows and columns in Connect 4
const rows = 6;
const cols = 7;

// This 2D array stores the game board data
let board = [];

// Red player starts first
let currentPlayer = "red";

// This becomes true when game is finished
let gameOver = false;

// Getting HTML elements from the page
const boardDiv = document.getElementById("board");
const statusDiv = document.getElementById("status");


// This function creates the game board
function createBoard() {
  // Clear old board from HTML
  boardDiv.innerHTML = "";

  // Empty the board array
  board = [];

  // Loop through each row
  for (let r = 0; r < rows; r++) {
    board[r] = [];

    // Loop through each column
    for (let c = 0; c < cols; c++) {
      // Initially every cell is empty
      board[r][c] = "";

      // Create a circle cell in HTML
      const cell = document.createElement("div");

      // Add CSS class to make it look like a circle
      cell.classList.add("cell");

      // Store row and column number inside the cell
      cell.dataset.row = r;
      cell.dataset.col = c;

      // When user clicks this cell, disc drops in that column
      cell.addEventListener("click", () => dropDisc(c));

      // Add the cell to the board
      boardDiv.appendChild(cell);
    }
  }
}


// This function drops the disc in the selected column
function dropDisc(col) {
  // If game is already over, do nothing
  if (gameOver) return;

  // Start checking from bottom row to top row
  for (let r = rows - 1; r >= 0; r--) {

    // Find the first empty cell in that column
    if (board[r][col] === "") {

      // Store current player's color in board array
      board[r][col] = currentPlayer;

      // Select the same cell from HTML
      const cell = document.querySelector(
        `[data-row="${r}"][data-col="${col}"]`
      );

      // Add red or yellow class to show disc color
      cell.classList.add(currentPlayer);

      // Check if current player wins after this move
      if (checkWinner(r, col)) {
        statusDiv.textContent = currentPlayer.toUpperCase() + " Wins!🎉🥳";
        gameOver = true;
        return;
      }

      // Check if board is full
      if (checkDraw()) {
        statusDiv.textContent = "Game Draw!";
        gameOver = true;
        return;
      }

      // Change player turn
      currentPlayer = currentPlayer === "red" ? "green" : "red";

      // Show whose turn is next
      statusDiv.textContent =
        currentPlayer.charAt(0).toUpperCase() +
        currentPlayer.slice(1) +
        "'s Turn";

      return;
    }
  }
}


// This function checks winner in all directions
function checkWinner(row, col) {
  return (
    checkDirection(row, col, 1, 0) ||   // vertical check
    checkDirection(row, col, 0, 1) ||   // horizontal check
    checkDirection(row, col, 1, 1) ||   // diagonal check \
    checkDirection(row, col, 1, -1)     // diagonal check /
  );
}


// This function checks 4 same color discs in one direction
function checkDirection(row, col, rowDir, colDir) {
  // Count current disc
  let count = 1;

  // Count discs in forward direction
  count += countDiscs(row, col, rowDir, colDir);

  // Count discs in opposite direction
  count += countDiscs(row, col, -rowDir, -colDir);

  // If count is 4 or more, player wins
  return count >= 4;
}


// This function counts same color discs continuously
function countDiscs(row, col, rowDir, colDir) {
  let count = 0;

  // Move to next cell in given direction
  let r = row + rowDir;
  let c = col + colDir;

  // Keep checking while inside board and same color found
  while (
    r >= 0 &&
    r < rows &&
    c >= 0 &&
    c < cols &&
    board[r][c] === currentPlayer
  ) {
    count++;

    // Move further in same direction
    r += rowDir;
    c += colDir;
  }

  return count;
}


// This function checks if game is draw
function checkDraw() {
  // If top row has no empty cell, board is full
  return board[0].every(cell => cell !== "");
}


// This function restarts the game
function resetGame() {
  currentPlayer = "red";
  gameOver = false;
  statusDiv.textContent = "Red's Turn";

  // Create fresh board again
  createBoard();
}


// Start the game when page loads
createBoard();