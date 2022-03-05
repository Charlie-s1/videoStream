let mouseMoved = true;
let mouseStartedMoving = true;

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
        // console.log(vid.time-divider);
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
function updateTime(e){
    const vid = document.querySelector("#videoPlayer");
    vid.currentTime = e.target.value/100*vid.duration
}
function createControls(){
    const div = document.createElement("div");
    div.addEventListener("mousemove",(e)=>{
        mouseStartedMoving = true;
        mouseMoved = true;
        div.style.cursor = "auto";
        for (child of div.childNodes){
            child.style.cursor = "pointer";
        }
        document.querySelector("#customControls").classList.add("show")
    });

    const vid = document.querySelector("#videoPlayer") || {currentTime:0} ;
    div.id = "customControls";

    const playingTitle = document.createElement("p");
    playingTitle.id = "playingTitle";
    playingTitle.textContent = document.querySelector(".playingNow").id;
    div.appendChild(playingTitle)

    const timeRemaining = document.createElement("p");
    timeRemaining.id = "timeRemaining";
    timeRemaining.textContent = `${vid.timeRemaining || "00:00:00"}/${vid.duration || "00:00:00"}`;
    div.appendChild(timeRemaining);

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

    const time = document.createElement("input");
    time.id = "time";
    time.type = "range";
    time.value = vid.currentTime;
    time.addEventListener("change",updateTime);
    div.appendChild(time);

    div.classList = "show";
    return div
}

setInterval(()=>{
    const controls = document.querySelector("#customControls") ? document.querySelector("#customControls") : null;
    const vid = document.querySelector("video") || {currentTime:0,duration:0};
    // if(document.querySelector("#time")){
    //     document.querySelector("#time").value = (vid.currentTime/vid.duration)*100 || 0;
    //     document.querySelector("#timeRemaining").textContent = `${numToTime(vid.currentTime)}/${numToTime(vid.duration)}`;
    // }

    if(mouseMoved && mouseStartedMoving){
        controls ? controls.classList.add("show") : null;
        mouseStartedMoving = false;
    }
    else{
        if (controls) {
            controls ? controls.classList.remove("show") : null;
            controls.style.cursor = "none";
            for (child of controls.childNodes){
                child.style.cursor = "none";
            }
        }
        
    }
    mouseMoved = false;
},4000)
setInterval(()=>{
    const vid = document.querySelector("video") || {currentTime:0,duration:0};
    if(document.querySelector("#time")){
        document.querySelector("#time").value = (vid.currentTime/vid.duration)*100 || 0;
        document.querySelector("#timeRemaining").textContent = `${numToTime(vid.currentTime)}/${numToTime(vid.duration)}`;
    }
},1000)

function numToTime(rawNum){
    let num = parseInt(rawNum);
    let hr = Math.floor(num/3600);
    let min = Math.floor((num - (hr * 3600)) / 60);
    let sec = num - (hr * 3600) - (min * 60);

    if (hr   < 10) {hr   = "0"+hr;}
    if (min < 10) {min = "0"+min;}
    if (sec < 10) {sec = "0"+sec;}
    return hr+':'+min+':'+sec;
}