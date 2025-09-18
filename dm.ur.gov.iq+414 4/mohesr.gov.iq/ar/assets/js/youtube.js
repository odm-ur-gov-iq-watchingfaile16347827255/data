// // // ///////////get the youtube video id /////////////
// // let vid_id = $('#yt_vid').text();
// // // 2. This code loads the IFrame Player API code asynchronously.
// // var tag = document.createElement('script');

// // tag.src = "https://www.youtube.com/iframe_api";
// // var firstScriptTag = document.getElementsByTagName('script')[0];
// // firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// // // 3. This function creates an <iframe> (and YouTube player)
// // //    after the API code downloads.
// // var player;
// // function onYouTubeIframeAPIReady() {
// //   player = new YT.Player('player', {
// //     videoId: vid_id,
// //     host: 'https://www.youtube.com',
// //     origin: 'https://mohesr.gov.iq/ar' ,
// //     playerVars: {  
// //       'playsinline': 1,
// //       'origin': window.location.href, enablejsapi:1,
// //     },
// //     events: {
// //       'onReady': onPlayerReady,
// //       'onStateChange': onPlayerStateChange
// //     }
// //   });
// // }

// // // 4. The API will call this function when the video player is ready.
// // function onPlayerReady(event) {
// //     // event.target.playVideo();
// //     // event.target.stopVideo();
    
// // }

// // // 5. The API calls this function when the player's state changes.
// // //    The function indicates that when playing a video (state=1),
// // //    the player should play for six seconds and then stop.
// // var done = false;
// // function onPlayerStateChange(event) {
// //     let status = player.getPlayerState();

// //     if((status == 2)){

// //         var embedCode = player.getIframe();
// //         var innerDoc = embedCode.contentDocument || embedCode.contentWindow.document;
// //         console.log(innerDoc.body);
// //     }
// // }
// // function stopVideo() {
// //   player.stopVideo();
// // }

// // function playVideo() {
// //     player.playVideo();
// //  }


// // // ////////////////////////////////////////// pop up /////////////////////////////////////////////////

// ? == Play video as popup
// const video = document.querySelector('.video');

// const playBtn = document.querySelector('.play-btn a');

// const videoContianer = document.querySelector('.video-container');

// const closeVbtn = document.querySelector('.close-vbtn');


// const showcaseVideo = document.querySelector('.showcase-video');

// const playIcon = document.querySelector('.outer-circle');



// let showPopup = false;
  

// if(playBtn){


// playBtn.addEventListener('click', (e) => {
//   e.preventDefault();
//   if(!showPopup) {
//     video.classList.add('show-popup');
//     showPopup = true;
//     showcaseVideo.setAttribute("controls","");
//     // showcaseVideo.play();
//     showcaseVideo.src +='&autoplay=1'; 
//     // bgVideo.pause();
    

//     carousel = new bootstrap.Carousel(myCarousel, {
//       interval: 50000,
//       pause: 'hover'
//     });
    
//   } else {
//     video.classList.remove('show-popup');
//     // showcaseVideo.pause();
//     showPopup = false;
//   }
// });


// }
// if(closeVbtn){
// closeVbtn.addEventListener('click', () => {
//   if(showPopup) {
//     video.classList.remove('show-popup');
//     showPopup = false;
//     // showcaseVideo.pause();
//     showcaseVideo.removeAttribute("controls","");
//     // bgVideo.play();
    
//     carousel = new bootstrap.Carousel(myCarousel, {
//       interval: 20000,
//       pause: 'hover'
//     });
//   }
// });
// }


// // // ? Popup Script
// const popupContainer = document.querySelector("#popup-container");

// const credits = document.querySelectorAll(".clickable-credit");
// const closeBtn = document.querySelector("#close-btn");
// const closeWindow = document.querySelector("#closeWindow");

// credits.forEach((credit) => {
//   credit.addEventListener("click", () => {
//     popupContainer.classList.add("open");
//   });
// });

// closeBtn.addEventListener("click", () => {
//   popupContainer.classList.remove("open");
// });

// closeWindow.addEventListener("click", () => {
//   popupContainer.classList.remove("open");
// });
