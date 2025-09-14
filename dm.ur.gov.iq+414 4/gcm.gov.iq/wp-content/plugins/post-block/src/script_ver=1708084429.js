/**
 * Session Start From Here
 */
 var frhdPBW = 'frhd__post-block-wrapper';
 var noElementHasType2Class = ! document.getElementsByClassName(frhdPBW).length;
 if ( true !== noElementHasType2Class ) {
 
     var frhdHRelem = document.getElementsByClassName('frhd__post-block-wrapper')[0];
     var frhdHRval  = frhdHRelem.getAttribute('data-hr');
     if ( '"true"' === frhdHRelem.getAttribute('data-hr') ) {
 
         var elemHearts = document.getElementsByClassName("frhd__post-block-article");
         for (var i = 0; i < elemHearts.length; i++) {
 
             elemHearts[i].addEventListener('click', function() {
 
                 elemSVG = this.querySelector(".frhd__user-react").children[0];
                 if ( elemSVG.classList.contains("frhd__user-react-love") ) {
 
                     elemSVG.classList.remove("frhd__user-react-love");
                 } else {
 
                     elemSVG.classList.add("frhd__user-react-love");
                 }
             })
         }
     }
 }

/**
 * Love React Function.
 */
(function( $ ) {

	'use strict';

    var frhdDataHR = $('.frhd__post-block-wrapper').attr('data-hr');
    if ( '"true"' === frhdDataHR ) {

        function loadTakenSeats() {

            var takenSeatsString = sessionStorage.takenSeats;
            return takenSeatsString
                ? JSON.parse(takenSeatsString)
                : [];
        }

        function saveTakenSeats(takenSeats) {

            sessionStorage.takenSeats = JSON.stringify(takenSeats);
        }

        function takeSeat(seat) {

            var takenSeats = loadTakenSeats();
            takenSeats.push($(seat).attr('data-id'));
            saveTakenSeats(takenSeats);
        }

        function untakeSeat(seat) {

            var takenSeats = loadTakenSeats();
            takenSeats.pop($(seat).attr('data-id'));
            saveTakenSeats(takenSeats);
        }

        $(function() {

            // restore taken seats
            $.each(loadTakenSeats(), function(i, seat) {

                $('div[data-id="'+seat+'"] svg').addClass('frhd__user-react-love');
            });

            $('.frhd__user-react').on('click', function() {

                var seat = this;
                if (loadTakenSeats().indexOf($(seat).attr('data-id')) < 0) {

                    // not taken
                    takeSeat(seat);
                } else {

                    untakeSeat(seat);
                }
            });

        });
    }

    /**
     * The Slider Initialization.
     */
    $(document).ready(function() {

        $( ".frhd__post-slider-wrapper" ).each(function() {

            var frhdSliderID = $( this ).attr('id'),
                frhdIsCarousel = $( this ).attr('data-carouselMode') ? 3 : 1;

            var swiper = new Swiper("#" + frhdSliderID + " .frhd__post-slider", {

                slidesPerView: frhdIsCarousel,
                spaceBetween: 10,
                pagination: {
                    el: '#' + frhdSliderID + ' .swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '#' + frhdSliderID + ' .swiper-button-next',
                    prevEl: '#' + frhdSliderID + ' .swiper-button-prev',
                },
            });
        });

    });

})( jQuery );