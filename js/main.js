
var scroll = window.requestAnimationFrame
  || window.webkitRequestAnimationFrame
  || window.mozRequestAnimationFrame
  || window.msRequestAnimationFrame
  || window.oRequestAnimationFrame
  || function (callback) { window.setTimeout(callback, 1000 / 60) };

// variable to store the last scroll position
var lastPosition = -1;

// variables for parallax transition
var lastSection = false;
var replaceItemTop = -1;
var replaceItemBottom = -1;
var replaceItemHeight = -1;

// scroll function for parallax logo animation (switching from light to dark section and vice versa)
function loop() {
  // current scroll position
  var top = window.pageYOffset;

  // selecting sections and elements for replacement
  var sections = document.querySelectorAll('.section');
  var replaceContainer = document.querySelectorAll('.js-replace');
  var replaceItem = document.querySelectorAll('.js-replace__item');

  // calculate dimensions of replace item
  if (replaceItem.length > 0) {
    // get top position of item from container, because image might not have loaded
    replaceItemTop = parseInt(replaceContainer[0].getBoundingClientRect().top);
    replaceItemHeight = replaceItem[0].offsetHeight;
    replaceItemBottom = replaceItemTop + replaceItemHeight;
  }

  // Variables to store section dimensions and state
  var sectionTop = -1;
  var sectionBottom = -1;
  var currentSection = -1;

  // Fire when needed (check if scrolling)
  if (lastPosition == window.pageYOffset) {
    scroll(loop);
    return false;
  } else {
    lastPosition = window.pageYOffset;

    // Loop through sections
    Array.prototype.forEach.call(sections, function (el, i) {
      sectionTop = parseInt(el.getBoundingClientRect().top);
      sectionBottom = parseInt(el.getBoundingClientRect().bottom);

      // Determine if current section is light or dark
      if ((sectionTop <= replaceItemBottom) && (sectionBottom > replaceItemTop)) {
        currentSection = el.classList.contains('section--bg');

        // toggle class for replacing container based on current section
        if (currentSection) {
          replaceContainer[0].classList.remove('js-replace--reverse');
        } else {
          replaceContainer[0].classList.add('js-replace--reverse')
        }
      }

      // adjust parallax effect based on scroll position
      if ((replaceItemTop < sectionTop) && (sectionTop <= replaceItemBottom)) {
        if (currentSection != lastSection) {
          document.documentElement.style.setProperty('--replace-offset', 100 / replaceItemHeight * parseInt(sectionTop - replaceItemTop) + '%');
        }
      }

      // reset parallax effect if section is above the replace item
      if (replaceItemTop >= sectionTop) {
        document.documentElement.style.setProperty('--replace-offset', 0 + '%');
        lastSection = currentSection;
      }

    });

  }
  // continue animation loop
  scroll(loop)
}
// initialize animation loop
loop();

// re-run loop on window resize
window.onresize = function (event) {
  loop();
};

/*Toggle button text for file viewer*/
function showDIS() {
  var x = document.getElementById("dis-paper");
  var y = document.getElementById("dis-button");
  if (x.style.display === "none") {
    x.style.display = "block";
    y.innerHTML = "Hide Paper";
  } else {
    x.style.display = "none";
    y.innerHTML = "View Paper";
  }
}

/*Toggle button text for file viewer*/
function showCSCW() {
  var x = document.getElementById("cscw-paper");
  var y = document.getElementById("cscw-button");
  if (x.style.display === "none") {
    x.style.display = "block";
    y.innerHTML = "Hide Paper";
  } else {
    x.style.display = "none";
    y.innerHTML = "View Paper";
  }
}