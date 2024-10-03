const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');
const resetButton = document.getElementById('resetButton');
const winVideo = document.getElementById('winVideo');
const backgroundMusic = document.getElementById('backgroundMusic'); // Reference to the background music
const muteButton = document.getElementById('muteButton');  // Button to mute/unmute music

const cellSize = 30; // Adjust cell size for a 20x20 grid
const cols = 20; // Maze is 20x20
const rows = 20;
let maze, playerPosition;

// Initialize a simple 20x20 maze
function createMaze() {
    // A simple 20x20 maze (0 = path, 1 = wall)
    maze = [
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0],
        [1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
        [1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0],
        [1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0],
        [0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0],
        [1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0],
        [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    playerPosition = { x: 0, y: 0 };  // Start position at top-left
    winVideo.style.display = "none";  // Hide video on reset
    drawMaze();
}

function drawMaze() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            if (maze[y][x] === 1) {
                ctx.fillStyle = 'black';  // Wall
            } else {
                ctx.fillStyle = 'white';  // Path
            }
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
    }
    // Draw player
    ctx.fillStyle = 'red';
    ctx.fillRect(playerPosition.x * cellSize, playerPosition.y * cellSize, cellSize, cellSize);
}

// Handle player movement with W, A, S, D keys
document.addEventListener('keydown', function(event) {
    let { x, y } = playerPosition;
    switch (event.key) {
        case 'w':  // Move up
            if (y > 0 && maze[y - 1][x] === 0) y--;
            break;
        case 's':  // Move down
            if (y < rows - 1 && maze[y + 1][x] === 0) y++;
            break;
        case 'a':  // Move left
            if (x > 0 && maze[y][x - 1] === 0) x--;
            break;
        case 'd':  // Move right
            if (x < cols - 1 && maze[y][x + 1] === 0) x++;
            break;
    }
    playerPosition = { x, y };
    drawMaze();
    checkWin();
});

function checkWin() {
    if (playerPosition.x === cols - 1 && playerPosition.y === rows - 1) {
        setTimeout(() => {
            alert('You win!');
            playWinVideo();     // Play the video when player wins
        }, 10);
    }
}

function playWinVideo() {
    winVideo.style.display = "block";  // Show the video element
    winVideo.play();  // Play the video
}

// Toggle mute for background music
muteButton.addEventListener('click', function() {
    if (backgroundMusic.muted) {
        backgroundMusic.muted = false;
        muteButton.textContent = 'Mute Music';
    } else {
        backgroundMusic.muted = true;
        muteButton.textContent = 'Unmute Music';
    }
});

resetButton.addEventListener('click', createMaze);

// Initialize the maze when the page loads
createMaze();
