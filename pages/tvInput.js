window.addEventListener('load', init);
/**
 * initialise page
 */
function init() {
    document.addEventListener('keydown',remote);
}

function remote(e){
    //alert(e.code);
    //document.body.style.background = "blue";
}