const songs = [
    "Blinding Lights - The Weeknd",
    "Starboy - The Weeknd",
    "Shape of You - Ed Sheeran",
    "Believer - Imagine Dragons",
    "Perfect - Ed Sheeran"
];

let currentSong = 0;
let isPlaying = false;

let currentTime = 0;
let duration = 180; // dummy duration: 3 minutes
let progressInterval;

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

function getProgressBar() {
    const barLength = 30;

    const progress = currentTime / duration;
    const filled = Math.floor(progress * barLength);

    const bar =
        "█".repeat(filled) +
        "░".repeat(barLength - filled);

    return bar;
}


// Display the player
function displayPlayer() {
    console.clear();

    console.log("==============================");
    console.log("       🎵 MUSIC PLAYER");
    console.log("==============================\n");

    songs.forEach((song, index) => {
        if (index === currentSong) {
            console.log(`  > ${song}`);
        } else {
            console.log(`    ${song}`);
        }
    });

    console.log("\n------------------------------");

    if (isPlaying) {
        console.log(`▶ Playing: ${songs[currentSong]}`);
    } else {
        console.log(`⏸ Paused: ${songs[currentSong]}`);
    }

    console.log(
        `\n${getProgressBar()} ${formatTime(currentTime)} / ${formatTime(duration)}`
    );

    console.log("\n↑ ↓ Navigate");
    console.log("ENTER Select / Play");
    console.log("SPACE Pause / Resume");
    console.log("Q Quit");
}

// Move to next song
function nextSong() {
    currentSong++;

    if (currentSong >= songs.length) {
        currentSong = 0;
    }

    currentTime = 0;
    isPlaying = false;

    displayPlayer();
}


// Move to previous song
function previousSong() {
    currentSong--;

    if (currentSong < 0) {
        currentSong = songs.length - 1;
    }

    currentTime = 0;
    isPlaying = false;

    displayPlayer();
}


// Play / resume
function playSong() {
    isPlaying = true;

    startProgress();

    displayPlayer();
}


// Pause
function pauseSong() {
    isPlaying = false;
    displayPlayer();
}


// Handle keyboard input
function handleInput(key) {

    // Arrow Up
    if (key === "\u001b[A") {
        previousSong();
    }

    // Arrow Down
    else if (key === "\u001b[B") {
        nextSong();
    }

    // Enter
    else if (key === "\r") {
        playSong();
    }

    // Space
    else if (key === " ") {
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    }

    // Q
    else if (key.toLowerCase() === "q") {
        process.stdin.setRawMode(false);
        process.stdin.pause();

        console.clear();
        console.log("👋 Goodbye!");

        process.exit();
    }
}
function startProgress() {
    clearInterval(progressInterval);

    progressInterval = setInterval(() => {

        if (!isPlaying) {
            return;
        }

        currentTime++;

        if (currentTime >= duration) {
            currentTime = duration;
            isPlaying = false;
            clearInterval(progressInterval);
        }

        displayPlayer();

    }, 1000);
}


// Start player
function main() {

    displayPlayer();

    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding("utf8");

    process.stdin.on("data", handleInput);
}


main();