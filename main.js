let musicContainer = document.getElementById("music-container");
let playBtn = document.getElementById("play");
let prevBtn = document.getElementById("prev");
let nextBtn = document.getElementById("next");
let audio = document.getElementById("audio");
let progress = document.getElementById("progress");
let progressContainer = document.getElementById("progress-container");
let title = document.getElementById("title");
let singer = document.getElementById("singer");
let cover = document.getElementById("cover");
let playlist = document.getElementById("playlist");

const songs = [
  {
    name: "Luon yeu doi",
    singer: "Den Vau",
    path: "./music/LuonYeuDoi.mp3",
    image: "./image/luon yeu doi.jpg",
  },
  {
    name: "Ha Phom",
    singer: "Hoang Thuy Linh",
    path: "./music/HaPhom.mp3",
    image: "./image/ha phom.jpg",
  },
  {
    name: "Bo xi Bo",
    singer: "Hoang Thuy Linh",
    path: "./music/BoXiBo.mp3",
    image: "./image/bo xi bo.jpg",
  },
  {
    name: "Like this like that",
    singer: "Toc Tien",
    path: "./music/LikeThisLikeThat.mp3",
    image: "./image/like this like that.jpg",
  },
  {
    name: "How you like that",
    singer: "BlackPink",
    path: "./music/How you like that.mp3",
    image: "./image/How you like that.jpeg",
  },
  {
    name: "Kill this love",
    singer: "BlackPink",
    path: "./music/Kill this love.mp3",
    image: "./image/Kill this love.jpeg",
  },
  {
    name: "Pink Vernom",
    singer: "BlackPink",
    path: "./music/PinkVernom.mp3",
    image: "./image/Pink Vernom.jpg",
  },
];

let songIndex = 0; // mặc định phát bài  đầu tiên
//CALL, truyền tham số là index của array
loadSong(songs[songIndex]);
render();
//render Lists
function render() {
  const htmls = songs.map((song, index) => {
    return `
      <div class="song ${
        index === songIndex ? "active" : ""
      }" data-index="${index}">
        <div
          class="thumb"
          style=" background-image: url('${song.image}');"
        ></div>
        <div class="body">
          <h3 class="title">${song.name} </h3>
          <p class="author">${song.singer}</p>
        </div>
        <div class="option">
          <i class="fas fa-ellipsis-h"></i>
        </div>
      </div>`;
  });
  playlist.innerHTML = htmls.join("");
}

//LOAD SONG
function loadSong(song) {
  title.innerText = song.name;
  singer.innerText = song.singer;
  cover.src = song.image;
  audio.src = song.path;
}

//play song

function playSong() {
  musicContainer.classList.add("play");

  playBtn.querySelector("i.fa-solid").classList.remove("fa-play");
  playBtn.querySelector("i.fa-solid").classList.add("fa-pause");

  audio.play();
}

//pause song

function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fa-solid").classList.remove("fa-pause");
  playBtn.querySelector("i.fa-solid").classList.add("fa-play");

  audio.pause();
}
//next song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
  render();
}

//Prev song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
  render();
}
//update progress
function updateProgress(event) {
  let currentTime = event.srcElement.currentTime;
  let duration = event.srcElement.duration;
  let progressPercentage = (currentTime / duration) * 100;
  progress.style.width = `${progressPercentage}%`;
}

//set progress

function setProgress(event) {
  let width = this.clientWidth;
  let clickX = event.offsetX;
  let duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}
//event
playBtn.addEventListener("click", function () {
  let isplaying = musicContainer.classList.contains("play");
  if (isplaying) {
    pauseSong();
  } else {
    playSong();
  }
});
document.body.addEventListener("keydown", function (event) {
  let isplaying = musicContainer.classList.contains("play");
  if (event.code === "Space") {
    if (isplaying) {
      pauseSong();
    } else {
      playSong();
    }
  }
});

//Click song
playlist.addEventListener("click", function (e) {
  const songNode = e.target.closest(".song:not(.active)");
  if (songNode || e.target.closest(".option")) {
    songIndex = songNode.dataset.index;
    loadSong(songs[songIndex]);

    playSong();
    render();
  }
});
//change song
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener("ended", nextSong);
progressContainer.addEventListener("click", setProgress);
