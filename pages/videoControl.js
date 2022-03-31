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
function playPauseVid(){
    const vid = document.querySelector("#videoPlayer");
    const button = document.querySelector("#playpause");
    if(vid.paused){
        vid.play();
        button.textContent = "| |";
    } else{
        vid.pause();
        button.textContent = ">";
    }
}
function triggerSub(e){
    e.target.classList.toggle("noSub");
    const vid = document.querySelector("#videoPlayer");

    if (e.target.classList.contains("noSub")){
        vid.textTracks[0].mode = "disabled";
    }else{
        vid.textTracks[0].mode = "showing";
    }
}
function fullScreenVid(e){
    const button = document.querySelector("#fullScreen");
    if(document.fullscreenElement){
        document.exitFullscreen();
        button.textContent = "[ ]";
    }else{
        document.querySelector("#videoContainer").requestFullscreen();
        button.textContent = "X";
    }
}
function updateTime(e){
    const vid = document.querySelector("#videoPlayer");
    vid.currentTime = e.target.value/1000*vid.duration
}
function createControls(){
    const div = document.createElement("div");
    const bottomBar = document.createElement("div");
    bottomBar.id="bottomBar";

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
    bottomBar.appendChild(playpause);

    const next = document.createElement("p");
    next.id = "nextVid";
    next.textContent = ">|";
    next.addEventListener("click",nextVideo);
    bottomBar.appendChild(next);

    const time = document.createElement("input");
    time.id = "time";
    time.type = "range";
    time.max=1000;
    time.value = vid.currentTime;
    time.addEventListener("mouseenter",(e)=>{e.target.classList.add("timeHover")});
    time.addEventListener("mouseleave",(e)=>{e.target.classList.remove("timeHover")});
    time.addEventListener("change",updateTime);
    bottomBar.appendChild(time);

    const sub = document.createElement("p");
    sub.id = "sub";
    sub.classList = "noSub right";
    sub.textContent = "S";
    sub.addEventListener("click",triggerSub);
    bottomBar.appendChild(sub);

    const fullScreen = document.createElement("p");
    fullScreen.id = "fullScreen";
    fullScreen.classList = "right";
    fullScreen.textContent = "[ ]";
    fullScreen.addEventListener("click",fullScreenVid);
    bottomBar.appendChild(fullScreen);

    div.appendChild(bottomBar);
    div.classList = "show";
    return div
}

setInterval(()=>{
    const controls = document.querySelector("#customControls") ? document.querySelector("#customControls") : null;
    
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
        document.querySelector("#time").value = (vid.currentTime/vid.duration)*1000 || 0;
        document.querySelector("#timeRemaining").textContent = `${numToTime(vid.currentTime)}/${numToTime(vid.duration)}`;
    }
},1000)

function numToTime(rawNum){
    let num = parseInt(rawNum);
    let hr = Math.floor(num/3600);
    let min = Math.floor((num - (hr * 3600)) / 60);
    let sec = num - (hr * 3600) - (min * 60);
    let time = "";
    
    if (hr   < 10) {hr   = "0"+hr;}
    if (min < 10) {min = "0"+min;}
    if (sec < 10) {sec = "0"+sec;}

    if (hr >= 1){
        time = `${hr}:${min}:${sec}`;
    }else{
        time = `${min}:${sec}`;
    }
    return time;
}
