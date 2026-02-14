// Mock the DOM elements
const mockCells = Array.from({ length: 9 }, (_, i) => ({
    dataset: { index: i.toString() },
    textContent: '',
    classList: {
        add: jest.fn(),
        remove: jest.fn(),
    },
}));

const mockTurnIndicator = { textContent: '' };
const mockMessageDisplay = { textContent: '' };

// Mock document.querySelectorAll and document.getElementById
document.querySelectorAll = jest.fn().mockReturnValue(mockCells);
document.getElementById = jest.fn(id => {
    if (id === 'turn') return mockTurnIndicator;
    if (id === 'message') return mockMessageDisplay;
    return null;
});

// Import the functions to be tested
const {
    checkWin,
    checkDraw,
    updateTurnIndicator,
    updateMessage,
    handleCellClick,
    resetGame,
    currentPlayer,
    gameBoard,
    gameActive
} = require('../js/script');

// Set up the testing environment before each test
beforeEach(() => {
    jest.resetModules(); // Clears any cache between tests.
    jest.clearAllMocks();

    // Reset game state before each test
    global.currentPlayer = 'X';
    global.gameBoard = ['', '', '', '', '', '', '', '', ''];
    global.gameActive = true;
    mockMessageDisplay.textContent = '';
    mockTurnIndicator.textContent = 'X';

    // Reset cell content and classes
    mockCells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x-color', 'o-color');
    });
});

describe('Tic Tac Toe Game Logic Tests', () => {
    describe('checkWin function', () => {
        it('should return "X" if X wins horizontally', () => {
            global.gameBoard = ['X', 'X', 'X', '', '', '', '', '', ''];
            expect(checkWin()).toBe('X');
        });

        it('should return "O" if O wins vertically', () => {
            global.gameBoard = ['O', '', '', 'O', '', '', 'O', '', ''];
            expect(checkWin()).toBe('O');
        });

        it('should return "X" if X wins diagonally', () => {
            global.gameBoard = ['X', '', '', '', 'X', '', '', '', 'X'];
            expect(checkWin()).toBe('X');
        });

        it('should return null if no one wins', () => {
            global.gameBoard = ['X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', 'O'];
            expect(checkWin()).toBe(null);
        });
    });

    describe('checkDraw function', () => {
        it('should return true if the board is full and no one wins', () => {
            global.gameBoard = ['X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', 'O'];
            expect(checkDraw()).toBe(true);
        });

        it('should return false if the board is not full', () => {
            global.gameBoard = ['X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', ''];
            expect(checkDraw()).toBe(false);
        });
    });

    describe('updateTurnIndicator function', () => {
        it('should update the turn indicator with the current player', () => {
            global.currentPlayer = 'O';
            updateTurnIndicator();
            expect(mockTurnIndicator.textContent).toBe('O');
        });
    });

    describe('updateMessage function', () => {
        it('should update the message display with the provided message', () => {
            const message = 'X wins!';
            updateMessage(message);
            expect(mockMessageDisplay.textContent).toBe(message);
        });
    });

    describe('handleCellClick function', () => {
        it('should place the current player\'s mark on the board and update the cell', () => {
            const cell = mockCells[0];
            handleCellClick({ target: cell });
            expect(global.gameBoard[0]).toBe('X');
            expect(cell.textContent).toBe('X');
            expect(cell.classList.add).toHaveBeenCalledWith('x-color');
        });

        it('should switch the current player after a valid move', () => {
            const cell = mockCells[0];
            handleCellClick({ target: cell });
            expect(global.currentPlayer).toBe('O');
        });

        it('should not allow a move on an already occupied cell', () => {
            global.gameBoard[0] = 'X';
            const cell = mockCells[0];
            handleCellClick({ target: cell });
            expect(global.currentPlayer).toBe('X');
            expect(cell.textContent).toBe('X');
        });

        it('should declare a winner if the current move results in a win', () => {
            global.gameBoard = ['X', 'X', '', '', '', '', '', '', ''];
            const cell = mockCells[2];
            handleCellClick({ target: cell });
            expect(mockMessageDisplay.textContent).toBe('X wins!');
            expect(global.gameActive).toBe(false);
        });

        it('should declare a draw if the board is full after the current move', () => {
            global.gameBoard = ['X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', ''];
            global.currentPlayer = 'O';
            const cell = mockCells[8];
            handleCellClick({ target: cell });
            expect(mockMessageDisplay.textContent).toBe("It's a draw!");
            expect(global.gameActive).toBe(false);
        });
    });

    describe('resetGame function', () => {
        it('should reset the game board, current player, and game state', () => {
            global.gameBoard = ['X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', 'O'];
            global.currentPlayer = 'O';
            global.gameActive = false;
            mockCells[0].textContent = 'X';
            mockCells[0].classList.add('x-color');

            resetGame();

            expect(global.gameBoard).toEqual(['', '', '', '', '', '', '', '', '']);
            expect(global.currentPlayer).toBe('X');
            expect(global.gameActive).toBe(true);
            expect(mockMessageDisplay.textContent).toBe('');
            expect(mockTurnIndicator.textContent).toBe('X');
            mockCells.forEach(cell => {
                expect(cell.textContent).toBe('');
                expect(cell.classList.remove).toHaveBeenCalledWith('x-color', 'o-color');
            });
        });
    });
});