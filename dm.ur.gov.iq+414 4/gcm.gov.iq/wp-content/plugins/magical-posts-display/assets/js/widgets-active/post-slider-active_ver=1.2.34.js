(function ($) {
	"use strict";
    
     $(window).on("elementor/frontend/init", function () {
        elementorFrontend.hooks.addAction("frontend/element_ready/mgposts_dslider.default", function (scope, $) {
       
            var vbpSlider = $(scope).find(".mgps-main");
            var mgsLoop = vbpSlider.data('loop');
            var mgsEffect = vbpSlider.data('effect');
            var mgsDirection = vbpSlider.data('direction');
            var mgsSpeed = vbpSlider.data('speed');
            var mgsAutoplay = vbpSlider.data('autoplay');
            var mgsAutoDelay = vbpSlider.data('auto-delay');
            var mgsGrabCursor = vbpSlider.data('grab-cursor');
            var mgsNav = vbpSlider.data('nav');
            var mgsDots = vbpSlider.data('dots');

            if(mgsAutoplay == true){
              var autoPlayData = {
                    delay: mgsAutoDelay,
                    disableOnInteraction: false,
                  };
            }else{
              var autoPlayData = false;
            }


            var mgsSwiper = new Swiper (vbpSlider, {
                  // Optional parameters
                  direction: mgsDirection, // vertical
                  loop: mgsLoop,
                  effect: mgsEffect, //"slide", "fade", "cube", "coverflow" or "flip"
                  speed: mgsSpeed,
                  autoplay: autoPlayData,
                 // autoHeight: true,
                 // mousewheel: true,
                  grabCursor: mgsGrabCursor,
                  parallax: true,
                  watchSlidesProgress: true,
                  watchSlidesVisibility: true,
                  pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                  },
                  navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                  },
                })

            /*mgTimeline.timeline({
              forceVerticalMode: 800,
              mode: 'horizontal',
              visibleItems: 4
            });*/        
            
        });
    })
   


}(jQuery));	


