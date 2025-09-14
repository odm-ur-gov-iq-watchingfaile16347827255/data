window.odometerOptions = {
  auto: true, // Don't automatically initialize everything with class 'odometer'
  selector: '.number.animated-element', // Change the selector used to automatically find things to be animated
  format: '( ddd).dd', // Change how digit groups are formatted, and how many digits are shown after the decimal point
  duration: 2000, // Change how long the javascript expects the CSS animation to take
  theme: 'default', // Specify the theme (if you have more than one theme css file on the page)
  animation: 'count' // Count is a simpler animation method which just increments the value,
                     // use it when you're looking for something more subtle.
};
if(!Date.prototype.toISOString) 
{
    Date.prototype.toISOString = function() 
	{
        function pad(n) {return n < 10 ? '0' + n : n}
        return this.getUTCFullYear() + '-'
            + pad(this.getUTCMonth() + 1) + '-'
                + pad(this.getUTCDate()) + 'T'
                    + pad(this.getUTCHours()) + ':'
                        + pad(this.getUTCMinutes()) + ':'
                            + pad(this.getUTCSeconds()) + 'Z';
    };
}
function getRandom(min,max)
{
	return((Math.floor(Math.random()*(max-min)))+min);
}
function onAfterSlide(obj)
{
	var currentSlide = obj.items.visible;
	var expando = jQuery(this).get(0)[jQuery.expando];
	jQuery("#slider-navigation-" + expando + " .slider-control").addClass("inactive");
	jQuery("#" + jQuery(currentSlide).attr("id") + "-content").fadeIn(200, function(){
		jQuery("#slider-navigation-" + expando + " .slider-control").removeClass("inactive");
	});	
}
function onBeforeSlide(obj)
{
	var prevSlide = obj.items.old;
	var currentSlide = obj.items.visible;
	var expando = jQuery(this).get(0)[jQuery.expando];
	var elementClasses = jQuery(this).attr('class').split(' ');
	var easing = "easeInOutQuint";
	var duration = 750;
	for(var i=0; i<elementClasses.length; i++)
	{
		if(elementClasses[i].indexOf('easing-')!=-1)
			easing = elementClasses[i].replace('easing-', '');
		if(elementClasses[i].indexOf('duration-')!=-1)
			duration = elementClasses[i].replace('duration-', '');
	}
	
	jQuery(".slider-" + expando + "-content-container .slider-content").fadeOut(200);
	jQuery("#slider-navigation-" + expando + " .slider-control-bar").css("display", "none");
	var navigationWidth = jQuery("#slider-navigation-" + expando).width() ;
	var currentNav = jQuery(jQuery("#" + jQuery(currentSlide).attr("id") + "-control"));
	var prevNav = jQuery(jQuery("#" + jQuery(prevSlide).attr("id") + "-control"));
	var currentMarginRight = navigationWidth - currentNav.position().left - currentNav.width();
	var prevMarginRight = navigationWidth - prevNav.position().left - prevNav.width();
	var margin_option_css, margin_option_animate;
	if(config.is_rtl==1) {
		margin_option_css = { 'margin-right' : prevMarginRight + "px" };
		margin_option_animate = { 'margin-right': currentMarginRight + "px" };
	} else {
		margin_option_css = { 'margin-left' : prevNav.position().left + "px" };
		margin_option_animate = { 'margin-left': currentNav.position().left + "px" };
	}
	
	jQuery("#slider-navigation-" + expando + " .slider-bar").css(jQuery.extend(margin_option_css,{"display": "block"}));
	jQuery("#slider-navigation-" + expando + " .slider-bar").animate(margin_option_animate,
		parseInt(duration), easing, function(){
			jQuery(this).css("display", "none");
			jQuery("#" + jQuery(currentSlide).attr("id") + "-control").children("#slider-navigation-" + expando + " .slider-control-bar").css("display", "block");
	});
}
function pushState(event)
{
	event.preventDefault();
	var History = window.History;
	var url = jQuery(this).attr("href");
	if(typeof(url)!="undefined")
	{
		var hashSplit = url.split("#");
		if(event.data.action=="theme_employees_pagination")
		{
			if(jQuery(this).parent().hasClass("selected"))
				return false;
			var container = jQuery(this).parent().parent().prev();
			container.attr("id", "theme_employees_pagination_" + container["context"][jQuery.expando]);
			event.data.container_id = container.attr("id");
			jQuery(this).parent().parent().children(".selected").removeClass("selected");
			jQuery(this).parent().addClass("selected");
		}
		else if(event.data.action=="theme_gallery_pagination")
		{
			if(jQuery(this).parent().hasClass("selected"))
				return false;
			var container = jQuery(this).parent().parent().prev();
			container.attr("id", "theme_gallery_pagination_" + container["context"][jQuery.expando]);
			event.data.container_id = container.attr("id");
			jQuery(this).parent().parent().children(".selected").removeClass("selected");
			jQuery(this).parent().addClass("selected");
		}
		if(hashSplit.length==2)
		{
			event.data.hash = hashSplit[1];
			url = url.replace("#" + hashSplit[1], "");
		}
		var title = "";
		if(history.pushState)
			History.pushState(event.data, title, url);
		else
			History.pushState(event.data, title, url);
	}
};
var menu_position = null;
var dragging = false;
jQuery(document).ready(function($){
	//mobile devices touchend fix
	$("body").on("touchmove", function(){
		  dragging = true;
	});
	$("body").on("touchstart", function(){
		dragging = false;
	});
	//home slider
	$(".rev_slider, rs-module").each(function(){
		var self = $(this);
		if(self.parent().parent().hasClass("mc-navigation"))
		{
			self.on("revolution.slide.onloaded", function(e){
				var sliderLength = self.revmaxslide();
				var parentUl = $(this).find("ul, rs-slides").first();
				if(parentUl.children().length>1)
				{
					var expando = $(this).get(0)[jQuery.expando];
					var sliderControl = $("<ul class='slider-navigation' id='slider-navigation-" + expando + "'>");
					sliderControl.append("<li class='slider-bar' style='width:" + (100/sliderLength) + "%;'></li>");
					parentUl.children().each(function(index){
						$(this).attr("id", "slide-" + expando + "-" + index);
						sliderControl.append($("<li class='slider-control' style='width:" + (100/sliderLength) + "%;'><a id='" + $(this).attr("id") + "-control' href='#' title='" + (index+1) + "'><span class='top-border'></span><span class='slider-control-bar'></span>" + (index+1) + "</a></li>"));
					});
					//var home_slider_widgets = $(this).parent().parent().parent().next(".for-home-slider");
					var home_slider_widgets = $(this).closest(".vc_row").next(".vc_row").children().children().children(".for-home-slider").first();
					//var home_slider_widgets = $(".for-home-slider");
					if(home_slider_widgets.length)
						home_slider_widgets.prepend(sliderControl);
					else
						$(this).closest(".wpb_wrapper").after(sliderControl);
					
					$("#slider-navigation-" + expando + " .slider-control a").on("click", function(event){
						event.preventDefault();
						var self2 = $(this).parent();
						self.revshowslide($("#slider-navigation-" + expando + " .slider-control").index(self2)+1);
					});
				}
			});
			self.on("revolution.slide.onbeforeswap", function(e, data){
				var prevSlide = data.currentslide;
				var currentSlide = data.nextslide;
				var expando = $(this).get(0)[jQuery.expando];
				var easing = "easeInOutCubic";
				var duration = 750;
				jQuery(".slider-" + expando + "-content-container .slider-content").fadeOut(200);
				jQuery("#slider-navigation-" + expando + " .slider-control-bar").css("display", "none");
				var navigationWidth = jQuery("#slider-navigation-" + expando).width() ;
				var currentNav = jQuery(jQuery("#" + jQuery(currentSlide).attr("id") + "-control"));
				var prevNav = jQuery(jQuery("#" + jQuery(prevSlide).attr("id") + "-control"));
				if(typeof(prevNav.position())!="undefined" && typeof(currentNav.position())!="undefined")
				{
					var currentMarginRight = navigationWidth - currentNav.position().left - currentNav.width();
					var prevMarginRight = navigationWidth - prevNav.position().left - prevNav.width();
					var margin_option_css, margin_option_animate;
					if(config.is_rtl==1) 
					{
						margin_option_css = { 'margin-right' : prevMarginRight + "px" };
						margin_option_animate = { 'margin-right': currentMarginRight + "px" };
					} 
					else 
					{
						margin_option_css = { 'margin-left' : prevNav.position().left + "px" };
						margin_option_animate = { 'margin-left': currentNav.position().left + "px" };
					}
					jQuery("#slider-navigation-" + expando + " .slider-bar").css(jQuery.extend(margin_option_css,{"display": "block"}));
					jQuery("#slider-navigation-" + expando + " .slider-bar").animate(margin_option_animate,
						parseInt(duration), easing, function(){
							jQuery(this).css("display", "none");
							jQuery("#" + jQuery(currentSlide).attr("id") + "-control").children("#slider-navigation-" + expando + " .slider-control-bar").css("display", "block");
					});
				}
			});
		}
	});
	//mobile menu
	$(".mobile-menu-switch").on("click", function(event){
		event.preventDefault();
		if(!$(".mobile-menu-container nav.mobile-menu").is(":animated"))
		{
			$(this).toggleClass("mm-opened");
			if(!$(".mobile-menu").is(":visible"))
				$(".mobile-menu-divider").css("display", "block");
			$(".mobile-menu-container nav.mobile-menu").slideToggle(200, function(){
				if(!$(".mobile-menu-container nav.mobile-menu").is(":visible"))
					$(".mobile-menu-divider").css("display", "none");
			});
		}
	});
	$(".collapsible-mobile-submenus .template-arrow-menu").on("click", function(event){
		event.preventDefault();
		$(this).next().slideToggle(300);
		$(this).toggleClass("template-arrow-expanded");
	});
	
	//slider
	$(".slider:not('.ui-slider,.form_field')").each(function(index){
		var autoplay = 0;
		var pause_on_hover = 0;
		var interval = 5000;
		var effect = "scroll";
		var easing = "easeInOutQuint";
		var duration = 750;
		var elementClasses = $(this).attr('class').split(' ');
		for(var i=0; i<elementClasses.length; i++)
		{
			if(elementClasses[i].indexOf('autoplay-')!=-1)
				autoplay = elementClasses[i].replace('autoplay-', '');
			if(elementClasses[i].indexOf('pause_on_hover-')!=-1)
				pause_on_hover = elementClasses[i].replace('pause_on_hover-', '');
			if(elementClasses[i].indexOf('interval-')!=-1)
				interval = elementClasses[i].replace('interval-', '');
			if(elementClasses[i].indexOf('effect-')!=-1)
				effect = elementClasses[i].replace('effect-', '');
			if(elementClasses[i].indexOf('easing-')!=-1)
				easing = elementClasses[i].replace('easing-', '');
			if(elementClasses[i].indexOf('duration-')!=-1)
				duration = elementClasses[i].replace('duration-', '');
			/*if(elementClasses[i].indexOf('threshold-')!=-1)
				var threshold = elementClasses[i].replace('threshold-', '');*/
		}
		var carouselOptions = {
			responsive: true,
			prev: {
				onAfter: onAfterSlide,
				onBefore: onBeforeSlide,
				fx: effect,
				easing: easing,
				duration: parseInt(duration)
			},
			next: {
				onAfter: onAfterSlide,
				onBefore: onBeforeSlide,
				fx: effect,
				easing: easing,
				duration: parseInt(duration)
			},
			auto: {
				onAfter: onAfterSlide,
				onBefore: onBeforeSlide,
				play: (parseInt(autoplay) ? true : false),
				pauseDuration: parseInt(interval),
				fx: effect,
				easing: easing,
				duration: parseInt(duration),
				pauseOnHover: (parseInt(pause_on_hover) ? true : false)
			}
		};
		$(this).carouFredSel(carouselOptions,
		{
			wrapper: {
				classname: "caroufredsel_wrapper caroufredsel_wrapper_slider"
			}
		});
		if($(this).children().length>1) {
			$(this).sliderControl({
				appendTo: $(".slider-content-box"),
				contentContainer: $(".slider-content-box")
			});
		}
	});
	/*$(".slider").carouFredSel({
		responsive: true,
		prev: {
			onAfter: onAfterSlide,
			onBefore: onBeforeSlide,
			easing: "easeInOutQuint",
			duration: 750
		},
		next: {
			onAfter: onAfterSlide,
			onBefore: onBeforeSlide,
			easing: "easeInOutQuint",
			duration: 750
		},
		auto: {
			play: true,
			pauseDuration: 5000,
			onAfter: onAfterSlide,
			onBefore: onBeforeSlide,
			easing: "easeInOutQuint",
			duration: 750
		}
	},
	{
		wrapper: {
			classname: "caroufredsel_wrapper caroufredsel_wrapper_slider"
		}
	});*/
	
	//parallax
	if(!navigator.userAgent.match(/(iPod|iPhone|iPad|Android)/))
	{
		$(".moving-parallax").each(function(){
			$(this).parallax({
				speed: -50
			});
		});
	}
	else
		$(".mc-parallax").addClass("attachment-scroll");
	
	//image carousel with preloader
	var imageCarousel = function()
	{
		$(".image-carousel").each(function(index){
			$(this).addClass("mc-preloader_" + index);			
			$(".mc-preloader_" + index + " img:first").one("load", function(){
				$(this).prev(".mc-preloader").remove();
				$(this).fadeIn();
				//caroufred
				var autoplay = 0;			
				var pause_on_hover = 0;
				var scroll = 1;
				var effect = "scroll";
				var easing = "easeInOutQuint";
				var duration = 750;
				var elementClasses = $(".mc-preloader_" + index).attr('class').split(' ');
				for(var i=0; i<elementClasses.length; i++)
				{
					if(elementClasses[i].indexOf('autoplay-')!=-1)
						autoplay = elementClasses[i].replace('autoplay-', '');
					if(elementClasses[i].indexOf('pause_on_hover-')!=-1)
						pause_on_hover = elementClasses[i].replace('pause_on_hover-', '');
					if(elementClasses[i].indexOf('scroll-')!=-1)
						scroll = elementClasses[i].replace('scroll-', '');
					if(elementClasses[i].indexOf('effect-')!=-1)
						effect = elementClasses[i].replace('effect-', '');
					if(elementClasses[i].indexOf('easing-')!=-1)
						easing = elementClasses[i].replace('easing-', '');
					if(elementClasses[i].indexOf('duration-')!=-1)
						duration = elementClasses[i].replace('duration-', '');
					/*if(elementClasses[i].indexOf('threshold-')!=-1)
						var threshold = elementClasses[i].replace('threshold-', '');*/
				}
				var carouselOptions = {
					responsive: true,
					prev: {
						onAfter: onAfterSlide,
						onBefore: onBeforeSlide,
						items: parseInt(scroll),
						fx: effect,
						easing: easing,
						duration: parseInt(duration)
					},
					next: {
						onAfter: onAfterSlide,
						onBefore: onBeforeSlide,
						items: parseInt(scroll),
						fx: effect,
						easing: easing,
						duration: parseInt(duration)
					},
					auto: {
						onAfter: onAfterSlide,
						onBefore: onBeforeSlide,
						items: parseInt(scroll),
						play: (parseInt(autoplay) ? true : false),
						fx: effect,
						easing: easing,
						duration: parseInt(duration),
						pauseOnHover: (parseInt(pause_on_hover) ? true : false)
					}
				};
				$(".mc-preloader_" + index).carouFredSel(carouselOptions);
				/*$(".mc-preloader_" + index).carouFredSel({
					responsive: true,
					prev: {

						easing: "easeInOutQuint",
						duration: 750
					},
					next: {

						easing: "easeInOutQuint",
						duration: 750
					},
					auto: {
						play: false,



						easing: "easeInOutQuint",
						duration: 750
					}
				});*/
				if($(".mc-preloader_" + index).children().length>1)
				{
					$(".mc-preloader_" + index).sliderControl({
						appendTo: "",
						contentContainer: ""
					});
				}
				$(".mc-preloader_" + index + " li img").css("display", "block");
				//$(".mc-preloader_" + index).trigger('configuration', ['debug', false, true]); //for width
				$(".mc-preloader_" + index).trigger('configuration', ['debug', false, true]); //for width
				$(window).trigger("resize");
				$(".mc-preloader_" + index).trigger('configuration', ['debug', false, true]); //for height
			}).each(function(){
				if(this.complete) 
					$(this).load();
			});
		});
	};
	imageCarousel();
	
	//preloader
	var preloader = function()
	{
		$(".post-content a.post-image img, .mc-preload").each(function(){			
			$(this).one("load", function(){
				$(this).prev(".mc-preloader").remove();
				$(this).fadeIn();
				$(this).css("display", "block");
			}).each(function(){
				if(this.complete) 
					$(this).load();
			});
		});
	};
	preloader();
	
	
	/*$("ul.gallery-item-details-list").css({
		"height": 0,
		"display": "none"
	});
	$(".gallery-item-details-list li.gallery-item-details").css("display", "none");*/
	
	//horizontal carousel
	$(".horizontal-carousel").each(function(){
		var self = $(this);
		var elementClasses = self.attr('class').split(' ');
		var count = self.children().length;
		for(var i=0; i<elementClasses.length; i++)
		{
			if(elementClasses[i].indexOf('id-')!=-1)
				var id = elementClasses[i].replace('id-', '');
			if(elementClasses[i].indexOf('autoplay-')!=-1)
				var autoplay = elementClasses[i].replace('autoplay-', '');
			if(elementClasses[i].indexOf('pause_on_hover-')!=-1)
				var pause_on_hover = elementClasses[i].replace('pause_on_hover-', '');
			if(elementClasses[i].indexOf('scroll-')!=-1)
				var scroll = elementClasses[i].replace('scroll-', '');
			if(elementClasses[i].indexOf('effect-')!=-1)
				var effect = elementClasses[i].replace('effect-', '');
			if(elementClasses[i].indexOf('easing-')!=-1)
				var easing = elementClasses[i].replace('easing-', '');
			if(elementClasses[i].indexOf('duration-')!=-1)
				var duration = elementClasses[i].replace('duration-', '');
			/*if(elementClasses[i].indexOf('threshold-')!=-1)
				var threshold = elementClasses[i].replace('threshold-', '');*/
		}

		var carouselOptions = {
			direction: (config.is_rtl==1 ? "right" : "left"),
			items: {
				start: (config.is_rtl==1 ? count-($(".header").width()>750 ? (self.hasClass("testimonials") ? 2 : 4) : ($(".header").width()>462 ? (self.hasClass("testimonials") ? 2 : 3) : ($(".header").width()>300 ? (self.hasClass("testimonials") ? 1 : 2) : 1))) : 0),
				visible: ($(".header").width()>750 ? (self.hasClass("testimonials") ? 2 : (self.hasClass("gallery-3-columns") ? 3 : (self.hasClass("gallery-2-columns") ? 2: 4))) : ($(".header").width()>462 ? (self.hasClass("testimonials") || self.hasClass("gallery-2-columns") ? 2 : 3) : ($(".header").width()>300 ? (self.hasClass("testimonials") ? 1 : 2) : 1)))
			},
			prev: {
				items: parseInt(scroll),
				button: $('#' + id + '_prev'),
				fx: effect,
				easing: easing,
				duration: parseInt(duration)
			},
			next: {
				items: parseInt(scroll),
				button: $('#' + id + '_next'),
				fx: effect,
				easing: easing,
				duration: parseInt(duration)
			},
			auto: {
				items: parseInt(scroll),
				play: (parseInt(autoplay) ? true : false),
				fx: effect,
				easing: easing,
				duration: parseInt(duration),
				pauseOnHover: (parseInt(pause_on_hover) ? true : false)
			}
		};
		/*if(self.hasClass('ontouch') || self.hasClass('onmouse'))
			carouselOptions.swipe = {
				items: parseInt(scroll),
				onTouch: (self.hasClass('ontouch') ? true : false),
				onMouse: (self.hasClass('onmouse') ? true : false),
				options: {
					allowPageScroll: "none",
					threshold: parseInt(threshold)
				},
				fx: effect,
				easing: easing,
				duration: parseInt(duration)
			};*/
		self.carouFredSel(carouselOptions, {wrapper: {classname: "caroufredsel_wrapper" + (self.hasClass("testimonials-full-width") ? " caroufredsel-wrapper-testimonials" : "")}});
	});
	//testimonials
	setTimeout(function(){
		$(".testimonials").trigger("configuration", {
			items: {
				visible: 2
			}
		});
	}, 1000);
	if($(".rev_slider_wrapper").length || $(".ls-wp-container").length)
	{
		var timer = 0;
		if($(".rev_slider_wrapper").length)
			timer = 100;
		if($(".ls-wp-container").length)
			timer = 1000;
		var posInterval = setTimeout(function(){
			$(".home_box_container_list").css("position", "static");
			setTimeout(function(){
				$(".home_box_container_list").css("position", "relative");
			}, 100);
		}, timer);
	}
	//counters
	var counters = function()
	{
		$(".counters-group").each(function(){
			var topValue = 0, currentValue = 0;
			var counterBoxes = $(this).find(".counter-box")
			counterBoxes.each(function(index){
				var self = $(this);
				if(self.find("[data-value]").length)
				{
					currentValue = parseInt(self.find("[data-value]").data("value").toString().replace(" ",""), 10);
					if(currentValue>topValue)
						topValue = currentValue;
				}
			});
			counterBoxes.each(function(index){
				var self = $(this);
				currentValue = parseInt(self.find("[data-value]").data("value").toString().replace(" ",""), 10);
				self.find(".counter-box-path").data("dashoffset", 415-(currentValue/topValue*415));
			});
		});
		$(".single-counter-box").each(function(){
			var value = $(this).find("[data-value]");
			if(value.length)
				$(this).find(".ornament-container").css("width", "calc(" + value.data("value").toString().replace(" ","") + "%" + " - 10px)");
		});
	}
	counters();
	$(".vc_label_units").each(function(){
		$(this).insertAfter($(this).parent().next());
	});
	
	//accordion
	$(".accordion").each(function(){
		var active_tab = !isNaN(jQuery(this).data('active-tab')) && parseInt(jQuery(this).data('active-tab')) >  0 ? parseInt(jQuery(this).data('active-tab'))-1 : false,
		collapsible =  (active_tab===false ? true : false);
		$(this).accordion({
			event: 'change',
			heightStyle: 'content',
			icons: false,
			active: active_tab,
			collapsible: collapsible,
			create: function(event, ui){
				$(window).trigger('resize');
				$(".image-carousel").trigger('configuration', ['debug', false, true]);
			}
		});
		/*if(!$(this).hasClass("accordion-active"))
		{
			$(this).accordion("option", "collapsible", true);
			$(this).accordion("option", "active", false);
		}*/
	});
	$(".accordion.scroll").on("accordionactivate", function(event, ui){
		if(typeof($("#"+$(ui.newHeader).attr("id")).offset())!="undefined")
		{
			var offsetFix = ($(".header-container.sticky").height()!=null ? $(".header-container.sticky").height()+10 : 10);
			$("html, body").animate({scrollTop: $("#"+$(ui.newHeader).attr("id")).offset().top-offsetFix}, 400);
		}
	});
	$(".tabs.scroll").on("tabsbeforeactivate", function(event, ui){
		var offsetFix = ($(".header-container.sticky").height()!=null ? $(".header-container.sticky").height()+10 : 10);
		$("html, body").animate({scrollTop: $("#"+$(ui.newTab).children("a").attr("id")).offset().top-offsetFix}, 400);
	});
	$(".tabs").on("tabsactivate", function(event, ui){
		ui.newPanel.find(".image-carousel").trigger('configuration', ['debug', false, true]);
		ui.newPanel.find(".image-carousel").trigger('configuration', ['debug', false, true]);
		$(window).trigger("resize");
	});
	$(".vc_tta-tab").on("click", function(event){
		setTimeout(function(){
			$(window).trigger("resize");
		}, 1);
	});
	$('.vc_tta-tab a, .vc_tta-panel .vc_tta-panel-title a').on('click', function(event){
        setTimeout(function(){
                $(window).trigger('resize');
            },
            1
        );
    });
	$(".tabs").each(function(){
		var self = $(this);
		self.tabs({
			event: 'change',
			show: (self.hasClass("type-big") ? false : true),
			create: function(){
				$("html, body").scrollTop(0);
				if(self.hasClass("type-big"))
				{
					var tabsElements = self.children(":first").children();
					var tabsCount = tabsElements.length;
					tabsElements.each(function(){
						$(this).css("width", (100/tabsCount) + "%");
					});
				}
			}
		});
	});
	
	//image controls
	var imageControls = function()
	{
		var currentControls;
		$(".gallery-box:not(.hover-icons-off)").hover(function(){
			var width = $(this).find("img").first().width();
			var height = $(this).find("img").first().height();
			currentControls = $(this).find(".controls");
			if(typeof(currentControls)!="undefined")
			{
				var currentControlsWidth = currentControls.outerWidth();
				var currentControlsHeight = currentControls.outerHeight();
				currentControls.stop();
				if(config.is_rtl==1) {
					margin_option = {"margin-right": (width/2-currentControlsWidth/2) + "px"};
				} else {
					margin_option = {"margin-left": (width/2-currentControlsWidth/2) + "px"};
				}
				currentControls.css(jQuery.extend(margin_option,{"display": "block","top": (height) + "px"}));
				currentControls.animate({"top": (height/2-currentControlsHeight/2) + "px"},250,'easeInOutCubic');
			}
		},function(){
			if(typeof(currentControls)!="undefined")
			{
				currentControls.stop();
				currentControls.css("display", "block");
				var height = $(this).find("img").first().height();
				currentControls.animate({"top": (height) + "px"},250,'easeInOutCubic', function(){
					$(this).css("display","none");
				});
			}
		});
		
		$(".gallery-box.hover-icons-off").on("click touchend", function(event){
			if(dragging)
				return;
			var target = $(event.target);
			if(target.is("[class*='social']"))
				return;
			var navigation = $(this).find('.slider-navigation a');
			var details = $(this).find('.open-details');
			var secondary;
			if($(this).find('.image-carousel').length>0) {
				secondary = $(this).find('.image-carousel>li:first-child .open-lightbox,.image-carousel>li:first-child .open-video-lightbox,.image-carousel>li:first-child .open-iframe-lightbox,.image-carousel>li:first-child .open-url-lightbox');
			} else {
				secondary = $(this).find('.open-lightbox,.open-video-lightbox,.open-iframe-lightbox,.open-url-lightbox');
			}
			
			if( !target.is(details) &&
				!target.is(secondary) &&
				!target.is(navigation) )
			{
				if(details.attr('href')!==undefined) {					
					details[0].click();
				} else if(secondary.attr('href')!==undefined) {
					secondary[0].click();
				}
			}
		});
	};
	imageControls();
	
	//browser history
	$(".tabs .ui-tabs-nav a").on("click", function(){
		if($(this).attr("href").substr(0,4)!="http")
			$.bbq.pushState($(this).attr("href"));
		else
			window.location.href = $(this).attr("href");
	});
	$(".ui-accordion .ui-accordion-header").on("click", function(){
		$.bbq.pushState("#" + $(this).attr("id").replace("accordion-", ""));
	});
	
	//tabs box navigation
	$(".tabs-box-navigation").mouseover(function(){
		$(this).find("ul").removeClass("tabs-box-navigation-hidden");
	});
	$(".tabs-box-navigation a").on("click", function(){
		$(".tabs-box-navigation-selected .selected").removeClass("selected");
		$(this).parent().addClass("selected");
		$(this).parent().parent().parent().children('span').text($(this).text());
		$(this).parent().parent().addClass("tabs-box-navigation-hidden");
	});
	$(".contact-form .tabs-box-navigation a").on("click", function(event){
		event.preventDefault();
		$(this).parent().parent().parent().children("[type='hidden']").first().val($.trim($(this).text()));
	});
	
	//comments number scroll
	$(".single .comments-number").on("click", function(event){
		event.preventDefault();
		var offset = $("#comments_list").offset();
		if(typeof(offset)!="undefined")
		{
			var offsetFix = ($(".header-container.sticky").height()!=null ? $(".header-container.sticky").height()+10 : 10);
			$("html, body").animate({scrollTop: offset.top-offsetFix}, 400);
		}
	});
	
	//reply button scroll
	$(".post-content .reply-button").on("click", function(event){
		event.preventDefault();
		var offset = $("#comment_form").offset();
		var offsetFix = ($(".header-container.sticky").height()!=null ? $(".header-container.sticky").height()+10 : 10);
		$("html, body").animate({scrollTop: offset.top-offsetFix}, 400);
	});
	
	//hashchange
	$(window).on("hashchange", function(event){
		var hashSplit = $.param.fragment().split("-");
		var hashString = "";
		for(var i=0; i<hashSplit.length-1; i++)
			hashString = hashString + hashSplit[i] + (i+1<hashSplit.length-1 ? "-" : "");
		if(hashSplit[0].substr(0,7)!="filter" && hashSplit[0].substr(0,4)!="page")
		{
			$('.ui-accordion .ui-accordion-header#accordion-' + decodeURIComponent($.param.fragment())).trigger("change");
			$(".tabs-box-navigation a[href='#" + decodeURIComponent($.param.fragment()) + "']").trigger("click");
			$('.ui-accordion .ui-accordion-header#accordion-' + decodeURIComponent(hashString)).trigger("change");
		}
		$('.tabs .ui-tabs-nav [href="#' + decodeURIComponent(hashString) + '"]').trigger("change");
		$('.tabs .ui-tabs-nav [href="#' + decodeURIComponent($.param.fragment()) + '"]').trigger("change");
		if(hashSplit[0].substr(0,7)!="filter")
			$('.tabs .ui-accordion .ui-accordion-header#accordion-' + decodeURIComponent($.param.fragment())).trigger("change");
		$(".isotope.mc-gallery:not('.horizontal-carousel, .no-isotope')").isotope('layout');
		$(".testimonials, .scrolling-list").trigger('configuration', ['debug', false, true]);
		
		/*var maxHeight = Math.max.apply(null, $(".timetable:visible tr td:first-child").map(function ()
		{
			return $(this).height();
		}).get());
		$(".timetable:visible tr td").css("height", maxHeight);*/
		//timetable height fix
		/*$(".timetable .event").each(function(){
			if($(this).children(".event_container").length>1)
			{
				var childrenHeight = 0;
				$(this).children(".event_container").not(":last").each(function(){
					childrenHeight += $(this).innerHeight();
				});
				var height = $(this).height()-childrenHeight-($(this).parent().parent().width()<=750 ? 9 : 22);
				if(height>$(this).children(".event_container").last().height())
					$(this).children(".event_container").last().css("height", height + "px");
			}
		});*/
		
		// get options object from hash
		var hashOptions = $.deparam.fragment();
		if(hashSplit[0].substr(0,7)=="filter")
		{
			var filterClass = decodeURIComponent($.param.fragment()).substr(7, decodeURIComponent($.param.fragment()).length);
			// apply options from hash
			$(".isotope-filters a").removeClass("selected");
			if($('.isotope-filters a[href="#filter-' + filterClass + '"]').length)
				$('.isotope-filters a[href="#filter-' + filterClass + '"]').addClass("selected");
			else
				$(".isotope-filters li:first a").addClass("selected");
			
			$(".mc-gallery:not('.horizontal-carousel, .no-isotope')").isotope({filter: (filterClass!="*" ? "." : "") + filterClass, originLeft: (config.is_rtl===1 ? false : true)});
			//$(".timetable_isotope").isotope(hashOptions);
		}
		
		if(hashSplit[0].substr(0,7)=="comment")
		{
			if($(location.hash).length)
			{
				var offset = $(location.hash).offset();
				var offsetFix = ($(".header-container.sticky").height()!=null ? $(".header-container.sticky").height()+10 : 10);
				$("html, body").animate({scrollTop: offset.top-offsetFix}, 400);
			}
		}
		
		if(hashSplit[0]=="comments")
		{
			$(".single .comments-number").trigger("click");
		}
		if(hashSplit[0]=="respond")
		{
			$(".post-content .reply-button").trigger("click");
		}
		if(hashSplit[0].substr(0,4)=="page")
		{
			if(parseInt($("#comment_form [name='prevent_scroll']").val())==1)
			{
				$("#comment_form [name='prevent_scroll']").val(0);
				$("#comment_form [name='paged']").val(parseInt(location.hash.substr(6)));
			}
			else
			{
				$.ajax({
					url: config.ajaxurl,
					data: "action=theme_get_comments&post_id=" + $("#comment_form [name='post_id']").val() + "&post_type=" + $("#comment_form [name='post_type']").val() + "&paged="+parseInt(location.hash.substr(6)),
					type: "get",
					dataType: "json",
					success: function(json){
						if(typeof(json.html)!="undefined")
							$(".comments").html(json.html);
						var hashSplit = location.hash.split("/");
						var offset = null;
						if(hashSplit.length==2 && hashSplit[1]!="")
							offset = $("#" + hashSplit[1]).offset();
						else
							offset = $(".comments").offset();
						if(offset!=null)
						{
							var offsetFix = ($(".header-container.sticky").height()!=null ? $(".header-container.sticky").height()+10 : 10);
							$("html, body").animate({scrollTop: offset.top-offsetFix}, 400);
						}
						$("#comment_form [name='paged']").val(parseInt(location.hash.substr(6)));
					}
				});
				return;
			}
		}
		
		//open gallery details
		if(location.hash.substr(1,21)=="gallery-details-close" || hashSplit[0].substr(0,7)=="filter")
		{
			$(".gallery-item-details-list").animate({height:'0'},{duration:200,easing:'easeOutQuint', complete:function(){
				$(this).css("display", "none")
				$(".gallery-item-details-list .gallery-item-details").css("display", "none");
			}
			});
		}
		else if(location.hash.substr(1,15)=="gallery-details")
		{
			var detailsBlock = $('[id="' + location.hash.substr(1) + '"]');
			//var detailsBlock = $(location.hash);
			$(".gallery-item-details-list .gallery-item-details").css("display", "none");
			detailsBlock.css("display", "block");
			var galleryItem = $('[id="gallery-item-' + location.hash.substr(17) + '"]');
			//var galleryItem = $("#gallery-item-" + location.hash.substr(17));
			//detailsBlock.find(".prev").attr("href", (galleryItem.prevAll(":not('.isotope-hidden')").first().length ? galleryItem.prevAll(":not('.isotope-hidden')").first().find(".open-details").attr("href") : $(".mc_gallery:not('.horizontal_carousel')").children(":not('.isotope-hidden')").last().find(".open-details").attr("href")));
			//detailsBlock.find(".next").attr("href", (galleryItem.nextAll(":not('.isotope-hidden')").first().length ? galleryItem.nextAll(":not('.isotope-hidden')").first().find(".open-details").attr("href") : $(".mc_gallery:not('.horizontal_carousel')").children(":not('.isotope-hidden')").first().find(".open-details").attr("href")));
			detailsBlock.find(".prev").attr("href", (galleryItem.prevAll(":not('.isotope-hidden')").first().length ? galleryItem.prevAll(":not('.isotope-hidden')").first().find(".open-details").attr("href") : galleryItem.parent().children(":not('.isotope-hidden')").last().find(".open-details").attr("href")));
			detailsBlock.find(".next").attr("href", (galleryItem.nextAll(":not('.isotope-hidden')").first().length ? galleryItem.nextAll(":not('.isotope-hidden')").first().find(".open-details").attr("href") : galleryItem.parent().children(":not('.isotope-hidden')").first().find(".open-details").attr("href")));
			var visible=parseInt($(".gallery-item-details-list").height())==0 ? false : true;
			var galleryItemDetailsOffset;
			if(!visible)
			{
				$(".gallery-item-details-list").css("display", "block").animate({height:detailsBlock.height()}, 500, 'easeOutQuint', function(){
					$(this).css("height", "100%");
					$(location.hash + " .image-carousel").trigger('configuration', ['debug', false, true]);
					$(window).trigger("resize");
				});
				galleryItemDetailsOffset = $(".gallery-item-details-list").offset();
				if(typeof(galleryItemDetailsOffset)!="undefined")
				{
					var offsetFix = ($(".header-container.sticky").height()!=null ? $(".header-container.sticky").height()+10 : 10);
					$("html, body").animate({scrollTop: galleryItemDetailsOffset.top-offsetFix}, 400);
				}
			}
			else
			{
				/*$(".gallery-item-details-list").animate({height:'0'},{duration:200,easing:'easeOutQuint',complete:function() 
				{
					$(this).css("display", "none")*/
					//$(".gallery-item-details-list").css("height", "100%");
					galleryItemDetailsOffset = $(".gallery-item-details-list").offset();
					if(typeof(galleryItemDetailsOffset)!="undefined")
					{
						var offsetFix = ($(".header-container.sticky").height()!=null ? $(".header-container.sticky").height()+10 : 10);
						$("html, body").animate({scrollTop: galleryItemDetailsOffset.top-offsetFix}, 400);
					}
					$(location.hash + " .image-carousel").trigger('configuration', ['debug', false, true]);
					$(window).trigger("resize");
					/*$(".gallery-item-details-list").css("display", "block").animate({height:detailsBlock.height()},{duration:500,easing:'easeOutQuint'});
				}});*/
			}
		}
	}).trigger("hashchange");
	
	//History
	History.Adapter.bind(window,'statechange',function(){
		var state = History.getState();
		var stateSplit = state.url.replace(new RegExp(config.home_url, 'g'), "").split("/");
		stateSplit = $.grep(stateSplit,function(n){
			return(n);
		});
		if(typeof(stateSplit)!="undefined")
			var stateSplitLast = stateSplit[stateSplit.length-1];
		var data = state.data;
		if(data.action=="theme_employees_pagination")
		{
			data.paged = 1;
			if(typeof(stateSplit)!="undefined" && parseInt(stateSplitLast))
				data.paged = parseInt(stateSplitLast);
			data.atts = $("[name='theme_employees_pagination']").val();
			$("#" + data.container_id).next().next(".mc-preloader").css("display", "block");
		}
		else if(data.action=="theme_gallery_pagination")
		{
			data.paged = 1;
			if(typeof(stateSplit)!="undefined" && parseInt(stateSplitLast))
				data.paged = parseInt(stateSplitLast);
			data.atts = $("[name='theme_gallery_pagination']").val();
			$("#" + data.container_id).next().next(".mc-preloader").css("display", "block");
		}
		$.ajax({
				url: config.ajaxurl,
				type: 'get',
				dataType: 'html',
				data: data,
				success: function(html){
					html = $.trim(html);
					var indexStart = html.indexOf("theme_start")+11;
					var indexEnd = html.indexOf("theme_end")-indexStart;
					html = html.substr(indexStart, indexEnd);
					$("#" + data.container_id).html(html);
					$("#" + data.container_id).next().next(".mc-preloader").css("display", "none");
					$(".mc-gallery:not('.horizontal-carousel, .no-isotope')").isotope({
						masonry: {
							//columnWidth: 225,
							gutter: ($(".mc-gallery:not('.horizontal-carousel, .no-isotope')").width()>462 ? 30 : 12)
						},
						originLeft: (config.is_rtl===1 ? false : true)
					});
					preloader();
					imageControls();
					imageCarousel();
					var offsetFix = ($(".header-container.sticky").height()!=null ? $(".header-container.sticky").height()+10 : 10);
					$("html, body").animate({scrollTop: $("#" + data.container_id).offset().top-offsetFix}, 400);
				}
		});
	});
	//setTimeout(function(){History.Adapter.trigger(window,'statechange');},1);
	
	//ajax pagination
	$(".pagination.ajax.theme_employees_pagination a").on("click", {action: 'theme_employees_pagination'}, pushState);
	$(".pagination.ajax.theme_gallery_pagination a").on("click", {action: 'theme_gallery_pagination'}, pushState);
	
	//timeago
	//translation
	/*jQuery.timeago.settings.strings = {
		prefixAgo: null,
		prefixFromNow: null,
		suffixAgo: "ago",
		suffixFromNow: "from now",
		seconds: "less than a minute",
		minute: "about a minute",
		minutes: "%d minutes",
		hour: "about an hour",
		hours: "about %d hours",
		day: "a day",
		days: "%d days",
		month: "about a month",
		months: "%d months",
		year: "about a year",
		years: "%d years",
		wordSeparator: " ",
		numbers: []
	};*/
	//$("abbr.timeago").timeago();
	
	//footer recent posts, most commented, most viewed, scrolling list
	$(".latest-tweets, .footer-recent-posts, .most-commented, .most-viewed, .scrolling-list-0").carouFredSel({
		direction: "up",
		scroll: {
			items: 1,
			easing: "swing",
			pauseOnHover: true,
			height: "variable"
		},
		auto: {
			play: false
		},
		prev: {
			button: function(){
				return $(this).parent().parent().parent().find('.scrolling-list-control-left');
			}
		},
		next: {
			button: function(){
				return $(this).parent().parent().parent().find('.scrolling-list-control-right');
			}
		}
	});
	$(".latest-tweets").trigger("configuration", {
		items: {
			visible: ($(".latest-tweets").children().length>1 ? 2 : $(".latest-tweets").children().length)
		}
	});
	$(".footer-recent-posts").trigger("configuration", {
		items: {
			visible: ($(".footer-recent-posts").children().length>2 ? 3 : $(".footer-recent-posts").children().length)
		}
	});
	$(".most-commented").trigger("configuration", {
		items: {
			visible: ($(".most-commented").children().length>2 ? 3 : $(".most-commented").children().length)
		}
	});
	$(".most-viewed").trigger("configuration", {
		items: {
			visible: ($(".most-viewed").children().length>2 ? 3 : $(".most-viewed").children().length)
		}
	});
	$(".scrolling-list-0").trigger("configuration", {
		items: {
			visible: ($(".scrolling-list-0").children().length>2 ? 3 : $(".scrolling-list-0").children().length)
		}
	});
	
	
	function windowResize()
	{
		if($(".mc-smart-column").length && $(".header").width()>462)
		{
			var topOfWindow = $(window).scrollTop();
			$(".mc-smart-column").each(function(){
				var row = $(this).parent();
				var wrapper = $(this).children().first();
				var childrenHeight = 0;
				wrapper.children().each(function(){
					childrenHeight += $(this).outerHeight(true);
				});
				if(childrenHeight<$(window).height() && row.offset().top-20<topOfWindow && row.offset().top-20+row.outerHeight()-childrenHeight>topOfWindow)
				{
					wrapper.css({"position": "fixed", "bottom": "auto", "top": "20px", "width": $(this).width() + "px"});
					$(this).css({"height": childrenHeight+"px"});
				}
				else if(childrenHeight<$(window).height() && row.offset().top-20+row.outerHeight()-childrenHeight<=topOfWindow && (row.outerHeight()-childrenHeight>0))
				{
					wrapper.css({"position": "absolute", "bottom": "0", "top": (row.outerHeight()-childrenHeight) + "px", "width": "auto"});
					$(this).css({"height": childrenHeight+"px"});
				}
				else if(childrenHeight>=$(window).height() && row.offset().top+20+childrenHeight<topOfWindow+$(window).height() && row.offset().top+20+row.outerHeight()>topOfWindow+$(window).height())
				{	
					wrapper.css({"position": "fixed", "bottom": "20px", "top": "auto", "width": $(this).width() + "px"});
					$(this).css({"height": childrenHeight+"px"});
				}
				else if(childrenHeight>=$(window).height() && row.offset().top+20+row.outerHeight()<=topOfWindow+$(window).height() && (row.outerHeight()-childrenHeight>0))
				{
					wrapper.css({"position": "absolute", "bottom": "0", "top": (row.outerHeight()-childrenHeight) + "px", "width": "auto"});
					$(this).css({"height": childrenHeight+"px"});
				}
				else
				{
					wrapper.css({"position": "static", "bottom": "auto", "top": "auto", "width": "auto"});
					$(this).css({"height": childrenHeight + "px"});
				}
			});
		}
		$(".horizontal-carousel").each(function(){
			var self = $(this);
			self.trigger("configuration", {
				items: {
					visible: ($(".header").width()>750 ? (self.hasClass("testimonials") ? 2 : (self.hasClass("gallery-3-columns") ? 3 : (self.hasClass("gallery-2-columns") ? 2: 4))) : ($(".header").width()>462 ? (self.hasClass("testimonials") || self.hasClass("gallery-2-columns") ? 2 : 3) : ($(".header").width()>300 ? (self.hasClass("testimonials") ? 1 : 2) : 1)))
				}
			});
		});
		$(".training_classes").accordion("resize");
		$(".slider:not('.ui-slider,.form_field')").trigger('configuration', ['debug', false, true]);
		setTimeout(function(){
			$(".image-carousel").trigger('configuration', ['debug', false, true]);
		}, 1);
		$(".latest-tweets, .footer-recent-posts, .most-commented, .most-viewed, .scrolling-list-0").trigger('configuration', ['debug', false, true]);
		if($(".mc-gallery:not('.horizontal-carousel, .no-isotope')").length)
		{
			$(".mc-gallery:not('.horizontal-carousel, .no-isotope')").isotope({
				masonry: {
					//columnWidth: 225,
					gutter: ($(".mc-gallery:not('.horizontal-carousel, .no-isotope')").width()>462 ? 30 : 12)
				},
				originLeft: (config.is_rtl===1 ? false : true)
			});
		}
		/*if($(".photostream").length)
		{
			$(".photostream").isotope({
				masonry: {
					//columnWidth: 225,
					gutter: 10
				},
				originLeft: (config.is_rtl===1 ? false : true)
			});
		}*/
		if($(".sticky").length)
		{
			if($(".header-container").hasClass("sticky"))
				menu_position = ($(".header-container.sticky").length>0 ? $(".header-container.sticky").offset().top : null );
			var topOfWindow = $(window).scrollTop();
			if(menu_position!=null && $(".header-container .sf-menu").is(":visible"))
			{
				if(menu_position<topOfWindow)
				{
					if(!$("#mc-sticky-clone").length)
					{
						$(".header-container").after($(".header-container").clone().attr("id", "mc-sticky-clone").addClass("move"));
						$(".header-container").addClass("transition");
						setTimeout(function(){
							$("#mc-sticky-clone").addClass("transition");
						}, 1);
					}
				}
				else
				{
					$(".header-container").removeClass("transition");
					$("#mc-sticky-clone").remove();
				}
			}
			else
				$("#mc-sticky-clone").remove();
		}
		/*var maxHeight = Math.max.apply(null, $(".timetable:visible tr td:first-child").map(function ()
		{
			return $(this).height();
		}).get());
		$(".timetable:visible tr td").css("height", maxHeight);*/
		//timetable height fix
		/*$(".timetable .event").each(function(){
			if($(this).children(".event_container").length>1)
			{
				var childrenHeight = 0;
				$(this).children(".event_container").not(":last").each(function(){
					childrenHeight += $(this).innerHeight();
				});
				var height = $(this).height()-childrenHeight-($(this).parent().parent().width()<=750 ? 9 : 22);
				if(height>$(this).children(".event_container").last().height())
					$(this).children(".event_container").last().css("height", height + "px");
			}
		});*/
	}
	//window resize
	$(window).resize(windowResize);
	window.addEventListener('orientationchange', windowResize);
	
	//scroll top
	$("a[href='#top']").on("click", function() {
		$("html, body").animate({scrollTop: 0}, "slow");
		return false;
	});
	
	//hint
	$(".search input[type='text'], .comment-form textarea").hint();
	
	/*var maxHeight = Math.max.apply(null, $(".timetable:visible tr td:first-child").map(function ()
	{
		return $(this).height();
	}).get());
	$(".timetable:visible tr td").css("height", maxHeight);*/
	//timetable height fix
	/*$(".timetable .event").each(function(){
		if($(this).children(".event_container").length>1)
		{
			var childrenHeight = 0;
			$(this).children(".event_container").not(":last").each(function(){
				childrenHeight += $(this).innerHeight();
			});
			var height = $(this).height()-childrenHeight-($(this).parent().parent().width()<=750 ? 9 : 22);
			if(height>$(this).children(".event_container").last().height())
				$(this).children(".event_container").last().css("height", height + "px");
		}
	});*/
	
	//tooltip
	$(".tooltip").on("mouseover click", function(){
		var attachTo = $(this);
		if($(this).is(".event-container"))
			attachTo = $(this).parent();
		var position = attachTo.position();
		var tooltip_text = $(this).children(".tooltip-text");
		tooltip_text.css("width", $(this).outerWidth() + "px");
		tooltip_text.css("height", tooltip_text.height() + "px");
		tooltip_text.css({"top": position.top-tooltip_text.innerHeight() + "px", "left": position.left + "px"});
	});
	
	//isotope
	$(".mc-gallery:not('.horizontal-carousel, .no-isotope')").isotope({
		masonry: {
			//columnWidth: 225,
			gutter: ($(".mc-gallery:not('.horizontal-carousel, .no-isotope')").width()>462 ? 30 : 12)
		},
		originLeft: (config.is_rtl===1 ? false : true)
	});
	//photostream
	/*$(".photostream").isotope({
		masonry: {
			//columnWidth: 225,
			gutter: 10
		},
		originLeft: (config.is_rtl===1 ? false : true)
	});
	//$(".timetable_isotope").isotope();*/
	
	//fancybox
	$(".mc-lightbox a, .fancybox, .fancybox-video, .fancybox-iframe").prettyPhoto({
		slideshow: 3000,
		overlay_gallery: true,
		opacity: 0.7,
		social_tools: '',
		deeplinking: false,
		default_width: "800",
		default_height: "600"
	});
	$(".fancybox[rel]").prettyPhoto({
		show_title: false,
		slideshow: 3000,
		overlay_gallery: true,
		social_tools: '',
		deeplinking: false,
	});
	/*$(".fancybox-video").each(function(){
		var width = ($(this).attr("href").indexOf("vimeo")!=-1 ? 600 : 680);
		var height = ($(this).attr("href").indexOf("vimeo")!=-1 ? 338 : 495);
		$(this).prettyPhoto({
			social_tools: '',
			default_width: width,
			default_height: height
		});
	});
	$(".fancybox-iframe").prettyPhoto({
		social_tools: '',
		default_width: "75%",
		default_height: "75%"
	});*/
	/*$(".fancybox:not(.noautoscale)").fancybox({
		'titlePosition': 'inside',
		'speedIn': 600, 
		'speedOut': 200,
		'transitionIn': 'elastic',
		'cyclic': 'true'
	});
	$(".fancybox.noautoscale").fancybox({
		'autoScale': false,
		'titlePosition': 'inside',
		'speedIn': 600, 
		'speedOut': 200,
		'transitionIn': 'elastic',
		'cyclic': 'true'
	});
	$(".fancybox-video").bind('click',function() 
	{
		$.fancybox(
		{
			'autoScale':false,
			'titlePosition': 'inside',
			'title': this.title,
			'speedIn': 600, 
			'speedOut': 200,
			'transitionIn': 'elastic',
			'width':(this.href.indexOf("vimeo")!=-1 ? 600 : 680),
			'height':(this.href.indexOf("vimeo")!=-1 ? 338 : 495),
			'href':(this.href.indexOf("vimeo")!=-1 ? this.href : this.href.replace(new RegExp("watch\\?v=", "i"), 'embed/')),
			'type':'iframe',
			'swf':
			{
				'wmode':'transparent',
				'allowfullscreen':'true'
			}
		});
		return false;
	});
	$(".fancybox-iframe").bind('click',function() 
	{
		$.fancybox(
		{
			'autoScale' : false,
			'titlePosition': 'inside',
			'title': this.title,
			'speedIn': 600, 
			'speedOut': 200,
			'transitionIn': 'elastic',
			'width' : '75%',
			'height' : '75%',
			'href': this.href,
			'type' : 'iframe'
		});
		return false;
	});*/
	
	//comment form, contact form
	if($(".contact-form").length)
		$(".contact-form")[0].reset();
	if($(".comment-form").length)
		$(".comment-form")[0].reset();
	$(".comment-form, .contact-form").on("submit", function(event){
		event.preventDefault();
		var data = $(this).serializeArray();
		var id = $(this).attr("id");
		$("#"+id+" [type='checkbox']:not(:checked)").each(function(){
			data.push({name: $(this).attr("name"), value: 0});
		});
		if(parseInt($("#"+id+" [name='first_name']").data("required"), 10))
			data.push({name: 'first_name_required', value: 1});
		if(parseInt($("#"+id+" [name='last_name']").data("required"), 10))
			data.push({name: 'last_name_required', value: 1});
		if(parseInt($("#"+id+" [name='date_of_birth']").data("required"), 10))
			data.push({name: 'date_of_birth_required', value: 1});
		if(parseInt($("#"+id+" [name='social_security_number']").data("required"), 10))
			data.push({name: 'social_security_number_required', value: 1});
		if(parseInt($("#"+id+" [name='phone_number']").data("required"), 10))
			data.push({name: 'phone_number_required', value: 1});
		if(parseInt($("#"+id+" [name='email']").data("required"), 10))
			data.push({name: 'email_required', value: 1});
		if(parseInt($("#"+id+" [name='message']").data("required"), 10))
			data.push({name: 'message_required', value: 1});
		$("#"+id+" .block").block({
			message: false,
			overlayCSS: {
				opacity:'0.3',
				"backgroundColor": "#FFF"
			}
		});
		$("#"+id+" [type='submit']").prop("disabled", true);
		$.ajax({
			url: config.ajaxurl,
			data: data,
			type: "post",
			dataType: "json",
			success: function(json){
				$("#"+id+" [name='submit'], #"+id+" [name='name'], #"+id+" [name='first_name'], #"+id+" [name='last_name'], #"+id+" [name='date_of_birth'], #"+id+" [name='email'], #"+id+" [name='phone_number'], #"+id+" [name='social_security_number'], #"+id+" [name='message'], #"+id+" .g-recaptcha, #"+id+"terms").qtip('destroy');
				if(typeof(json.isOk)!="undefined" && json.isOk)
				{
					if(typeof(json.submit_message)!="undefined" && json.submit_message!="")
					{
						$("#"+id+" [name='submit']").qtip(
						{
							style: {
								classes: 'ui-tooltip-success'
							},
							content: { 
								text: json.submit_message 
							},
							hide: false,
							position: { 
								my: "right center",
								at: "left center" 
							}
						}).qtip('show');
						//close tooltip after 5 sec
						/*setTimeout(function(){
							$("#"+id+" [name='submit']").qtip("api").hide();
						}, 5000);*/
						if(id=="comment_form" && typeof(json.html)!="undefined")
						{
							$(".comments").addClass("page-margin-top").html(json.html);
							$("#comment_form [name='comment_parent_id']").val(0);
							if(typeof(json.comment_id)!="undefined")
							{
								var offset = $("#comment-" + json.comment_id).offset();
								var offsetFix = ($(".header-container.sticky").height()!=null ? $(".header-container.sticky").height()+10 : 10);
								$("html, body").animate({scrollTop: offset.top-offsetFix}, 400);
								if(typeof(json.change_url)!="undefined" && $.param.fragment()!=json.change_url.replace("#", ""))
									$("#comment_form [name='prevent_scroll']").val(1);
							}
							if(typeof(json.change_url)!="undefined" && $.param.fragment()!=json.change_url.replace("#", ""))
								$.bbq.pushState(json.change_url);
								//window.location.href = json.change_url;
						}
						$("#"+id)[0].reset();
						if(typeof(grecaptcha)!="undefined")
							grecaptcha.reset();
						$("#cancel_comment").css("display", "none");
						$(".contact-form [name='department']").val("");
						$(".contact-form .tabs-box-navigation-selected>span").text($(".contact-form #department_select_box_title").val()!="" ? $(".contact-form #department_select_box_title").val() : "Select Department");
					}
				}
				else
				{
					if(typeof(json.submit_message)!="undefined" && json.submit_message!="")
					{
						$("#"+id+" [name='submit']").qtip(
						{
							style: {
								classes: 'ui-tooltip-error'
							},
							content: { 
								text: json.submit_message 
							},
							position: { 
								my: "right center",
								at: "left center" 
							}
						}).qtip('show');
						if(typeof(grecaptcha)!="undefined" && grecaptcha.getResponse()!="")
							grecaptcha.reset();
					}
					if(typeof(json.error_name)!="undefined" && json.error_name!="")
					{
						$("#"+id+" [name='name']").qtip(
						{
							style: {
								classes: 'ui-tooltip-error'
							},
							content: { 
								text: json.error_name 
							},
							position: { 
								my: "bottom center",
								at: "top center" 
							}
						}).qtip('show');
					}
					if(typeof(json.error_first_name)!="undefined" && json.error_first_name!="")
					{
						$("#"+id+" [name='first_name']").qtip(
						{
							style: {
								classes: 'ui-tooltip-error'
							},
							content: { 
								text: json.error_first_name 
							},
							position: { 
								my: "bottom center",
								at: "top center" 
							}
						}).qtip('show');
					}
					if(typeof(json.error_last_name)!="undefined" && json.error_last_name!="")
					{
						$("#"+id+" [name='last_name']").qtip(
						{
							style: {
								classes: 'ui-tooltip-error'
							},
							content: { 
								text: json.error_last_name 
							},
							position: { 
								my: "bottom center",
								at: "top center" 
							}
						}).qtip('show');
					}
					if(typeof(json.error_date_of_birth)!="undefined" && json.error_date_of_birth!="")
					{
						$("#"+id+" [name='date_of_birth']").qtip(
						{
							style: {
								classes: 'ui-tooltip-error'
							},
							content: { 
								text: json.error_date_of_birth 
							},
							position: { 
								my: "bottom center",
								at: "top center" 
							}
						}).qtip('show');
					}
					if(typeof(json.error_phone_number)!="undefined" && json.error_phone_number!="")
					{
						$("#"+id+" [name='phone_number']").qtip(
						{
							style: {
								classes: 'ui-tooltip-error'
							},
							content: { 
								text: json.error_phone_number 
							},
							position: { 
								my: "bottom center",
								at: "top center" 
							}
						}).qtip('show');
					}
					if(typeof(json.error_social_security_number)!="undefined" && json.error_social_security_number!="")
					{
						$("#"+id+" [name='social_security_number']").qtip(
						{
							style: {
								classes: 'ui-tooltip-error'
							},
							content: { 
								text: json.error_social_security_number 
							},
							position: { 
								my: "bottom center",
								at: "top center" 
							}
						}).qtip('show');
					}
					if(typeof(json.error_email)!="undefined" && json.error_email!="")
					{
						$("#"+id+" [name='email']").qtip(
						{
							style: {
								classes: 'ui-tooltip-error'
							},
							content: { 
								text: json.error_email 
							},
							position: { 
								my: "bottom center",
								at: "top center" 
							}
						}).qtip('show');
					}
					if(typeof(json.error_message)!="undefined" && json.error_message!="")
					{
						$("#"+id+" [name='message']").qtip(
						{
							style: {
								classes: 'ui-tooltip-error'
							},
							content: { 
								text: json.error_message 
							},
							position: { 
								my: "bottom center",
								at: "top center" 
							}
						}).qtip('show');
					}
					if(typeof(json.error_captcha)!="undefined" && json.error_captcha!="")
					{
						$("#"+id+" .g-recaptcha").qtip(
						{
							style: {
								classes: 'ui-tooltip-error'
							},
							content: { 
								text: json.error_captcha 
							},
							position: { 
								my: "bottom left",
								at: "top left" 
							}
						}).qtip('show');
					}
					if(typeof(json.error_terms)!="undefined" && json.error_terms!="")
					{
						$("#"+id+"terms").qtip(
						{
							style: {
								classes: 'ui-tooltip-error'
							},
							content: { 
								text: json.error_terms 
							},
							position: { 
								my: (config.is_rtl ? "bottom right" : "bottom left"),
								at: (config.is_rtl ? "top right" : "top left")
							}
						}).qtip('show');
					}
				}
				$("#"+id+" .block").unblock();
				$("#"+id+" [type='submit']").removeProp("disabled");
			}
		});
	});
	var endYear = new Date().getFullYear();
	var startYear = endYear-120;
	/*$.datepicker.regional['nl'] = {clearText: 'Effacer', clearStatus: '',
		closeText: 'sluiten', closeStatus: 'Onveranderd sluiten ',
		prevText: '<vorige', prevStatus: 'Zie de vorige maand',
		nextText: 'volgende>', nextStatus: 'Zie de volgende maand',
		currentText: 'Huidige', currentStatus: 'Bekijk de huidige maand',
		monthNames: ['januari','februari','maart','april','mei','juni',
		'juli','augustus','september','oktober','november','december'],
		monthNamesShort: ['jan','feb','mrt','apr','mei','jun',
		'jul','aug','sep','okt','nov','dec'],
		monthStatus: 'Bekijk een andere maand', yearStatus: 'Bekijk nog een jaar',
		weekHeader: 'Sm', weekStatus: '',
		dayNames: ['zondag','maandag','dinsdag','woensdag','donderdag','vrijdag','zaterdag'],
		dayNamesShort: ['zo', 'ma','di','wo','do','vr','za'],
		dayNamesMin: ['zo', 'ma','di','wo','do','vr','za'],
		dayStatus: 'Gebruik DD als de eerste dag van de week', dateStatus: 'Kies DD, MM d',
		dateFormat: 'dd/mm/yy', firstDay: 1, 
		initStatus: 'Kies een datum', isRTL: false};
	$.datepicker.setDefaults($.datepicker.regional['nl']);*/
	$(".contact-form [name='date_of_birth']").datepicker({
		dateFormat: "DD, d MM yy",
		nextText: "",
		prevText: "",
		changeYear: true,
		yearRange: startYear + ":" + endYear
	});
	$(".closing-in").each(function(){
		var self = $(this);
		var time = parseInt(self.children(".seconds").text());
		var id = setInterval(function(){
			time--;
			self.children(".seconds").text(time);
			if(time==0)
			{
				self.parent().prev(".notification-box").fadeOut(500, function(){
					$(this).remove();
				});
				self.remove();
				clearInterval(id);
			}
		}, 1000);
	});
	$(".notification-box .nb-close").on("click", function(event){
		event.preventDefault();
		var self = $(this).parent();
		if(self.next().hasClass("closing-in-container"))
			self.next().remove();
		self.fadeOut(500, function(){
			$(this).remove();
		});
	});
	if($(".header-container").hasClass("sticky"))
		menu_position = ($(".header-container.sticky").length>0 ? $(".header-container.sticky").offset().top : null );
	function animateElements()
	{
		$('.animated-element, .sticky, .mc-smart-column').each(function(){
			var elementPos = $(this).offset().top;
			var topOfWindow = $(window).scrollTop();
			var animationStart = (typeof($(this).data("animation-start"))!="undefined" ? parseInt($(this).data("animation-start"), 10) : 0);
			if($(this).hasClass("mc-smart-column"))
			{
				var row = $(this).parent();
				var wrapper = $(this).children().first();
				var childrenHeight = 0;
				wrapper.children().each(function(){
					childrenHeight += $(this).outerHeight(true);
				});
				if(childrenHeight<$(window).height() && row.offset().top-20<topOfWindow && row.offset().top-20+row.outerHeight()-childrenHeight>topOfWindow)
				{
					wrapper.css({"position": "fixed", "bottom": "auto", "top": "20px", "width": $(this).width() + "px"});
					$(this).css({"height": childrenHeight+"px"});
				}
				else if(childrenHeight<$(window).height() && row.offset().top-20+row.outerHeight()-childrenHeight<=topOfWindow && (row.outerHeight()-childrenHeight>0))
				{
					wrapper.css({"position": "absolute", "bottom": "0", "top": (row.outerHeight()-childrenHeight) + "px", "width": "auto"});
					$(this).css({"height": childrenHeight+"px"});
				}
				else if(childrenHeight>=$(window).height() && row.offset().top+20+childrenHeight<topOfWindow+$(window).height() && row.offset().top+20+row.outerHeight()>topOfWindow+$(window).height())
				{	
					wrapper.css({"position": "fixed", "bottom": "20px", "top": "auto", "width": $(this).width() + "px"});
					$(this).css({"height": childrenHeight+"px"});
				}
				else if(childrenHeight>=$(window).height() && row.offset().top+20+row.outerHeight()<=topOfWindow+$(window).height() && (row.outerHeight()-childrenHeight>0))
				{
					wrapper.css({"position": "absolute", "bottom": "0", "top": (row.outerHeight()-childrenHeight) + "px", "width": "auto"});
					$(this).css({"height": childrenHeight+"px"});
				}
				else
				{
					wrapper.css({"position": "static", "bottom": "auto", "top": "auto", "width": "auto"});
					
				}
			}
			else if($(this).hasClass("sticky"))
			{
				if(menu_position!=null && $(".header-container .sf-menu").is(":visible"))
				{
					if(menu_position<topOfWindow)
					{
						//$(this).addClass("move");
						if(!$("#mc-sticky-clone").length)
						{
							$(this).after($(this).clone().attr("id", "mc-sticky-clone").addClass("move"));
							$(this).addClass("transition");
							setTimeout(function(){
								$("#mc-sticky-clone").addClass("transition");
							}, 1);
						}
							
					}
					else
					{
						//$(this).removeClass("move");
						$(this).removeClass("transition");
						$("#mc-sticky-clone").remove();
					}
				}
			}
			else if(elementPos<topOfWindow+$(window).height()-20-animationStart) 
			{
				if($(this).hasClass("number") && !$(this).hasClass("progress") && $(this).is(":visible"))
				{
					var self = $(this);
					self.addClass("progress");
					if(typeof(self.data("value"))!="undefined")
					{
						var value = parseFloat(self.data("value").toString().replace(" ",""));
						self.text(0);
						self.text(value);
					}
				}
				else if($(this).hasClass("counter-box-path") && !$(this).hasClass("progress") && $(this).is(":visible"))
				{
					var self = $(this);
					self.addClass("progress");
					var dashoffset = self.data("dashoffset");
					self.animate({
						"stroke-dashoffset": dashoffset
					}, 2000, "easeInOutQuad");
				}
				else if(!$(this).hasClass("progress"))
				{
					var elementClasses = $(this).attr('class').split(' ');
					var animation = "fadeIn";
					var duration = 600;
					var delay = 0;
					if($(this).hasClass("scroll-top"))
					{
						var height = ($(window).height()>$(document).height()/2 ? $(window).height()/2 : $(document).height()/2);
						if(topOfWindow+80<height)
						{
							if($(this).hasClass("fadeIn") || $(this).hasClass("fadeOut"))
								animation = "fadeOut";
							else
								animation = "";
							$(this).removeClass("fadeIn")
						}
						else
							$(this).removeClass("fadeOut")
					}
					for(var i=0; i<elementClasses.length; i++)
					{
						if(elementClasses[i].indexOf('animation-')!=-1)
							animation = elementClasses[i].replace('animation-', '');
						if(elementClasses[i].indexOf('duration-')!=-1)
							duration = elementClasses[i].replace('duration-', '');
						if(elementClasses[i].indexOf('delay-')!=-1)
							delay = elementClasses[i].replace('delay-', '');
					}
					$(this).addClass(animation);
					$(this).css({"animation-duration": duration + "ms"});
					$(this).css({"animation-delay": delay + "ms"});
					$(this).css({"transition-delay": delay + "ms"});
				}
			}
		});
		$('.box-header.animation-slide, .woocommerce .box-header').each(function(){
			var elementPos = $(this).offset().top;
			var topOfWindow = $(window).scrollTop();
			if(elementPos<topOfWindow+$(window).height()-30) 
			{
				$(this).addClass("slide");
			}
		});
	}
	setTimeout(animateElements, 1);
	$(window).scroll(animateElements);
	
	function refreshGoogleMap() 
	{
		if(typeof(theme_google_maps)!="undefined") 
		{		
			theme_google_maps.forEach(function(elem){
				google.maps.event.trigger(elem.map, "resize");
				elem.map.setCenter(elem.coordinate);
				elem.map.setZoom(elem.map.getZoom());
			});
		}
	}
	refreshGoogleMap();
	$(".accordion").on("accordionactivate", function(event, ui){
		refreshGoogleMap();
	});
	$(".tabs").on("tabsbeforeactivate", function(event, ui){
		refreshGoogleMap();
	});
	//woocommerce
	$(".woocommerce .quantity .plus").on("click", function(){
		var input = $(this).prev();
		input.val(parseInt(input.val())+1);
		$("input[name='update_cart']").removeAttr("disabled");
	});
	$(".woocommerce .quantity .minus").on("click", function(){
		var input = $(this).next();
		input.val((parseInt(input.val())-1>0 ? parseInt(input.val())-1 : 0));
		$("input[name='update_cart']").removeAttr("disabled");
	});
	$(document.body).on("updated_cart_totals", function(){
		$(".woocommerce .quantity .plus").off("click");
		$(".woocommerce .quantity .plus").on("click", function(){
			var input = $(this).prev();
			input.val(parseInt(input.val())+1);
			$("input[name='update_cart']").removeAttr("disabled");
		});
		$(".woocommerce .quantity .minus").off("click");
		$(".woocommerce .quantity .minus").on("click", function(){
			var input = $(this).next();
			input.val((parseInt(input.val())-1>0 ? parseInt(input.val())-1 : 0));
			$("input[name='update_cart']").removeAttr("disabled");
		});
		var sum = 0;
		$(".shop_table.cart .input-text.qty.text").each(function(){
			sum += parseInt($(this).val());
		});
		if(sum>0)
			$(".cart-items-number").html(sum).removeClass("cart-empty");
	});
	$(document.body).on("added_to_cart", function(event, data){
		var sum = 0;
		$(data["div.widget_shopping_cart_content"]).find(".quantity").each(function(){
			sum += parseInt($(this).html());
		});
		if(sum>0)
			$(".cart-items-number").html(sum).removeClass("cart-empty");
	});
});