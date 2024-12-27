let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');

// Function to check for a winner
const checkWinner = () => {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameOver = true;
            setTimeout(() => alert(`${gameBoard[a]} wins!`), 100);  // Show the correct winner
            return;
        }
    }

    // Check for a tie (no empty spaces)
    if (!gameBoard.includes('')) {
        gameOver = true;
        setTimeout(() => alert("It's a tie!"), 100);
    }
};

// Function to handle cell clicks
const handleCellClick = (index) => {
    if (gameBoard[index] || gameOver) return; // Prevent action if cell is filled or game is over

    gameBoard[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
    cells[index].classList.add(currentPlayer.toLowerCase()); // Add 'x' or 'o' class for styling

    checkWinner();

    // Switch turns after checking winner
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; 
};

// Function to reset the game
const resetGame = () => {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameOver = false;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
};

cells.forEach((cell, index) => {
    // Adding event listener to each cell
    cell.addEventListener('click', () => handleCellClick(index));
});

resetButton.addEventListener('click', resetGame);
