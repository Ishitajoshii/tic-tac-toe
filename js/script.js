const cells = document.querySelectorAll('.cell');
const turnIndicator = document.getElementById('turn');
const messageDisplay = document.getElementById('message');
const resetButton = document.getElementById('reset-button');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function checkWin() {
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return gameBoard[a];
        }
    }
    return null;
}

function checkDraw() {
    return !gameBoard.includes('');
}

function updateTurnIndicator() {
    turnIndicator.textContent = currentPlayer;
}

function updateMessage(message) {
    messageDisplay.textContent = message;
}

function handleCellClick(event) {
    const cell = event.target;
    const index = parseInt(cell.dataset.index);

    if (gameBoard[index] !== '' || !gameActive) {
        return;
    }

    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer === 'X' ? 'x-color' : 'o-color');

    const winner = checkWin();
    if (winner) {
        updateMessage(`${winner} wins!`);
        gameActive = false;
        return;
    }

    if (checkDraw()) {
        updateMessage("It's a draw!");
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateTurnIndicator();
}

function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;

    updateTurnIndicator();
    updateMessage('');

    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x-color', 'o-color');
    });
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);

updateTurnIndicator();