const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');
const resetButton = document.getElementById('resetButton');

const cellSize = 50;
const cols = canvas.width / cellSize;
const rows = canvas.height / cellSize;
let maze, playerPosition;

// Initialize a simple maze (can be replaced by a maze generator later)
function createMaze() {
    maze = [
        [0, 1, 1, 0, 1],
        [0, 0, 1, 0, 1],
        [1, 0, 0, 0, 0],
        [1, 1, 1, 0, 1],
        [0, 0, 0, 0, 0]
    ];
    playerPosition = { x: 0, y: 0 };  // Start position
    drawMaze();
}

function drawMaze() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            if (maze[y][x] === 1) {
                ctx.fillStyle = 'black';
            } else {
                ctx.fillStyle = 'white';
            }
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
    }
    // Draw player
    ctx.fillStyle = 'red';
    ctx.fillRect(playerPosition.x * cellSize, playerPosition.y * cellSize, cellSize, cellSize);
}

// Handle player movement with arrow keys
document.addEventListener('keydown', function(event) {
    let { x, y } = playerPosition;
    switch (event.key) {
        case 'ArrowUp':
            if (y > 0 && maze[y - 1][x] === 0) y--;
            break;
        case 'ArrowDown':
            if (y < rows - 1 && maze[y + 1][x] === 0) y++;
            break;
        case 'ArrowLeft':
            if (x > 0 && maze[y][x - 1] === 0) x--;
            break;
        case 'ArrowRight':
            if (x < cols - 1 && maze[y][x + 1] === 0) x++;
            break;
    }
    playerPosition = { x, y };
    drawMaze();
    checkWin();
});

function checkWin() {
    if (playerPosition.x === cols - 1 && playerPosition.y === rows - 1) {
        setTimeout(() => alert('You win!'), 10);
    }
}

resetButton.addEventListener('click', createMaze);

// Initialize the maze when the page loads
createMaze();
