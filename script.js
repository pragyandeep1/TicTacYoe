class TicTacToe {
    constructor(playerSymbol = "X", cellClass = "cell", overlayClass = "overlay-text", winnerClass = "winner") {
        this.player = playerSymbol; // Initialize starting player
        this.cells = Array.from(document.querySelectorAll(`.${cellClass}`)); // Fetch cells dynamically
        this.overlayText = document.querySelector(`.${overlayClass}`); // Fetch overlay text dynamically
        this.victoryText = document.querySelector(`.${winnerClass}`); // Fetch victory text dynamically
        this.gameActive = true; // Tracks game state
        this.initializeGame();
    }

    initializeGame() {
        // Reset all cells and add event listeners
        this.cells.forEach((cell, index) => {
            cell.innerHTML = ''; // Clear previous moves
            cell.addEventListener('click', () => this.cellClicked(index));
        });

        // Reset overlay and victory texts
        this.overlayText.classList.add('visible');
        this.victoryText.classList.remove('visible');

        this.overlayText.addEventListener('click', () => this.startGame());
    }

    startGame() {
        this.overlayText.classList.remove('visible'); // Hide overlay text
        this.gameActive = true; // Reactivate the game
        this.player = "X"; // Reset player to default
    }

    cellClicked(index) {
        if (!this.gameActive) return; // Ignore clicks if the game is over

        const cell = this.cells[index];
        if (cell.innerHTML !== '') return; // Prevent overwriting cells

        cell.innerHTML = this.player; // Set the player's symbol in the clicked cell
        if (this.checkWin()) {
            this.victory(); // Handle win scenario
        } else if (this.checkDraw()) {
            this.showDrawMessage(); // Handle draw scenario
        } else {
            this.switchPlayer(); // Continue the game
        }
    }

    switchPlayer() {
        this.player = this.player === "X" ? "O" : "X"; // Switch between X and O
    }

    checkWin() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]            // Diagonals
        ];

        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return (
                this.cells[a].innerHTML === this.player &&
                this.cells[b].innerHTML === this.player &&
                this.cells[c].innerHTML === this.player
            );
        });
    }

    checkDraw() {
        return this.cells.every(cell => cell.innerHTML !== ''); // Check if all cells are filled
    }

    victory() {
        this.gameActive = false; // End the game
        this.victoryText.classList.add('visible');
        this.victoryText.innerHTML = `<span>${this.player === 'X' ? 'Player One Wins!' : 'Player Two Wins!'}</span>`;
        this.victoryText.addEventListener('click', () => this.initializeGame());
        const restartButton = document.getElementById('btn');
        restartButton.style.display = 'block'; // Show the restart button
        restartButton.addEventListener('click', () => this.initializeGame());
    }

    showDrawMessage() {
        this.gameActive = false; // End the game
        this.victoryText.classList.add('visible');
        this.victoryText.innerHTML = `It's a Draw!`;
        this.victoryText.addEventListener('click', () => this.initializeGame());
        const restartButton = document.getElementById('btn');
        restartButton.style.display = 'block'; // Show the restart button
        restartButton.addEventListener('click', () => this.initializeGame());
    }
}

// Initialize the game dynamically with parameterized configuration
const game = new TicTacToe("X", "cell", "overlay-text", "winner");

function Restart(){
    window.location.reload();
}

class AudioController {
    constructor() {
        this.bgMusic = new Audio('audio/creepy.mp3');
        this.flipSound = new Audio('audio/flip.wav');
        this.matchSound = new Audio('audio/match.wav');
        this.victorySound = new Audio('audio/victory.wav');
        this.gameOverSound = new Audio('audio/gameOver.wav');
        this.bgMusic.volume = 0.5;
        this.bgMusic.loop = true;
    }
    startMusic() {
        this.bgMusic.play();
    }
    stopMusic() {
        this.bgMusic.pause();
        this.bgMusic.currentTime = 0;
    }
    flip() {
        this.flipSound.play();
    }
    match() {
        this.matchSound.play();
    }
    victory() {
        this.stopMusic();
        this.victorySound.play();
    }
    gameOver() {
        this.stopMusic();
        this.gameOverSound.play();
    }
}

// Wait for user interaction to start audio
document.addEventListener('click', () => {
    const audioController = new AudioController();
    audioController.startMusic();
}, { once: true });