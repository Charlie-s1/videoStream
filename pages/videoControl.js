let mouseMoved = false;
let mouseStartedMoving = false;

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
    div.addEventListener("mousemove",(e)=>{
        mouseStartedMoving = true;
        mouseMoved = true;
        document.querySelector("#customControls").classList.add("show")
    });

    const vid = document.querySelector("#videoPlayer") || {duration:0} ;
    div.classlist = "show";
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

setInterval(()=>{
    if(mouseMoved && mouseStartedMoving){
        document.querySelector("#customControls") ? document.querySelector("#customControls").classList.add("show"):null;
        console.log("move");
        mouseStartedMoving = false;
    }
    else{
        document.querySelector("#customControls") ? document.querySelector("#customControls").classList.remove("show"):null;
    }
    mouseMoved = false;
},5000)