const fs = require("fs");
const path = require("path");
const player = require("play-sound")();

const songsFolder = path.join(__dirname, "mysongs");

const songs = fs.readdirSync(songsFolder);

let currentSong = 0;
let isPlaying = false;
let audioProcess = null;


// Display player
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

    console.log("\n↑ ↓ Navigate");
    console.log("ENTER Select / Play");
    console.log("SPACE Pause / Resume");
    console.log("Q Quit");
}


// Play / Resume
function playSong() {

    // Resume existing song
    if (audioProcess) {
        audioProcess.kill("SIGCONT");
        isPlaying = true;
        displayPlayer();
        return;
    }

    // Get selected song
    const songPath = path.join(
        songsFolder,
        songs[currentSong]
    );

    // Play song
    audioProcess = player.play(songPath, (error) => {

        if (error) {
            console.log("Error playing song:", error);
        }

        audioProcess = null;
        isPlaying = false;
    });

    isPlaying = true;

    displayPlayer();
}


// Pause
function pauseSong() {

    if (audioProcess) {
        audioProcess.kill("SIGSTOP");
        isPlaying = false;
        displayPlayer();
    }
}


// Next song
function nextSong() {

    if (audioProcess) {
        audioProcess.kill();
        audioProcess = null;
    }

    currentSong++;

    if (currentSong >= songs.length) {
        currentSong = 0;
    }

    isPlaying = false;

    displayPlayer();
}


// Previous song
function previousSong() {

    if (audioProcess) {
        audioProcess.kill();
        audioProcess = null;
    }

    currentSong--;

    if (currentSong < 0) {
        currentSong = songs.length - 1;
    }

    isPlaying = false;

    displayPlayer();
}


// Keyboard input
function handleInput(key) {

    // Up
    if (key === "\u001b[A") {
        previousSong();
    }

    // Down
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

    // Quit
    else if (key.toLowerCase() === "q") {

        if (audioProcess) {
            audioProcess.kill();
        }

        process.stdin.setRawMode(false);
        process.stdin.pause();

        console.clear();
        console.log("👋 Goodbye!");

        process.exit();
    }
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