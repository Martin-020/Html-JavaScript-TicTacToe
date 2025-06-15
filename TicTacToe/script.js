const cells = document.querySelectorAll("[data-cell]");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");

let currentPlayer = "X";
let gameActive = true;

const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], 
  [0, 3, 6], [1, 4, 7], [2, 5, 8], 
  [0, 4, 8], [2, 4, 6]             
];

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => handleMove(cell, index));
});

restartBtn.addEventListener("click", resetGame);

function handleMove(cell, index) {
  if (!gameActive || cell.textContent !== "") return;

  cell.textContent = currentPlayer;
  cell.classList.add("taken", currentPlayer.toLowerCase());

  if (checkWinner(currentPlayer)) {
    statusText.textContent = `Pemain ${currentPlayer} menang!`;
    gameActive = false;
    return;
  }

  if (isDraw()) {
    statusText.textContent = "Hasil: Seri!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Giliran: ${currentPlayer}`;
}

function checkWinner(player) {
  return winPatterns.some(pattern => {
    return pattern.every(index => {
      return cells[index].textContent === player;
    });
  });
}

function isDraw() {
  return [...cells].every(cell => cell.textContent !== "");
}

function resetGame() {
  cells.forEach(cell => {
    cell.textContent = "";
    cell.className = "col cell";
  });
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = `Giliran: ${currentPlayer}`;
}
