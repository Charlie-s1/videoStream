mp4 file stream
===============
Using this website you can upload and stream mp4 files remotely 

To start
--------
1) run command `npm i` to install required packages
2) start the application using `npm start`
3) Place files in either of the folders ("files/Films" or "files/TV")
    * film files must follow format: "Films/name of film(release year)[quality].mp4"
    * TV files must be placed inside a folder containing name of show  
    (e.g. "TV/name of show/*episode*.mp4" or "TV/name of show/*episode*.mp4")
4) If new .mp4 files placed in files/Films run `npm run createFilmJson` to add to the website
