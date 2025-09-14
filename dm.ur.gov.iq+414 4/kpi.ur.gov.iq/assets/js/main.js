jQuery(function ($) {
    'use strict';
    // Preloader
    $(window).ready(function() {
        $(".loader-content").fadeOut(1200);
    });

    // Sticky Nav1
    $(document).on("scroll", function() {
        if ($(document).scrollTop() > 150) {
            $(".main-nav").addClass("is-sticky ");
        } else {
            $(".main-nav").removeClass("is-sticky ");
        }
    });

    // Sticky Nav2
    $(document).on("scroll", function() {
        if ($(document).scrollTop() > 0) {
            $(".mobile-nav").addClass("is-sticky ");
        } else {
            $(".mobile-nav").removeClass("is-sticky ");
        }
    });

    // Mean Menu
    jQuery('.mean-menu').meanmenu({
        meanScreenWidth: "991"
    });

    // Wow  JS
    new WOW({
        offset: 100,
        mobile: true
    }).init();

    // Popup Video
    $('.popup-youtube').magnificPopup({
        disableOn: 320,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });

    // Gallery
    $('.image-pop').magnificPopup({
        type: 'image',
        removalDelay: 300,
        gallery: {
            enabled: true
        },
    });

    // Banner Image Slides
	$('.banner-image-slider').owlCarousel({
		loop: true,
		nav: true,
		dots: false,
		autoplayHoverPause: true,
		autoplay: true,
		autoplayTimeout: 2500,
		autoHeight: true,
		items: 1,
		animateOut: 'animate__animated animate__fadeOut',
        margin: 0,
        rtl: true,
        navText: [
            "<i class='flaticon-left-arrow'></i>", 
            "<i class='flaticon-next-1'></i>"
        ],
	});

    // Home Team Slider
    $('.home-team-slider').owlCarousel({
        loop: true,
        margin: 20,
        dots: true,
        autoplay: false,
        autoplayHoverPause: true,
        rtl: true,
        responsive: {
            0: {
                items: 1,
            },
            575: {
                items: 2,
            },
            576: {
                items: 2,
            },
            768: {
                items: 3,
            },
            992: {
                items: 3,
            },
            1200: {
                items: 4,
            }
        }
    });

    // Home Slider
    $(".home-slider").owlCarousel({
        animateOut: 'animate__animated animate__slideOutDown',
        animateIn: 'animate__animated animate__slideInDown',
        items: 1,
        loop: true,
        autoplay: false,
        dots: false,
        nav: true,
        autoHeight: true,
        autoplaySpeed: 800,
        mouseDrag: false,
        autoplayHoverPause: true,
        rtl: true,
        navText: [
            "<i class='flaticon-left-arrow'></i>", 
            "<i class='flaticon-next-1'></i>"
        ],
        responsive: {
            0: {
                items: 1,
            },
            576: {
                items: 1,
            },
            768: {
                items: 1,
            },
            1200: {
                items: 1,
            }
        }
    });

    // Client Wrap
	$('.client-wrap').owlCarousel({
		loop:true,
		margin:30,
		nav:false,
		mouseDrag: true,
		items:1,
		dots: false,
		autoHeight: true,
		autoplay: true,
		smartSpeed: 800,
		autoplayHoverPause: true,
		center: false,
        rtl: true,
		responsive:{
			0:{
				items:1,
				margin: 10,
			},
			576:{
				items:1,
			},
			768:{
				items:2,
				margin: 20,
			},
			992:{
				items:2,
			},
			1200:{
				items:2,
			}
		}
    });
    
    // Services Item Wrap
	$('.services-item-wrap').owlCarousel({
		loop: true,
		nav: false,
		dots: false,
		autoplayHoverPause: true,
		autoplay: true,
		autoplayTimeout: 2500,
		autoHeight: true,
		items: 1,
		margin: 0,
        rtl: true,
	});

    // Gallery
    $('.image-pop').magnificPopup({
        type: 'image',
        removalDelay: 300,
        gallery: {
            enabled: true
        },
    });

    // FAQ Accordion
    $('.accordion').find('.accordion-title').on('click', function() {
        $(this).toggleClass('active');
        $(this).next().slideToggle('fast');
        $('.accordion-content').not($(this).next()).slideUp('fast');
        $('.accordion-title').not($(this)).removeClass('active');
    });

    // Subscribe form
    $(".newsletter-form").validator().on("submit", function(event) {
        if (event.isDefaultPrevented()) {
            // handle the invalid form...
            formErrorSub();
            submitMSGSub(false, "Please enter your email correctly.");
        } else {
            // everything looks good!
            event.preventDefault();
        }
    });

    function callbackFunction(resp) {
        if (resp.result === "success") {
            formSuccessSub();
        } else {
            formErrorSub();
        }
    }

    function formSuccessSub() {
        $(".newsletter-form")[0].reset();
        submitMSGSub(true, "Thank you for subscribing!");
        setTimeout(function() {
            $("#validator-newsletter").addClass('hide');
        }, 4000)
    }

    function formErrorSub() {
        $(".newsletter-form").addClass("animate__animated animate__shake");
        setTimeout(function() {
            $(".newsletter-form").removeClass("animate__animated animate__shake");
        }, 1000)
    }

    function submitMSGSub(valid, msg) {
        if (valid) {
            var msgClasses = "validation-success";
        } else {
            var msgClasses = "validation-danger";
        }
        $("#validator-newsletter").removeClass().addClass(msgClasses).text(msg);
    }

    // AJAX MailChimp
    $(".newsletter-form").ajaxChimp({
        url: "https://envy Theme.us20.list-manage.com/subscribe/post?u=60e1ffe2e8a68ce1204cd39a5&amp;id=42d6d188d9", // Your url MailChimp
        callback: callbackFunction
    });

    // Go to Top
	// Scroll Event
	$(window).on('scroll', function(){
		var scrolled = $(window).scrollTop();
		if (scrolled > 300) $('.go-top').addClass('active');
		if (scrolled < 300) $('.go-top').removeClass('active');
	});  

	// Click Event
	$('.go-top').on('click', function() {
		$("html, body").animate({ scrollTop: "0" },  50);
    });
    
    // Tabs
    $('.tab ul.tabs').addClass('active').find('> li:eq(0)').addClass('current');
    $('.tab ul.tabs li a').on('click', function (g) {
        var tab = $(this).closest('.tab'), 
        index = $(this).closest('li').index();
        tab.find('ul.tabs > li').removeClass('current');
        $(this).closest('li').addClass('current');
        tab.find('.tab_content').find('div.tabs_item').not('div.tabs_item:eq(' + index + ')').slideUp();
        tab.find('.tab_content').find('div.tabs_item:eq(' + index + ')').slideDown();
        g.preventDefault();
    });

    // Isotope Filter
    $('.case-list').isotope({
        itemSelector: '.item'
    });
    $('.all-case li').click(function() {
        $('.all-case li').removeClass('active');
        $(this).addClass('active');
        var selector = $(this).attr('data-filter');
        $('.case-list').isotope({
            filter: selector
        });
        return false;
    });

    // Buy Now Btn

    // Switch Btn
	$('body').append("<div class='switch-box'><label id='switch' class='switch'><input type='checkbox' onchange='toggleTheme()' id='slider'><span class='slider round'></span></label></div>");

}(jQuery));

// function to set a given theme/color-scheme
function setTheme(themeName) {
    localStorage.setItem('paso_theme', themeName);
    document.documentElement.className = themeName;
}
// function to toggle between light and dark theme
function toggleTheme() {
    if (localStorage.getItem('paso_theme') === 'theme-dark') {
        setTheme('theme-light');
    } else {
        setTheme('theme-dark');
    }
}
// Immediately invoked function to set the theme on initial load
(function () {
    if (localStorage.getItem('paso_theme') === 'theme-dark') {
        setTheme('theme-dark');
        document.getElementById('slider').checked = false;
    } else {
        setTheme('theme-light');
    document.getElementById('slider').checked = true;
    }
})();