window.addEventListener('load', init);

function init() {
  document.querySelector("#film").addEventListener('click',main);
  document.querySelector("#tv").addEventListener('click',main);
  document.querySelector("#ord").addEventListener('change',main)
  //document.querySelector("#cat").addEventListener('change',main);
}

async function getFiles(dir){
  // const tmpImg = document.createElement("img");
  // tmpImg.src = "/files/loading.gif";
  // tmpImg.id = "tmpImg";
  // const lib = document.querySelector("#library");
  let files = await fetch(dir);
  let list = await files.json();
  const sort = document.querySelector("#ord");

  if(sort.value == "score"){
    list.files.sort((a, b) => b.vote_average - a.vote_average);
  }else if(sort.value == "quality"){
    list.files.sort(function(a, b){
      if(a.quality < b.quality){
        return -1;
      }if(a.quality>b.quality){
        return 1;
      }
      return 0;
    });
  }
  else if(sort.value == "date"){
    list.files.sort(function(a,b){
      if(a.release_date < b.release_date){
        return -1;
      }if(a.release_date>b.release_date){
        return 1;
      }
      return 0;
    });
  }
  return list;
}

async function main(e){
  const ord = document.querySelector("#ord");
  if(e.target.id=="film"){
    film.classList = "select";
    tv.classList.remove("select");
    ord.classList = "category";
  }else if(e.target.id=="tv"){
    tv.classList = "select";
    film.classList.remove("select");
    ord.classList = "hide";
  }
  
  let url = window.location + "list/?folder=";
  let urlAddition = "";
  const select = document.querySelector(".select").textContent;
  let level = 0;

  
  if (e.target.classList == "select"){
    urlAddition = e.target.textContent;
  } else if(e.target.id == "ord"){
    urlAddition = select;
  }
  else{
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
  
  const films = await getFiles(url);
  
  //let films = [];
  let cats = ["select..."];
  const files = ["mkv","mp4","avi"];
  
  // for (child of children){
  //   if (files.indexOf(child.split('.').pop()) == "txt"){
  //     // films.push(child);
  //   // 
  //   }
  //   else{
  //     cats.push(child);
  //   }
  // } 

  showVideo(films.files, urlAddition.split("/"));
  if(films.cat.length > 1){
    if (level==0){
      showCatagories(films.cat);
    }else{
      showCatagories(films.cat,true);
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


async function showVideo(videos,urlList){

  const lib = document.querySelector("#library");
  lib.innerHTML = "";
  let infoList = [];
  let imageList = [];
  
  
  
  // for (child of videos){
  //   const filmSplit = child.split(/[()\[\]]+/);
  //   if(urlList[1] == "TV"){
  //     imageList.push(await movieArt(urlList[2], {type:'tv', size:'w185'}));
  //   }else{
  //     //imageList.push(await movieArt(filmSplit[0], {year:filmSplit[1], size:'w185'}));
  //     infoList.push(await movieInfo(filmSplit[0], filmSplit[1]));
      
  //   }
  // }
  
  let i = 0;
  
  for (child of videos){
    const image = document.createElement("img");
    image.alt = child.title
    const title = document.createElement("p");
    const score = document.createElement("p");
    const qual = document.createElement("p");
    const div = document.createElement("div");
    div.classList = "videoCon";
    const link = document.createElement("a");
    link.classList = "videoLink";
    

    lib.appendChild(div);
    div.appendChild(link);
    
    if (urlList[0] == "TV"){
      image.src = await movieArt(urlList[1], {type:'tv', size:'w185'});
      title.textContent = child.title;
      image.id = child.link;
      image.addEventListener('click',startVideo);
      title.id = child.link;
      title.classList = "title";
      title.addEventListener('click',startVideo);
      link.appendChild(title);
    }else{
      score.textContent = child.vote_average;
      score.classList = "score";
      qual.textContent = child.quality;
      qual.classList = "qual";
      link.alt = child.title;
      image.src = child.imageBase + child.poster_path;
      image.id = child.link;
      image.addEventListener('click',startVideo);
      image.title = child.overview;
      console.log(child);
      
      div.prepend(score);
      div.prepend(qual);
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
      drop.classList = "category";
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
      createCat.classList = "category";
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
async function startVideo(e){
  if (document.querySelector("video")){
    document.querySelector("video").remove();
  }

  const sub = document.createElement("track");
  sub.src = `http://192.168.0.76:8080/files/Films/${e.target.alt}.vtt`;
  sub.label = "English";
  sub.kind = "captions";
  // sub.default = true;
  // sub.srclang = "en";

  const lib = document.querySelector("#videoCont");
  const vid = document.createElement('video');
  const source = document.createElement("source");
  source.src = e.target.id;
  source.type="video/mp4";
  vid.controls = true;
  vid.autoplay = true;

  vid.appendChild(source);
  vid.appendChild(sub);
  lib.prepend(vid); 
  scroll(0,0);
}
