window.addEventListener('load', init);

function init() {
  document.querySelector("#film").addEventListener('click',main);
  document.querySelector("#tv").addEventListener('click',main);
  //document.querySelector("#cat").addEventListener('change',main);
}

async function getFiles(dir){
  let files = await fetch(dir);
  let list = await files.json();
  return list;
}

async function main(e){

  if(e.target.id=="film"){
    film.classList = "select";
    tv.classList.remove("select");
  }else if(e.target.id=="tv"){
    tv.classList = "select";
    film.classList.remove("select");
  }
  
  let url = window.location + "list/?folder=";
  let urlAddition = "";
  const select = document.querySelector(".select").textContent;
  let level = 0;

  if (e.target.classList == "select"){
    urlAddition = e.target.textContent;
  }else{
    if (e.target.id == "cat"){
      urlAddition = `${select}/${e.target.value}`;
      level = 1;
    }
    else{
      const cat = document.querySelector("#cat").value;
      urlAddition = `${select}/${cat}/${e.target.value}`;
      level = 2;
    }
  }
  url += urlAddition;
  const children = await getFiles(url);
  let films = [];
  let cats = ["select..."];
  const files = ["mkv","mp4","avi"];
  
  for (child of children){
    if (files.indexOf(child.split('.').pop()) >= 0){
      films.push(child);
    }else if(child.split('.').pop() == "txt"){}
    else{
      cats.push(child);
    }
  } 
  showVideo(films,"files/" + urlAddition);
  
  if(cats.length > 1){
    if (level==0){
      
        showCatagories(cats);
      
    }else{
      showCatagories(cats,true);
    }
  }else{ 
    if(document.querySelector("#cat") && level==0){
      document.querySelector("#cat").remove();
    }
    if(document.querySelector("#cat2") && level<1){
      document.querySelector("#cat2").remove();
      document.querySelector("#between").remove();
    }
  }

  if(level<2){
    
  }


async function showVideo(videos,url){
  console.log(url.split('/'));
  urlList = url.split('/');

  const lib = document.querySelector("#library");
  lib.innerHTML = "";
  let imageList = [];

  const tmpImg = document.createElement("img");
  tmpImg.src = "/files/loading.gif";
  tmpImg.id = "tmpImg";
  lib.appendChild(tmpImg);
  
  for (child of videos){
    if(urlList[1] == "TV"){
      imageList.push(await movieArt(urlList[2], {type:'tv', size:'w185'}));
    }else{
      imageList.push(await movieArt(child.split('(')[0], {size:'w185'}));
    }
  }
  lib.innerHTML = "";
  let i = 0;
  for (child of videos){
    const image = document.createElement("img");
    image.alt = child.slice(0,-4);
    const title = document.createElement("p");

    const div = document.createElement("div");
    div.classList = "videoCon";
    const link = document.createElement("a");
    link.classList = "videoLink";
    link.href = `${url}/${child}`;
    link.alt = child.slice(0,-4);

    lib.appendChild(div);
    div.appendChild(link);

    if (urlList[1] == "TV"){
      image.src = imageList[i];
      console.log("ART",urlList[2]);
      title.textContent = child.slice(0,-4);
      div.appendChild(title);
    }else{
      image.src = imageList[i];
    }
    i++;
    link.appendChild(image);
  }
}

function showCatagories(cats,catTwo){
  const folders = document.querySelector("#folders");
  
  if (catTwo){
    if(!document.querySelector("#cat2")){
      const span = document.createElement("span");
      span.textContent = " / ";
      span.id = "between";
      folders.appendChild(span);

      const drop = document.createElement("select");
      drop.addEventListener("change",main);
      drop.id = "cat2";
      drop.classList = "catagory";
      folders.appendChild(drop);
      for (child of cats){
        const option = document.createElement("option");
        option.textContent = child;
        option.value = child;
        drop.appendChild(option);
      }
    } else{
      document.querySelector("#cat2").innerHTML = "";
      for (child of cats){
        const option = document.createElement("option");
        option.textContent = child;
        option.value = child;
        document.querySelector("#cat2").appendChild(option);
      }
    }
  }else{
    if(!document.querySelector("#cat")){
      const createCat = document.createElement("select");
      createCat.id = "cat";
      createCat.classList = "catagory";
      document.querySelector("#folders").appendChild(createCat);
      createCat.addEventListener('change',main);
    }else{
      document.querySelector("#cat").innerHTML = "";
    }

    

    if(document.querySelector("#cat2")){
      document.querySelector("#cat2").remove();
      document.querySelector("#between").remove();
    }
    for(child of cats){
      const cat = document.querySelector("#cat");
      const option = document.createElement("option");
      option.textContent = child;
      option.value = child;
      cat.appendChild(option);
    }
    
  }
}
}
