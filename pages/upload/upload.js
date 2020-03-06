
window.addEventListener('load', init);

function init() {
  document.querySelector("#submit").addEventListener("click",uploadFiles);
  document.querySelector("#tvFilm").addEventListener("change",createOptions);
  document.querySelector("#lv1").addEventListener("change",createOptions);
}

async function getFolders(dir){
    let files = await fetch(dir);
    let list = await files.json();
    let cats = [];
    for (item of list){
        if (item.split('.').pop() != "mkv" && item.split('.').pop() != "mp4"){
            cats.push(item);            
        }
    }
    return cats;
}

async function createOptions(e){
    const tvFilm = document.querySelector("#tvFilm").value;
    const form = document.querySelector("#form");
    let url = "/list/?folder=pages/files/";
    if (e.target.id == "tvFilm"){
        url += tvFilm
        if(document.querySelector("#lv1List")){
            document.querySelector("#lv1List").remove();
        }
        let lv1List = document.createElement("datalist");
        lv1List.id = "lv1List";
        form.appendChild(lv1List);

        const folders = await getFolders(url);
        for (cat of folders){
            let option = document.createElement("option");
            option.value = cat;
            lv1List.appendChild(option);
        }
        
    }
    else if(e.target.id == "lv1"){
        url += tvFilm + "/" + e.target.value;
        if(document.querySelector("#lv2List")){
            document.querySelector("#lv2List").remove();
        }
        let lv2List = document.createElement("datalist");
        lv2List.id = "lv2List";
        form.appendChild(lv2List);

        const folders = await getFolders(url);
        for (cat of folders){
            let option = document.createElement("option");
            option.value = cat;
            lv2List.appendChild(option);
        }
    }
    

}

function uploadFiles(){
    const prog = document.querySelector(".prog");
    const progCont = document.querySelector(".progCont");
    progCont.style.display = "block"
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/uploadFiles");

    xhr.upload.onprogress = function(e){
        //if(e.lengthConputatble){
            let percent = Math.round((((e.loaded/e.total)*100)*100)/100)
            console.log(`${e.loaded}/${e.total} `, `${percent}%`);
            prog.style.width = `${percent}%`
        //}
    }
    xhr.onloadstart = function (e) {
        console.log("start");
    }
    xhr.onloadend = function (e) {
        console.log("end");
        prog.innerHTML = "<h1>Done</h1>"
    }
    xhr.send(new FormData(document.querySelector("#form")));
}