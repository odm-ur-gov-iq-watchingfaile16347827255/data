$(window).bind('scroll', function() {
    $('.animateme').each(function(i) {
        var bottom_of_object = $(this).offset().top;
        var bottom_of_window = $(window).scrollTop() + $(window).height();
        if (bottom_of_window > bottom_of_object) {
            var dhrclass = $(this).attr("dhr-animation");
            var dhrdelay = $(this).attr("dhr-delay");
            $(this).removeClass('animated');
            $(this).addClass('animated ' + dhrclass);
            $(this).css('opacity', '1');
            $(this).css('animation-delay', dhrdelay);
        }
    });
});
$(document).ready(function() {
    $('.animatenow').each(function(i) {
        var bottom_of_object = $(this).offset().top;
        var bottom_of_window = $(window).scrollTop() + $(window).height();
        if (bottom_of_window > bottom_of_object) {
            var dhrclass = $(this).attr("dhr-animation");
            var dhrdelay = $(this).attr("dhr-delay");
            $(this).addClass('animated ' + dhrclass);
            $(this).css('opacity', '1');
            $(this).css('animation-delay', dhrdelay);
        }
    });
});
(function($) {
    function doAnimations(elems) {
        var animEndEv = 'webkitAnimationEnd animationend';
        elems.each(function() {
            var $this = $(this),
                $animationType = $this.data('animation');
            $this.addClass($animationType).one(animEndEv, function() {
               // $this.css('animation-delay', "0.7");
                $this.removeClass($animationType);
                $this.removeClass("animated");
                
            });
        });
    }
    var $mainCarousel = $('.owl-carousel');
    $mainCarousel.on('changed.owl.carousel', function(e) {
        var $currentItem = $('.owl-item', $mainCarousel).eq(e.item.index).find("[data-animation ^= 'animated']");
        doAnimations($currentItem);
   });
})(jQuery);
$(document).on("ready",function(){
    $('.owl-next').addClass('hvr-ripple-in');
    $('.owl-prev').addClass('hvr-ripple-in');
});
$(function(){
    if($('.pagination-btn').hasClass('pagination-disable'))
        $(".pagination-disable a"). removeAttr("href");
});
function check_inputs(){
    var status = true;
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    $('input,select,textarea').each(function() {
    if($(this).val()==""){
        $(this).css('border-bottom','1px solid #c13535');status = false;
    }else{
        if($(this).attr('type')=="email"){
            if(regex.test($(this).val())){
                $(this).css('border-bottom','1px solid #35c140');
            }else{
                $(this).css('border-bottom','1px solid #c13535');status = false;
            }
        }else{
            $(this).css('border-bottom','1px solid #35c140');
        }  
        }
    });
    return status;
}