// script.js
const songs = [
  { title: "Song 1", artist: "Artist 1", src: "song1.mp3" },
  { title: "Song 2", artist: "Artist 2", src: "song2.mp3" },
  { title: "Song 3", artist: "Artist 3", src: "song3.mp3" }
];

let songIndex = 0;
let isPlaying = false;

const audio = document.getElementById('audio');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const currentTime = document.getElementById('current-time');
const duration = document.getElementById('duration');
const volume = document.getElementById('volume');
const playlistDiv = document.getElementById('playlist');

function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.src;
}

function playSong() {
  audio.play();
  isPlaying = true;
  playBtn.textContent = "⏸";
}

function pauseSong() {
  audio.pause();
  isPlaying = false;
  playBtn.textContent = "▶";
}

function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

playBtn.addEventListener('click', () => {
  isPlaying ? pauseSong() : playSong();
});

nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);

audio.addEventListener('loadedmetadata', () => {
  duration.textContent = formatTime(audio.duration);
  progress.max = audio.duration;
});

audio.addEventListener('timeupdate', () => {
  progress.value = audio.currentTime;
  currentTime.textContent = formatTime(audio.currentTime);
});

progress.addEventListener('input', () => {
  audio.currentTime = progress.value;
});

volume.addEventListener('input', () => {
  audio.volume = volume.value;
});

audio.addEventListener('ended', nextSong); // Autoplay next

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

// Playlist display
songs.forEach((song, index) => {
  const item = document.createElement("div");
  item.textContent = `${song.title} - ${song.artist}`;
  item.addEventListener("click", () => {
    songIndex = index;
    loadSong(song);
    playSong();
  });
  playlistDiv.appendChild(item);
});

// Initial load
loadSong(songs[songIndex]);