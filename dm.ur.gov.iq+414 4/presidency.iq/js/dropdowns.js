(function ($) {
    $.fn.dropdowns = function (options) {



        var defaults = {
            toggleWidth: 769
        }



        var settings = $.extend({}, defaults, options);



        var ww = $(window).width();



        var addParents = function () {
            $(".nav li a").each(function () {
                if ($(this).next().length > 0) {
                    $(this).addClass("parent");
                }
            });
        }



        var adjustMenu = function () {
            if (ww < settings.toggleWidth) {
                $(".toggleMenu").css("display", "inline-block");
                if (!$(".toggleMenu").hasClass("active")) {
                    $(".nav").hide();
                } else {
                    $(".nav").show();
                }
                $(".nav li").off('mouseenter mouseleave');
                $(".nav li a.parent").off('click').on('click', function (e) {
                    // must be attached to anchor element to prevent bubbling
                    e.preventDefault();
                    $(this).parent("li").toggleClass("hover");
                });
            }
            else if (ww >= settings.toggleWidth) {
                $(".toggleMenu").css("display", "none");
                $(".nav").show();
                $(".nav li").removeClass("hover");
                $(".nav li a").off('click');
                $(".nav li").off('mouseenter mouseleave').on('mouseenter mouseleave', function () {
                    // must be attached to li so that mouseleave is not triggered when hover over submenu
                    $(this).toggleClass('hover');
                });
            }
        }



        return this.each(function () {
            $(".toggleMenu").on('click', function (e) {
                e.preventDefault();
                $(this).toggleClass("active");
                $(this).next(".nav").toggle();
            });
            adjustMenu();
            addParents();
            $(window).on('resize orientationchange', function () {
                ww = $(window).width();
                adjustMenu();
            });
        });



    }
})(jQuery);