
var scroll = window.requestAnimationFrame
  || window.webkitRequestAnimationFrame
  || window.mozRequestAnimationFrame
  || window.msRequestAnimationFrame
  || window.oRequestAnimationFrame
  || function(callback){ window.setTimeout(callback, 1000/60) };
var lastPosition = -1;

var lastSection = false;
var replaceItemTop = -1;
var replaceItemBottom = -1;
var replaceItemHeight = -1;
 
// scroll function
function loop(){
  var top = window.pageYOffset;

  var sections = document.querySelectorAll('.section');
  var replaceContainer = document.querySelectorAll('.js-replace');
  var replaceItem = document.querySelectorAll('.js-replace__item');

  if (replaceItem.length > 0) {
    // get top position of item from container, because image might not have loaded
    replaceItemTop = parseInt(replaceContainer[0].getBoundingClientRect().top);
    replaceItemHeight = replaceItem[0].offsetHeight;
    replaceItemBottom = replaceItemTop + replaceItemHeight;
  }

  var sectionTop = -1;
  var sectionBottom = -1;
  var currentSection = -1;
  
  // Fire when needed
  if (lastPosition == window.pageYOffset) {
    scroll(loop);
    return false;
  } else {
    lastPosition = window.pageYOffset;

  Array.prototype.forEach.call(sections, function(el, i){
    sectionTop = parseInt(el.getBoundingClientRect().top);
    sectionBottom = parseInt(el.getBoundingClientRect().bottom);


    if ( (sectionTop <= replaceItemBottom) && (sectionBottom > replaceItemTop)) {
      currentSection = el.classList.contains('section--bg');

      if ( currentSection ) { 
        replaceContainer[0].classList.remove('js-replace--reverse');
      } else {
        replaceContainer[0].classList.add('js-replace--reverse')
      }
    }

    if ( (replaceItemTop < sectionTop) && ( sectionTop <= replaceItemBottom) ) {
      if (currentSection != lastSection)  {
        document.documentElement.style.setProperty('--replace-offset', 100 / replaceItemHeight * parseInt(sectionTop - replaceItemTop) + '%');
      }
    }

    if ( replaceItemTop >= sectionTop ) {
      document.documentElement.style.setProperty('--replace-offset', 0 + '%');
      lastSection = currentSection;
    }

  }); 

}

scroll( loop )
}

loop();

window.onresize = function(event) {
  loop();
};