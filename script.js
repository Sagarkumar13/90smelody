const playerWindow = document.getElementById("players");
const audio = document.getElementById("audio");
const name = document.getElementById("name");
const category = document.getElementById("category");
const thumbnail = document.getElementById("thumbnail");
const playBtn = document.getElementById("playBtn");
const progress = document.getElementById("progress");
const ttview = document.getElementById("ttview");
const tcview = document.getElementById("tcview");
const volumeBar = document.getElementById("volumeBar");

const musicList = document.getElementById("music-list");
const body = document.querySelector("body");
// variable
let musicData = [
  {
    id: 1,
    category: "Sagar Kumar",
    name: "Aaj Phir Tum Pe",
    src: "https://www.dropbox.com/scl/fi/mzidj37z1ubgrfgpz7z48/Aaj_Phir_Tum_Pe.mp3?rlkey=vvdprzkweec48a652ve6fgnsv&st=3knsxmas&dl=1",
    image:
      "images/IMG_20220116_153005.jpg",
  },
  {
    id: 2,
    category: "Sagar Kumar",
    name: "Ae Mere Humsafar",
    src: "https://www.dropbox.com/scl/fi/yzxc79lb64vjehuj59c54/Ae_Mere_Humsafar.mp3?rlkey=jhnydmzff6uwpokuxakq6cv1f&st=cab8t90h&dl=1",
    image:
      "images/IMG_20220116_152953.jpg",
  },
  {
    id: 3,
    category: "Sagar Kumar",
    name: "Are Jane Kaise Kab Kahan Iqrar",
    src: "https://www.dropbox.com/scl/fi/7c4u9xdr15q0eogf7lik0/Are_Jane_Kaise_Kab_Kahan_Iqrar.mp3?rlkey=manzrf537gdpbe0zj4c6kzjah&st=poz48apv&dl=1",
    image:
      "images/IMG_20220116_153016.jpg",
  },
  {
    id: 4,
    category: "Sagar Kumar",
    name: "Baar Baar Dekho Hazar Baar Dekho",
    src: "https://www.dropbox.com/scl/fi/ymf3xqy4rwqnmt0e8sgha/Baar_Baar_Dekho_Hazar_Baar_Dekho.mp3?rlkey=vc1ielohhkz3k5qnxt0ezoq9p&st=niovbnes&dl=1",
    image:
      "images/IMG_20220116_152624.jpg",
  },
  {
    id: 5,
    category: "Sagar Kumar",
    name: "Chura Liya Hai Tumne Jo Dil Ko",
    src: "https://www.dropbox.com/scl/fi/vw3w13hexsc0bli0ep6mb/Chura_Liya_Hai_Tumne_Jo_Dil_Ko.mp3?rlkey=k7nciuf4htympnxunr3fvgkm2&st=a9bkfi2w&dl=1",
    image:
      "images/IMG_20220116_153140.jpg",
  },
  {
    id: 6,
    category: "Sagar Kumar",
    name: "Gazab Ka Hai Din",
    src: "https://www.dropbox.com/scl/fi/6ruv9zwwdnpulolvbp45p/Gazab_Ka_Hai_Din.mp3?rlkey=b7q0v7jqefq6vitbm8ai3sq1j&st=yzctef5y&dl=1",
    image:
      "images/IMG_20220116_153046.jpg",
  },



];
let repeatMusic = false;
let index = 1;
let songs = musicData;

const elc = musicList.getElementsByClassName("equalize")[index - 1];

const showMusicList = () => {
  document.querySelector(".sec-1").classList.add("hide");
  document.querySelector(".sec-2").classList.remove("hide");
};
const darkMood = () => {
  body.classList.toggle("dark");
};

const setActive = (i) => {
  setEqualizer();
  let a = musicList.querySelector(".active");
  if (a !== null) {
    a.classList.remove("active");
  }
  const ele = document.getElementsByClassName("music")[i - 1];
  ele.classList.add("active");
};

const setData = (data) => {
  name.textContent = data.name;
  category.textContent = data.category;
  thumbnail.src = data.image;
};

const playMusic = async (i) => {
  if (i == 18 || i == 10) {
    body.classList.toggle("dark");
    setTimeout(() => body.classList.toggle("dark"), 7000);
  }
  let data = musicData.find((m) => m.id === i) || musicData[1];
  setActive(i);
  setData(data);
  playBtn.textContent = "pause";
  audio.src = data.src;
  await audio.load();
  audio.play();
};

const playPause = (e) => {
  if (audio.paused) {
    playBtn.textContent = "pause";
    audio.play();
    setEqualizer();
  } else {
    playBtn.textContent = "play_arrow";
    audio.pause();
    setEqualizer(true);
  }
};

const showplayer = () => {
  playerWindow.classList.toggle("active");
};
const equalizerBtn = (e) => {
  e.target.classList.toggle("active");
  document.querySelector(".thumbnail").classList.toggle("spin");
};
const addFvt = (e) => {
  e.target.classList.toggle("active");
};
const repeat = (e) => {
  e.target.classList.toggle("active");
  repeatMusic = !repeatMusic;
  audio.loop = repeatMusic;
};
const volumeBox = (e) => {
  e.target.classList.toggle("active");
  document.querySelector(".volume-box").classList.toggle("show");
};
const nextPlay = () => {
  index++;
  if (index > musicData.length) {
    index = 1;
  }
  playMusic(index);
};
const prevPlay = () => {
  index--;
  if (index <= 0) {
    index = musicData.length;
  }
  playMusic(index);
};
// eventListners
audio.addEventListener("ended", () => {
  nextPlay();
});
audio.onloadeddata = () => {
  progress.max = audio.duration;
  const ds = parseInt(audio.duration % 60);
  const dm = parseInt((audio.duration / 60) % 60);
  ttview.textContent = dm + ":" + ds;
};
audio.ontimeupdate = () => {
  progress.value = audio.currentTime;
};
audio.addEventListener(
  "timeupdate",
  () => {
    //progress.value = audio.currentTime;
    var cs = parseInt(audio.currentTime % 60);
    var cm = parseInt((audio.currentTime / 60) % 60);
    ctview.textContent = cm + ":" + cs;
  },
  false
);

const changeProgressBar = () => {
  audio.currentTime = progress.value;
};

/* volume control */
const volumeDown = () => {
  volumeBar.value = Number(volumeBar.value) - 20;
  audio.volume = volumeBar.value / 100;
};
const volumeUp = () => {
  volumeBar.value = Number(volumeBar.value) + 20;
  audio.volume = volumeBar.value / 100;
};

const addList = (data) => {
  let div = document.createElement("div");
  div.classList.add("music");
  div.setAttribute("data-id", data.id);
  let html = `
   <div class="list-thumbnail" >
    <img src="${data.image}" alt="" >
   </div>
   <div class="list-content" >
   <h3>${data.name}</h3>
   <small>${data.category}</small>
   </div>
   <button class="list-btn" >
   <i class="material-icons">play_arrow</i>
    <div class="equalize">
    <span></span>
    <span></span>
    <span></span>
   </div>
   </button>`;
  div.innerHTML = html;
  musicList.append(div);
  div.addEventListener("click", () => {
    playMusic(data.id);
    playerWindow.classList.add("active");
    index = data.id;
  });
};

const setMusicList = () => {
  songs.forEach((song) => addList(song));
};

const FirstSetUp = () => {
  audio.src = musicData[index - 1].src;
  setData(musicData[index - 1]);
  setMusicList();
};
FirstSetUp();

const filterCat = (cat) => {
  songs = musicData.filter((song) => song.category == cat);
  while (musicList.hasChildNodes()) {
    musicList.removeChild(musicList.firstChild);
  }
  setMusicList();
};
const filterAll = () => {
  songs = musicData;
  while (musicList.hasChildNodes()) {
    musicList.removeChild(musicList.firstChild);
  }
  setMusicList();
};
function setEqualizer(action = false) {
  const elc = musicList.getElementsByClassName("equalize")[index - 1];
  const thumb = document.querySelector(".thumbnail");
  if (elc.classList.contains("pause")) {
    elc.classList.remove("pause");
  } else {
    if (action) {
      elc.classList.add("pause");
    }
  }
  if (thumb.classList.contains("spin") && audio.paused && action) {
    thumb.classList.add("pause");
  } else if (thumb.classList.contains("spin") && !audio.paused) {
    thumb.classList.remove("pause");
  }
}
