//Music Database
const music_list = [
    {
        img : 'images/image5.jpg',
       name : 'Karha',
       artist : 'Honey Sidhu',
       music : 'music/Karha - Honey Sidhu.mp3'
    },
    {
        img : 'images/image1.jpg',
       name : 'Tumhe jo maine Dekha',
       artist : 'Shriya Ghosal',
       music : 'music/Tumhe Jo Maine Dekha - Main Hoon Na 128 Kbps.mp3'
    },
    {
        img : 'images/image4.jpg',
       name : 'Expert jatt',
       artist : 'Nawab',
       music : 'music/Expert Jatt - Nawab.mp3'
    },
    {
        img : 'images/image2.jpg',
       name : 'Bapu Zimidar',
       artist : 'Jassi Gill',
       music : 'music/Bapu Zimidar.mp3'
    },
    {
        img : 'images/image3.jpg',
       name : '10 Mint',
       artist : 'Sippy Gill',
       music : 'music/10 Mint - (Raag.Fm).mp3'
    },
    {
      img:"images/image6.jpg",
      name:"Meri Waffayan Yaad Karoge",
      artist:"Kumar Sanu & Asha Bhosle",
      music:"music/Meri Wafayen Yaad Karoge - Sainik 320 Kbps.mp3"
    },
];
//reference

let now_playing = document.querySelector('.now-playing');
let song_img = document.querySelector('.song-img');
let song_name = document.querySelector('.song-name');
let song_artist = document.querySelector('.song-artist');

let playpause_btn = document.querySelector('.playpause');
let next_btn = document.querySelector('.next_song');
let prev_btn = document.querySelector('.previous_song');    

let seek_slider = document.querySelector('.seek_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;



loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    song_img.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    song_name.textContent = music_list[track_index].name;
    song_artist.textContent = music_list[track_index].artist;
    now_playing.textContent = "Playing music " + (track_index + 1) + " of " + music_list.length;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
    random_bg_color();
}

function random_bg_color(){
    let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
    let a;

    function populate(a){
        for(let i=0; i<6; i++){
            let x = Math.round(Math.random() * 14);
            let y = hex[x];
            a += y;
        }
        return a;
    }
    let Color1 = populate('#');
    let Color2 = populate('#');
    var angle = 'to right';

    let gradient = 'linear-gradient(' + angle + ',' + Color1 + ', ' + Color2 + ")";
    document.body.style.background = gradient;
}
function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}
function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}
function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
}
function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}
function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    curr_track.play();
    isPlaying = true;
    song_img.classList.add('rotate');
    wave.classList.add('loader');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    song_img.classList.remove('rotate');
    wave.classList.remove('loader');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}

function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationMinutes;
    }
}