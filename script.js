const cells = document.querySelectorAll('[data-cell]');
const board = document.querySelector('.board');
const container = document.querySelector('.container');
const endScreen = document.querySelector('.end-screen');
const endMessage = document.getElementById('end-message');
const newGameButton = document.getElementById('newGameButton');

let isXTurn = true;

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Function to handle clicks
function handleClick(e) {
  const cell = e.target;
  const currentClass = isXTurn ? 'X' : 'O';

  if (!cell.textContent) {
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
      endGame(false, currentClass);
    } else if (isDraw()) {
      endGame(true);
    } else {
      swapTurns();
    }
  }
}

// Function to place the mark (X or O)
function placeMark(cell, currentClass) {
  cell.textContent = currentClass;
  cell.classList.add('taken');
}

// Swap turns between X and O
function swapTurns() {
  isXTurn = !isXTurn;
}

// Check for win
function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cells[index].textContent === currentClass;
    });
  });
}

// Check for draw
function isDraw() {
  return [...cells].every(cell => {
    return cell.textContent;
  });
}

// End the game with win or draw
function endGame(draw, winner = null) {
  container.classList.add('hidden');
  endScreen.classList.remove('hidden');
  if (draw) {
    endMessage.textContent = "It's a Draw!";
  } else {
    endMessage.textContent = `${winner} Wins!`;
  }
}

// Restart the game
function restartGame() {
  isXTurn = true;
  container.classList.remove('hidden');
  endScreen.classList.add('hidden');
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken');
  });
}

// Add event listeners to cells
cells.forEach(cell => {
  cell.addEventListener('click', handleClick);
});

// Add event listener to New Game button
newGameButton.addEventListener('click', restartGame);
