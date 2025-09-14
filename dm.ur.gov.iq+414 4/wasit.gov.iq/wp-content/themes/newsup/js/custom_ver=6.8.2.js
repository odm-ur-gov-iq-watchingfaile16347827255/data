(function($) {
  "use strict";
jQuery(window).on('load', function() {  
  // Enable Hover for Bootstrap Nav Dropdowns
  jQuery('.dropdown-toggle').keyup(function(e) {
    if (e.keyCode == 9) {
        $(this).dropdown('toggle');
    }
});
});
/* =================================
===        STICKY HEADER        ====
=================================== */
function homefeatured() {
  jQuery(".featuredcat").owlCarousel({
      autoPlay: 3000, //Set AutoPlay to 3 seconds
      pagination: false,
    items : 3,
    itemsDesktop : [1199,1],
    itemsDesktopSmall : [979,2],
    navigation : false,
    navigationText: [
            "<i class='fa fa-angle-left'></i>",
            "<i class='fa fa-angle-right'></i>"
        ]
  });
}
homefeatured();
function homemain() {
  jQuery(".homemain").owlCarousel({
    autoPlay: 3000, //Set AutoPlay to 3 seconds
    singleItem:true,
    pagination: false,
    navigation : true,
    navigationText: [
            "<i class='fa fa-angle-left'></i>",
            "<i class='fa fa-angle-right'></i>"
        ]
  });
}
homemain(); 

// post crousel
function postcrousel() {
  jQuery(".postcrousel").owlCarousel({
     autoPlay: 3000, //Set AutoPlay to 3 seconds
    items : 1,
    itemsDesktop : [1199,1],
    itemsDesktopSmall : [979,1],
    itemsTablet: [768, 1],
    pagination : false,
    navigation : true,
    navigationText: [
            "<i class='fa fa-angle-left'></i>",
            "<i class='fa fa-angle-right'></i>"
        ]
  });
}
postcrousel(); 

// colmnthree crousel
function colmnthree() {
  jQuery(".colmnthree").owlCarousel({
     autoPlay: 3000, //Set AutoPlay to 3 seconds
    items : 3,
    itemsDesktop : [1199,3],
    itemsDesktopSmall : [979,2],
    pagination : false,
    navigation : true,
    navigationText: [
            "<i class='fa fa-angle-left'></i>",
            "<i class='fa fa-angle-right'></i>"
        ]
  });
}
colmnthree();

// realatedpost
function realatedpost() {
  jQuery(".realatedpost").owlCarousel({
     autoPlay: 3000, //Set AutoPlay to 3 seconds
    items : 3,
    itemsDesktop : [1199,3],
    itemsDesktopSmall : [979,2],
    pagination : false,
    navigation : true,
    navigationText: [
            "<i class='fa fa-angle-left'></i>",
            "<i class='fa fa-angle-right'></i>"
        ]
  });
}
realatedpost(); 
// realatedpost

/* =================================
===         SCROLL TOP       ====
=================================== */
jQuery(".ta_upscr").hide(); 
function taupr() {
  jQuery(window).on('scroll', function() {
    if ($(this).scrollTop() > 500) {
        $('.ta_upscr').fadeIn();
    } else {
      $('.ta_upscr').fadeOut();
    }
  });   
  $('a.ta_upscr').on('click', function()  {
    $('body,html').animate({
      scrollTop: 0
    }, 800);
    return false;
  });
}    
taupr();
function marquee() {
  jQuery('.marquee').marquee({
  speed: 50,
  direction: 'left',
  delayBeforeStart: 0,
  duplicated: true,
  pauseOnHover: true,
  startVisible: true
  });
}
marquee();
})(jQuery);

function colmnthree() {
  jQuery(".colmnthree").owlCarousel({
      autoPlay: 3000, //Set AutoPlay to 3 seconds
      pagination: false,
    items : 1,
    itemsDesktop : [1199,1],
    itemsDesktopSmall : [979,1],
    navigation : false,
    navigationText: [
            "<i class='fa fa-angle-left'></i>",
            "<i class='fa fa-angle-right'></i>"
        ]
  });
}
colmnthree();


function addKeydownListener() {
  document.addEventListener('keydown', keydownHandler);
}
function removeKeydownListener() {
  document.removeEventListener('keydown', keydownHandler);
}
function keydownHandler(event) {
  if (event.key === 'Tab') {
    var focusedElement = document.activeElement;
    var parentElement = document.getElementById('navbar-wp');
    var ulParent = parentElement.querySelector("ul.nav.navbar-nav");
    var lastChild = ulParent.lastElementChild.firstElementChild;

    // Check if the focused element is the last child
    if (focusedElement === lastChild) {
      // Prevent the default tab behavior
      event.preventDefault();

      // Perform your actions here
      const returnFocus = document.querySelector('button.navbar-toggler');
      returnFocus.click();
      returnFocus.focus();
    }
  }
}
function checkWindowSize() {
  if (window.innerWidth < 992) {
    addKeydownListener();
  } else {
    removeKeydownListener();
  }
}

checkWindowSize();
window.addEventListener('resize', checkWindowSize);