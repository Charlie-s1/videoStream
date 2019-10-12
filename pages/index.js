window.addEventListener('load', init);

function init() {
  document.querySelector("#Films").addEventListener('click',post);
  document.querySelector("#Tv").addEventListener('click',post);
  // console.log(await getFilms("http://localhost:8080/list/Films"));
}


async function getFiles(dir){
  let files = await fetch(dir);
  let list = await files.json();
  return list;
}

async function post(e){
  const children = await getFiles(window.location + "list/?folder=pages/files/" + e.target.textContent)
  const sec = document.querySelector("#list");
  sec.innerHTML = "";
  sec.id = "list";
  document.body.appendChild(sec);
  for (child of children){
      const p = document.createElement("p");
      p.textContent = e.target.textContent+"/"+child;
      sec.appendChild(p);
    if (child.split('.').pop() == "mkv" || child.split('.').pop() == "mp4"){
      p.addEventListener('click',open);
      
    }else {
      p.addEventListener('click',post);
    }
  }
}

function open(e){
  //const sec = document.querySelector("#list");
  //const vid = document.createElement("video");
  //const src = document.createElement("source");
  window.location.href = window.location + "files/" + e.target.textContent; 
//sec.innerHTML = "";
 // console.log(e.target.textContent);
  //vid.src = e.target.textContent;
  //sec.appendChild(vid);
  //vid.appendChild(src);
}
