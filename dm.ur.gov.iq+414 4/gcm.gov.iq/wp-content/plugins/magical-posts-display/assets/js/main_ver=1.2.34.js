(function ($) {
	"use strict";
    
    //document ready function
    jQuery(document).ready(function($){
/*-----
Bootstrap carousel active
----------------------*/ 
        /*var mobileSlider = $('.carousel');
        mobileSlider.carousel({
          interval: 8000,
        });

        $('.awesome-carousel .carousel-inner .item:first-child').addClass('active');*/
      
        $('.mgpd-sticker ul').show();

    });//End document ready function
// masonry active
		
			var container = document.querySelector('.mgpd-masonry');
		    //create empty var msnry
		    var msnry;
		    // initialize Masonry after all images have loaded
		 if ( $(container).length > 0 ){
		    imagesLoaded( container, function() {
		        msnry = new Masonry( container, {
		            itemSelector: '.mgpd-masonry-item'
		        });
		    });

		} 


}(jQuery));	


