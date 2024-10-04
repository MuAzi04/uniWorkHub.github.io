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
backgroundMusic.muted = false

// Initialize a simple 20x20 mazed
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
        [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2]
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
            } else if(maze[y][x] == 2) {
                ctx.fillStyle = 'green';
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
    // if (playerPosition.x === cols - 1 && playerPosition.y === rows - 1) {
       if (playerPosition.x === 14 && playerPosition.y === 12) {
        setTimeout(() => {
            // alert('You win!');
            playWinVideo();     // Play the video when player wins
        }, 10);
    } 
}
function playWinVideo() {
    // Show the black screen as soon as the video starts
    
    
    // Optionally hide game elements
    backgroundMusic.muted = true
    hideGameElements();
    document.getElementById('blackScreen').style.display = "block";

    // Show and play the video after a short delay (if you want)
    setTimeout(() => {
        winVideo.style.display = "block";  // Show the video element
        winVideo.play();  // Play the video
    }, 0);  // 500 ms delay for a smoother transition
}


// Function to hide game elements after win
function hideGameElements() {
    document.getElementById('mazeCanvas').style.display = 'none';
    document.getElementById('resetButton').style.display = 'none';
    document.getElementById('muteButton').style.display = 'none';
}


function displayBackgroundImage() {
    document.body.classList.add('fullscreen-background'); // Apply background image
    document.getElementById('mazeCanvas').classList.add('hidden'); // Hide the maze canvas
    document.getElementById('gameTitle').classList.add('hidden');  // Hide the title
    document.getElementById('resetButton').classList.add('hidden');  // Hide the reset button
    document.getElementById('muteButton').classList.add('hidden');  // Hide the mute button
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

