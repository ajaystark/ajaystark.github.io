function on() {
  document.getElementById("overlay").style.display = "block";
  document.body.scroll="no";
  document.body.style.overflow="hidden";
}

function off() {
  document.getElementById("overlay").style.display = "none";
  document.body.scroll="yes";
  document.body.style.overflow="visible";
}
function show_story(){
    $('.story').css('display','block');
    $('.show-button').addClass('hide');
}
ScrollReveal().reveal('.scroll-animation',{delay:500,distance:"200px",opacity:0,duration:1000});