const readline = require("readline");

const songs = [
    "Blinding Lights - The Weeknd",
    "Starboy - The Weeknd",
    "Shape of You - Ed Sheeran",
    "Believer - Imagine Dragons",
    "Perfect - Ed Sheeran"
];


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


function displaySongs() {
    console.log("==============================");
    console.log("       🎵 MUSIC PLAYER");
    console.log("==============================\n");

    console.log("Songs:");

    songs.forEach((song, index) => {
        console.log(`${index + 1}. ${song}`);
    });
}


function selectSong() {
    rl.question("\nEnter song number: ", (answer) => {

        const choice = Number(answer);

        if (choice >= 1 && choice <= songs.length) {
            console.log(`\n▶ Now Playing: ${songs[choice - 1]}`);
        } else {
            console.log("\n❌ Invalid song number. Please choose another one");
        }

        rl.close();
    });
}


function main() {
    displaySongs();
    selectSong();
}


main();