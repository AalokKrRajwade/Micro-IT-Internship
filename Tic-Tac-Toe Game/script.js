const cells = document.querySelectorAll(".cell");
const status = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");

let board = Array(9).fill(null);
let currentPlayer = "X";
let isGameActive = true;

const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
];

cells.forEach(cell => cell.addEventListener("click", cellClick));
restartBtn.addEventListener("click", restartGame);

function cellClick(e) {
    const index = e.target.dataset.cellIndex;
    if (!isGameActive || board[index]) return;

    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWin(currentPlayer)) {
        isGameActive = false;
        status.textContent = `Player ${currentPlayer} wins!`;
    } else if (board.every(cell => cell !== null)) {
        isGameActive = false;
        status.textContent = "It's a draw!";
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        status.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWin(player) {
    for (const combo of winningCombos) {
        if (combo.every(index => board[index] === player)) {
            combo.forEach(index => cells[index].classList.add("win"));
            return true;
        }
    }
    return false;
}

function restartGame() {
    board.fill(null);
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("win");
    });
    currentPlayer = "X";
    isGameActive = true;
    status.textContent = `Player ${currentPlayer}'s turn`;
}