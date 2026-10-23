const songs = [
    {
        title: "Dreamer",
        artist: "Alan Walker",
        src: "music/Alan Walker - Dreamer [NCS Release].mp3",
        cover: "https://geo-media.beatport.com/image_size/300x300/a5897b55-729d-42b0-8ee1-57b11e16217a.jpg"
    },
    {
        title: "On and On",
        artist: "Cartoon, Daniel Levi, Jeja",
        src: "music/Cartoon, Daniel Levi, Jéja - On & On (feat. Daniel Levi) [NCS Release].mp3",
        cover: "https://th.bing.com/th/id/OIP.95IqeBprLhrZ4XdCQ-GcLgHaHa?w=182&h=182&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
    },
    {
        title: "Fearless",
        artist: "Lost Sky, Chris Linton",
        src: "music/TULE, Chris Linton - Fearless pt. II (feat. Chris Linton) [NCS Release].mp3",
        cover: "https://th.bing.com/th/id/OIP.KOwWUVUnV8Ijgy0ufriTRwHaHa?w=160&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
    },
    {
        title: "Sky High",
        artist: "Elektronomia",
        src: "music/TULE, Chris Linton - Fearless pt. II (feat. Chris Linton) [NCS Release].mp3",
        cover: "https://th.bing.com/th/id/OIP.7fvTcaWPrfiMAmSz2cAkiAHaHa?w=171&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
    },
    {
        title: "Mortals",
        artist: "Warriyo, Laura Brehm",
        src: "music/Warriyo, Laura Brehm - Mortals (feat. Laura Brehm) [NCS Release].mp3",
        cover: "https://i1.sndcdn.com/artworks-000327560514-ex9i31-t500x500.jpg"
    }
];

const audio = document.getElementById("audio");

const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const progressBar = document.getElementById("progressBar");
const volumeBar = document.getElementById("volumeBar");

const currentTimeElement = document.getElementById("currentTime");
const durationElement = document.getElementById("duration");

const songTitle = document.getElementById("songTitle");
const artistName = document.getElementById("artistName");
const albumArt = document.getElementById("albumArt");

const playlistItems = document.getElementById("playlistItems");

let currentSongIndex = 0;


// -------------------------
// Load Song
// -------------------------

function loadSong(index) {
    currentSongIndex = index;

    const song = songs[index];

    audio.src = song.src;

    songTitle.textContent = song.title;
    artistName.textContent = song.artist;
    albumArt.src = song.cover;

    updatePlaylist();

    audio.load();
}


// -------------------------
// Play / Pause
// -------------------------

function playSong() {
    audio.play();
    playBtn.textContent = "⏸";
}

function pauseSong() {
    audio.pause();
    playBtn.textContent = "▶";
}

playBtn.addEventListener("click", () => {
    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }
});


// -------------------------
// Previous / Next
// -------------------------

prevBtn.addEventListener("click", () => {
    currentSongIndex--;

    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
    }

    loadSong(currentSongIndex);
    playSong();
});

nextBtn.addEventListener("click", () => {
    currentSongIndex++;

    if (currentSongIndex >= songs.length) {
        currentSongIndex = 0;
    }

    loadSong(currentSongIndex);
    playSong();
});


// -------------------------
// Progress Bar
// -------------------------

audio.addEventListener("loadedmetadata", () => {
    progressBar.max = audio.duration;
    durationElement.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
    progressBar.value = audio.currentTime;

    currentTimeElement.textContent =
        formatTime(audio.currentTime);
});

progressBar.addEventListener("input", () => {
    audio.currentTime = progressBar.value;
});


// -------------------------
// Volume
// -------------------------

volumeBar.addEventListener("input", () => {
    audio.volume = volumeBar.value;
});


// -------------------------
// Automatically play next
// -------------------------

audio.addEventListener("ended", () => {
    nextBtn.click();
});


// -------------------------
// Format Time
// -------------------------

function formatTime(time) {
    if (isNaN(time)) {
        return "0:00";
    }

    const minutes = Math.floor(time / 60);

    const seconds = Math.floor(time % 60)
        .toString()
        .padStart(2, "0");

    return `${minutes}:${seconds}`;
}


// -------------------------
// Playlist
// -------------------------

function createPlaylist() {
    playlistItems.innerHTML = "";

    songs.forEach((song, index) => {
        const item = document.createElement("div");

        item.classList.add("playlist-item");

        item.innerHTML = `
            <img src="${song.cover}" alt="${song.title}">

            <div class="track-details">
                <strong>${song.title}</strong>
                <span>${song.artist}</span>
            </div>
        `;

        item.addEventListener("click", () => {
            loadSong(index);
            playSong();
        });

        playlistItems.appendChild(item);
    });

    updatePlaylist();
}

function updatePlaylist() {
    const items = document.querySelectorAll(".playlist-item");

    items.forEach((item, index) => {
        item.classList.toggle(
            "active",
            index === currentSongIndex
        );
    });
}


// -------------------------
// Keyboard Controls
// -------------------------

document.addEventListener("keydown", (event) => {

    if (event.code === "Space") {
        event.preventDefault();

        if (audio.paused) {
            playSong();
        } else {
            pauseSong();
        }
    }

    if (event.code === "ArrowRight") {
        audio.currentTime += 5;
    }

    if (event.code === "ArrowLeft") {
        audio.currentTime -= 5;
    }
});


// -------------------------
// Initialize
// -------------------------

createPlaylist();
loadSong(0);
