// ? ======= Jquery functions ======-->
// ? social media scrollDown effect->
$(document).scroll(function() {
  var y = $(this).scrollTop();
  if (y > 500) {
    $('.sm_scroll_down').fadeIn();
  } else {
    $('.sm_scroll_down').fadeOut();
  }
});
// ? end of social media left scrollDown effect

// ? == scroll-hint
$(document).scroll(function () {
  if ($(this).scrollTop() > 0) {
    $(".scroll-hint").fadeOut();
  } else {
    $(".scroll-hint").fadeIn();
  }
});
// ? end of scroll-hint


// ! ==== Pure JavaScripts
// ? Menu effect
const menuBtn = document.querySelector('.menu-btn');
const menuUl = document.querySelector('.main-navbar');
let menuOpen = false;
menuBtn.addEventListener('click', () => {
  if(!menuOpen) {
    menuBtn.classList.add('open');
    menuUl.classList.add('open');
    menuOpen = true;
  
  } else {
    menuBtn.classList.remove('open');
    menuUl.classList.remove('open');
    menuOpen = false;
   
  }
});

// ? Expanding the sub-menus
// ? Option #1 looping through sub-menus
// let subMenuOpen = false;

// const expandables = document.querySelectorAll('.expandable');

// expandables.forEach(expandable => {
//   expandable.addEventListener('click', () => {
//     if(!subMenuOpen) {
//       expandable.classList.add('expand');
//       subMenuOpen = true;
    
//     } else {
//       expandable.classList.remove('expand');
//       subMenuOpen = false;
     
//     }
//   });
// });

// ? Option #2 listen for each single submnue (manually)
let subMenuOpen1 = false;
let subMenuOpen2 = false;
let subMenuOpen3 = false;
let subMenuOpen4 = false;

const expandable1 = document.querySelector('#expandable1');
const expandable2 = document.querySelector('#expandable2');
const expandable3 = document.querySelector('#expandable3');
// const expandable4 = document.querySelector('#expandable4');

// Event Listeners
//? #1 first sub-menu
expandable1.addEventListener('click', () => {
  // if subMenuOpen2 = fslse
  if(!subMenuOpen1) {
    expandable1.classList.add('expand');
    subMenuOpen1 = true;
  } else { 
    // if subMenuOpen1 = true
    expandable1.classList.remove('expand');
      subMenuOpen1 = false;
  }
});

//? #2 second sub-menu
expandable2.addEventListener('click', () => {
  // if subMenuOpen2 = fslse
  if(!subMenuOpen2) {
    expandable2.classList.add('expand');
    subMenuOpen2 = true;
  } else { 
    // if subMenuOpen2 = true
    expandable2.classList.remove('expand');
      subMenuOpen2 = false;
  }
});

//? #3 second sub-menu
// expandable3.addEventListener('click', () => {
//   // if subMenuOpen3 = fslse
//   if(!subMenuOpen3) {
//     expandable3.classList.add('expand');
//     subMenuOpen3 = true;
//   } else { 
//     // if subMenuOpen3 = true
//     expandable3.classList.remove('expand');
//       subMenuOpen3 = false;
//   }
// });


//? #4 second sub-menu
// expandable4.addEventListener('click', () => {
//   // if subMenuOpen4 = fslse
//   if(!subMenuOpen4) {
//     expandable4.classList.add('expand');
//     subMenuOpen4 = true;
//   } else { 
//     // if subMenuOpen4 = true
//     expandable4.classList.remove('expand');
//       subMenuOpen4 = false;
//   }
// });


// ? Desktop search notch
let searchOpen = false;
const desktopSearch = document.querySelector('.desktop-search');

const searchNotch = document.querySelector('.search-slide');

desktopSearch.addEventListener('click', () => {
  // console.log('click');
  // if searchOpen = false
  if(!searchOpen) {
    searchNotch.classList.add('open');
    searchOpen = true;
  } else { 
    // if searchOpen = true
    searchNotch.classList.remove('open');
      searchOpen = false;
  }
});

// ? Popup Script
// const popupContainer = document.querySelector("#popup-container");

// const credits = document.querySelectorAll(".clickable-credit");
// const closeBtn = document.querySelector("#close-btn");
// const closeWindow = document.querySelector("#closeWindow");

// if(popupContainer){

//   credits.forEach((credit) => {
//     credit.addEventListener("click", () => {
//       popupContainer.classList.add("open");
//     });
//   });
  
//   closeBtn.addEventListener("click", () => {
//     popupContainer.classList.remove("open");
//   });
  
//   closeWindow.addEventListener("click", () => {
//     popupContainer.classList.remove("open");
//   });
  
//   var myCarousel = document.querySelector('#mainMOHESRcarousel');
//   var carousel = new bootstrap.Carousel(myCarousel, {
//     interval: 20000,
//     pause: 'hover'
//   });
// }




// ? == Play video as popup (youtube video)
const video = document.querySelector('.video');

const playBtn = document.querySelector('.play-btn a');

const videoContianer = document.querySelector('.video-container');

const closeVbtn = document.querySelector('.close-vbtn');


const showcaseVideo = document.querySelector('#showcase-video');

const playIcon = document.querySelector('.outer-circle');

const bgVideo = document.querySelector('.background-video');

const mainMOHESRcarousel = document.querySelector('#mainMOHESRcarousel');

let showPopup = false;
if(video){
  playBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if(!showPopup) {
      video.classList.add('show-popup');
      showPopup = true;
      showcaseVideo.setAttribute("controls","");
      showcaseVideo.play();
      bgVideo.pause();
      
  
      // carousel = new bootstrap.Carousel(myCarousel, {
      //   interval: 50000,
      //   pause: 'hover'
      // });
      
    } else {
      video.classList.remove('show-popup');
      showcaseVideo.pause();
      showPopup = false;
    }
  });
  
  closeVbtn.addEventListener('click', () => {
    if(showPopup) {
      video.classList.remove('show-popup');
      showPopup = false;
      showcaseVideo.pause();
      showcaseVideo.removeAttribute("controls","");
      bgVideo.play();
     
      
      // carousel = new bootstrap.Carousel(myCarousel, {
      //   interval: 20000,
      //   pause: 'hover'
      // });
    }
  });
  
}









