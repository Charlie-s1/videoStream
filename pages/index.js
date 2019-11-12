window.addEventListener('load', init);

function init() {
  // document.querySelector("#Films").addEventListener('click',post);
  // document.querySelector("#Tv").addEventListener('click',post);

  showFiles("");
}


async function getFiles(dir){
  let files = await fetch(dir);
  let list = await files.json();
  return list;
}

async function showFiles(dir){
  const children = await getFiles(window.location + "list/?folder=pages/files/" + dir)
  const sec = document.querySelector("#list");
  const body = document.body;
  body.innerHTML = "";
  sec.innerHTML = "";
  sec.id = "list";

  const back = document.createElement("p");
  back.textContent = "<";
  body.appendChild(back);
  back.addEventListener('click',getParentFolder);

  body.appendChild(sec);

  for (child of children){
      const p = document.createElement("p");
      p.textContent = dir+"/"+child;
      sec.appendChild(p);
    if (child.split('.').pop() == "mkv" || child.split('.').pop() == "mp4"){
      p.addEventListener('click',open);

    }else {
      p.addEventListener('click',getSubFiles);
    }
  }
}

async function getSubFiles(e){
  showFiles(e.target.textContent);
}
//go back file
async function getParentFolder(e){
  let file = document.querySelector("#list").children[0].textContent;
  let list = file.split("/");
  list.pop(list.length);
  list.pop(list.length);

  showFiles(list.join("/"));

}

function open(e){
  //const sec = document.querySelector("#list");

  const vid = document.querySelector("video");
  vid.style.display="block";
  //const src = document.createElement("source");
  //window.location.href = window.location + "files/" + e.target.textContent;
//sec.innerHTML = "";
 // console.log(e.target.textContent);
  vid.src =  window.location + "files/" + e.target.textContent;
  //sec.appendChild(vid);
  //vid.appendChild(src);
}
