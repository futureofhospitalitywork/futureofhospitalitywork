// script.js
$(document).ready(function() {
  $('#mobile-menu').click(function() {
      // Toggle display property of #nav-bar
      if ($('.nav-bar').css('display') === 'none') {
          $('.nav-bar').css('display', 'flex');
      } else {
          $('.nav-bar').css('display', 'none');
      }

      // Toggle active class on menu icon
      $(this).toggleClass('active');
  });
});