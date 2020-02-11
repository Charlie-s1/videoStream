window.addEventListener('load', init);

function init() {
  document.querySelector("#film").addEventListener('click',showFiles);
  document.querySelector("#tv").addEventListener('click',showFiles);

  showFiles(document.querySelector(".select").textContent);
}
async function getFiles(dir){
  let files = await fetch(dir);
  console.log(files);
  let list = await files.json();
  return list;
}

async function showFiles(dir){
  const children = await getFiles(window.location + "list/?folder=pages/files/" + dir)
  const sec = document.querySelector("#list");
  const nav = document.querySelector("nav");
  const cat = document.querySelector("#cat")
  sec.id = "list";

  //nav.appendChild(sec);

  for (child of children){

    if (child.split('.').pop() == "mkv" || child.split('.').pop() == "mp4"){
      p.addEventListener('click',open);
      
    }else {
      const option = document.createElement("option");
      option.textContent = child;
      option.value = child;
      cat.appendChild(option);
    }
  }
}
