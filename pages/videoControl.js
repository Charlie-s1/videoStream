function nextVideo(e){
    if(document.querySelector(".select").textContent == "TV"){
        const playing = document.querySelector(".playingNow");
        const upnext = playing.nextSibling;
        startVideo({"target":upnext.childNodes[0].childNodes[1]});
    }else{
    }
}
function playPauseVid(e){
    const vid = document.querySelector("#videoPlayer");
    if(vid.paused){
        vid.play();
        e.target.textContent = "| |";
    } else{
        vid.pause();
        e.target.textContent = ">";
        console.log(vid.time-divider);
    }
}
function fullScreenVid(e){
    if(document.fullscreenElement){
        document.exitFullscreen();
        e.target.textContent = "[ ]";
    }else{
        document.querySelector("#videoContainer").requestFullscreen();
        e.target.textContent = "X";
    }
}
function createControls(){
    const div = document.createElement("div");
    const vid = document.querySelector("#videoPlayer") || {duration:0} ;
    div.id = "customControls";

    const playingTitle = document.createElement("p");
    playingTitle.id = "playingTitle";
    playingTitle.textContent = document.querySelector(".playingNow").id;
    div.appendChild(playingTitle)

    const playpause = document.createElement("p");
    playpause.id = "playpause";
    playpause.textContent = ">";
    playpause.addEventListener("click",playPauseVid);
    div.appendChild(playpause);

    const next = document.createElement("p");
    next.id = "nextVid";
    next.textContent = ">>";
    next.addEventListener("click",nextVideo);
    div.appendChild(next);

    const fullScreen = document.createElement("p");
    fullScreen.id = "fullScreen";
    fullScreen.textContent = "[ ]";
    fullScreen.addEventListener("click",fullScreenVid);
    div.appendChild(fullScreen);

    return div
}