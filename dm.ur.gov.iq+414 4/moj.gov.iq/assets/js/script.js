(function ($) {

	"use strict";

	var $rtl = '0';			// 0 is false and 1 is true.

	if ($rtl == '1') {
		var $rt = true;
	} else {
		var $rt = false;
	}

	// Progressive Image Loading System
	function initProgressiveImageLoading() {
		const imageQueue = [];
		let isLoading = false;
		let cachedViewport = null;

		// Cache viewport dimensions to avoid repeated calculations
		function updateViewportCache() {
			cachedViewport = {
				height: window.innerHeight,
				scrollY: window.pageYOffset
			};
		}

		// Collect all images with data-src and prioritize by position
		function collectAndPrioritizeImages() {
			const images = document.querySelectorAll('img[data-src], img[data-lazy]');
			const imageData = [];

			// Update viewport cache once
			updateViewportCache();

			// Use requestAnimationFrame to batch DOM reads
			return new Promise(resolve => {
				requestAnimationFrame(() => {
					images.forEach((img, index) => {
						const rect = img.getBoundingClientRect();
						const distanceFromTop = rect.top + cachedViewport.scrollY;
						const isVisible = rect.top < cachedViewport.height && rect.bottom > 0;

						imageData.push({
							element: img,
							distanceFromTop: distanceFromTop,
							isVisible: isVisible,
							priority: isVisible ? 1 : (distanceFromTop < cachedViewport.height * 2 ? 2 : 3),
							originalIndex: index
						});
					});

					// Sort by priority, then by distance from top
					const sortedData = imageData.sort((a, b) => {
						if (a.priority !== b.priority) return a.priority - b.priority;
						return a.distanceFromTop - b.distanceFromTop;
					});

					resolve(sortedData);
				});
			});
		}

		// Load image with smooth transition
		function loadImage(imageData) {
			return new Promise((resolve) => {
				const img = imageData.element;
				const src = img.getAttribute('data-src') || img.getAttribute('data-lazy');

				if (!src || img.getAttribute('data-loaded')) {
					resolve();
					return;
				}

				// Add loading class
				img.classList.add('image-loading');

				const tempImg = new Image();
				tempImg.onload = () => {
					img.src = src;
					img.removeAttribute('data-src');
					img.removeAttribute('data-lazy');
					img.setAttribute('data-loaded', 'true');
					img.classList.remove('image-loading');
					img.classList.add('image-loaded');
					resolve();
				};

				tempImg.onerror = () => {
					img.classList.remove('image-loading');
					img.classList.add('image-error');
					resolve();
				};

				tempImg.src = src;
			});
		}

		// Process image queue with optimized batching
		async function processImageQueue() {
			if (isLoading || imageQueue.length === 0) return;

			isLoading = true;

			// Load critical images first (priority 1) - up to 3 simultaneously
			const criticalImages = imageQueue.filter(img => img.priority === 1).slice(0, 3);
			if (criticalImages.length > 0) {
				await Promise.all(criticalImages.map(loadImage));
				imageQueue.splice(0, criticalImages.length);
			}

			// Load remaining images in smaller batches with RAF timing
			while (imageQueue.length > 0) {
				const batchSize = Math.min(2, imageQueue.length);
				const batch = imageQueue.splice(0, batchSize);

				await Promise.all(batch.map(loadImage));

				// Use requestAnimationFrame instead of setTimeout for better performance
				if (imageQueue.length > 0) {
					await new Promise(resolve => requestAnimationFrame(resolve));
				}
			}

			isLoading = false;
		}

		// Initialize the system with async image collection
		async function init() {
			const prioritizedImages = await collectAndPrioritizeImages();
			imageQueue.push(...prioritizedImages);
			processImageQueue();
		}

		// Intersection Observer for lazy loading with optimized settings
		if ('IntersectionObserver' in window) {
			const lazyImageObserver = new IntersectionObserver((entries) => {
				// Use requestAnimationFrame to batch DOM updates
				requestAnimationFrame(() => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							const img = entry.target;
							if (!img.getAttribute('data-loaded')) {
								loadImage({ element: img });
							}
							lazyImageObserver.unobserve(img);
						}
					});
				});
			}, {
				rootMargin: '50px 0px',
				threshold: 0.1
			});

			// Observe images that aren't in the initial load queue - use RAF to defer
			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					document.querySelectorAll('img[data-src], img[data-lazy]').forEach(img => {
						if (!img.getAttribute('data-loaded')) {
							lazyImageObserver.observe(img);
						}
					});
				});
			});
		}

		return { init, processImageQueue };
	}

	/* ================ Slick Sliders. ================ */

	function runSlick() {

		/* Horizontal slider */
		if ($('.horizontal-slider').length > 0) {

			$('.horizontal-slider').each(function () {
				var slides_n = parseInt($(this).attr('data-slides_count'), 10),
					sscrol = parseInt($(this).attr('data-scroll_amount'), 10),
					t_infinite = $(this).attr('data-slider-infinite'),
					t_arr = $(this).attr('data-slider-arrows'),
					speed_n = $(this).attr('data-slider-speed'),
					t_fade = $(this).attr('data-slider-fade'),
					t_dots = $(this).attr('data-slider-dots'),
					t_auto = $(this).attr('data-slider-auto'),
					fd = false,
					tinfinite = false,
					aut = false,
					arr = true,
					tdots = true,
					resp_n = 1;

				if (t_infinite == '1') tinfinite = true;
				if (t_auto == '1') aut = true;
				if (t_fade == '1') fd = true;
				if (t_arr == '0') arr = false;
				if (t_dots == '0') tdots = false;
				if (slides_n > 2) resp_n = 2;

				// Initialize slider immediately without waiting for images
				$(this).slick({
					slidesToShow: slides_n,
					slidesToScroll: sscrol,
					dots: tdots,
					infinite: tinfinite,
					speed: speed_n,
					rtl: $rt,
					fade: fd,
					autoplay: aut,
					arrows: arr,
					lazyLoad: 'ondemand',
					waitForAnimate: false,
					prevArrow: '<button type="button" class="slick-prev slick-arrow" aria-label="Previous"><i class="fa fa-chevron-left"></i></button>',
					nextArrow: '<button type="button" class="slick-next slick-arrow" aria-label="Next"><i class="fa fa-chevron-right"></i></button>',
					responsive: [
						{
							breakpoint: 1024,
							settings: {
								slidesToShow: resp_n,
								slidesToScroll: resp_n
							}
						},
						{
							breakpoint: 640,
							settings: {
								slidesToShow: 1,
								slidesToScroll: 1
							}
						}
					]
				});

				// Add mobile arrow positioning after initialization
				if (window.innerWidth <= 768) {
					addMobileArrows($(this));
				}
			});
		}

		$('.slick-gal,.posts-gal').slick({
			dots: true,
			rtl: $rt,
			arrows: false,
			lazyLoad: 'ondemand',
			waitForAnimate: false
		});

		/* breaking news */
		$('.break-news-slider').slick({
			dots: false,
			arrows: true,
			vertical: true,
			rtl: $rt,
			slidesToShow: 1,
			touchMove: true,
			slidesToScroll: 1,
			autoplay: true,
			lazyLoad: 'ondemand'
		});

		/* banner slick */
		$('.banner-slick').slick({
			dots: false,
			arrows: false,
			vertical: true,
			rtl: $rt,
			slidesToShow: 1,
			touchMove: true,
			slidesToScroll: 1,
			autoplay: true,
			lazyLoad: 'ondemand'
		});

		$('.t_slider-1').each(function () {
			$(this).find('.slick-dots,.slick-prev,.slick-next')
				.wrapAll('<div class="slider_controls" />');
		});

		/* shop slider */
		if ($('.shop-ads-top').length) {
			$('.shop-ads-top').slick({
				dots: true,
				rtl: $rt,
				infinite: true,
				autoplay: true,
				speed: 300,
				slidesToShow: 1,
				touchMove: true,
				arrows: false,
				slidesToScroll: 1,
				lazyLoad: 'ondemand'
			});
		}

		/* ================= Product images zoom =============== */
		if ($(".product-zoom").length) {
			$('.product-zoom').slick({
				dots: true,
				rtl: $rt,
				arrows: false,
				autoplay: true,
				lazyLoad: 'ondemand',
				customPaging: function (slider, i) {
					var sl = $(slider.$slides[i]).find('.zoom').attr('href');
					return '<img src="' + sl + '" loading="lazy" />';
				}
			});
		}
	}

	// Function to add mobile-optimized arrows
	function addMobileArrows($slider) {
		const $container = $slider.closest('.enhanced-slider-container');

		// Remove existing mobile arrows if any
		$container.find('.mobile-slider-controls').remove();

		// Create mobile arrow container
		const mobileControls = `
			<div class="mobile-slider-controls">
				<button type="button" class="mobile-arrow mobile-prev" aria-label="Previous">
					<i class="fa fa-chevron-left"></i>
				</button>
				<div class="mobile-dots-container"></div>
				<button type="button" class="mobile-arrow mobile-next" aria-label="Next">
					<i class="fa fa-chevron-right"></i>
				</button>
			</div>
		`;

		$container.append(mobileControls);

		// Bind click events
		$container.find('.mobile-prev').on('click', function () {
			$slider.slick('slickPrev');
		});

		$container.find('.mobile-next').on('click', function () {
			$slider.slick('slickNext');
		});

		// Add dots if needed
		if ($slider.slick('getOption', 'dots')) {
			updateMobileDots($slider, $container);
		}

		// Update dots on slide change
		$slider.on('afterChange', function () {
			updateMobileDots($slider, $container);
		});
	}

	// Function to update mobile dots
	function updateMobileDots($slider, $container) {
		const currentSlide = $slider.slick('slickCurrentSlide');
		const slideCount = $slider.slick('getSlick').slideCount;
		const slidesToShow = $slider.slick('getOption', 'slidesToShow');
		const totalDots = Math.ceil(slideCount / slidesToShow);

		const $dotsContainer = $container.find('.mobile-dots-container');
		$dotsContainer.empty();

		for (let i = 0; i < totalDots; i++) {
			const isActive = Math.floor(currentSlide / slidesToShow) === i;
			$dotsContainer.append(`
				<span class="mobile-dot ${isActive ? 'active' : ''}" data-slide="${i * slidesToShow}"></span>
			`);
		}

		// Bind dot click events
		$dotsContainer.find('.mobile-dot').on('click', function () {
			const slideIndex = $(this).data('slide');
			$slider.slick('slickGoTo', slideIndex);
		});
	}

	// Initialize sliders with optimized timing
	$(document).ready(function () {
		// Show content immediately
		$('#contentWrapper').css('visibility', 'visible');

		// Initialize progressive image loading
		const imageLoader = initProgressiveImageLoading();

		// Use requestAnimationFrame for better performance than setTimeout
		requestAnimationFrame(function () {
			runSlick();
			// Start image loading after sliders are initialized
			imageLoader.init();
		});
	});

	/* =============== Window.load ================== */
	$(window).on("load", function () {
		// Safely refresh sliders that exist and are initialized
		try {
			$('.horizontal-slider').each(function () {
				if ($(this).hasClass('slick-initialized')) {
					$(this).slick('refresh');
				}
			});

			$('.slick-gal').each(function () {
				if ($(this).hasClass('slick-initialized')) {
					$(this).slick('refresh');
				}
			});

			$('.posts-gal').each(function () {
				if ($(this).hasClass('slick-initialized')) {
					$(this).slick('refresh');
				}
			});
		} catch (error) {
			console.warn('Slick refresh error:', error);
		}
	});

	// Handle window resize for mobile arrows with debouncing
	let resizeTimeout;
	$(window).on('resize', function () {
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(function () {
			// Use requestAnimationFrame to batch DOM operations
			requestAnimationFrame(function () {
				$('.horizontal-slider').each(function () {
					const $slider = $(this);
					const $container = $slider.closest('.enhanced-slider-container');

					if (window.innerWidth <= 768) {
						if (!$container.find('.mobile-slider-controls').length) {
							addMobileArrows($slider);
						}
					} else {
						$container.find('.mobile-slider-controls').remove();
					}
				});
			});
		}, 150); // Debounce resize events
	});

})(jQuery);


// Latest tweets sliders.
var animatetweets = function () {
	$('.slick-s').slick({
		dots: false,
		arrows: true,
		vertical: true,
		lazyLoad: 'ondemand'
	});
	$('.fade-slider').slick({
		dots: false,
		arrows: true,
		fade: true,
		lazyLoad: 'ondemand'
	});
}

// RTL Navbar Multi-level Dropdown Handler - moved to global scope
function initializeDropdowns() {
	// Clear any existing event listeners first
	const allDropdownItems = document.querySelectorAll('.dropdown-item');
	allDropdownItems.forEach(item => {
		item.classList.remove('expanded');
		const submenu = item.nextElementSibling;
		if (submenu && submenu.classList.contains('dropdown-submenu')) {
			submenu.style.display = 'none';
		}
	});

	if (window.innerWidth <= 991.98) {
		// Mobile behavior - simple accordion
		const dropdownItems = document.querySelectorAll('.dropdown-item');

		dropdownItems.forEach(item => {
			const submenu = item.nextElementSibling;

			if (submenu && submenu.classList.contains('dropdown-submenu')) {
				// Remove any existing click listeners by cloning
				const newItem = item.cloneNode(true);
				item.parentNode.replaceChild(newItem, item);

				newItem.addEventListener('click', function (e) {
					e.preventDefault();
					e.stopPropagation();

					const currentSubmenu = newItem.nextElementSibling;
					const isExpanded = newItem.classList.contains('expanded');

					// Close ALL other expanded items in the entire dropdown
					const allExpanded = document.querySelectorAll('.dropdown-item.expanded');
					allExpanded.forEach(expandedItem => {
						if (expandedItem !== newItem) {
							expandedItem.classList.remove('expanded');
							const expandedSubmenu = expandedItem.nextElementSibling;
							if (expandedSubmenu && expandedSubmenu.classList.contains('dropdown-submenu')) {
								expandedSubmenu.style.display = 'none';
							}
						}
					});

					// Toggle current item
					if (isExpanded) {
						newItem.classList.remove('expanded');
						currentSubmenu.style.display = 'none';
					} else {
						newItem.classList.add('expanded');
						currentSubmenu.style.display = 'block';
					}
				});
			}
		});
	} else {
		// Desktop behavior - hover menus
		const dropdownMenus = document.querySelectorAll('.dropdown-menu');

		dropdownMenus.forEach(menu => {
			const submenuItems = menu.querySelectorAll('.dropdown-item');

			submenuItems.forEach(item => {
				const submenu = item.nextElementSibling;

				if (submenu && submenu.classList.contains('dropdown-submenu')) {
					let hoverTimeout;

					item.parentElement.addEventListener('mouseenter', function () {
						clearTimeout(hoverTimeout);

						// Use requestAnimationFrame to batch DOM operations
						requestAnimationFrame(() => {
							// Close other open menus first
							const siblings = this.parentElement.querySelectorAll(':scope > li > .dropdown-submenu');
							siblings.forEach(sibling => {
								if (sibling !== submenu && sibling.style.display === 'block') {
									sibling.style.display = 'none';
								}
							});

							// Position the submenu properly
							if (submenu) {
								submenu.style.display = 'block';

								// Batch DOM reads to avoid forced reflow
								const itemRect = this.getBoundingClientRect();
								const menuRect = submenu.getBoundingClientRect();
								const windowHeight = window.innerHeight;
								const windowWidth = window.innerWidth;

								// Set position to be next to the parent item
								submenu.style.position = 'fixed';
								submenu.style.top = `${itemRect.top}px`;
								submenu.style.right = `${windowWidth - itemRect.left}px`;

								// Adjust vertical position if needed
								if (itemRect.top + menuRect.height > windowHeight) {
									const newTop = windowHeight - menuRect.height - 10;
									submenu.style.top = `${Math.max(10, newTop)}px`;
								}
							}
						});
					});

					item.parentElement.addEventListener('mouseleave', function () {
						hoverTimeout = setTimeout(() => {
							submenu.style.display = 'none';
						}, 200);
					});
				}
			});
		});
	}
}

// Set active nav item based on current URL
function setActiveNavItem() {
	const currentPath = window.location.pathname;
	const navLinks = document.querySelectorAll('.navbar-nav .nav-link, .navbar-nav .dropdown-item');

	let hasActiveItem = false;

	// First pass: look for exact matches
	navLinks.forEach(link => {
		link.classList.remove('active');
		link.removeAttribute('aria-current');

		const href = link.getAttribute('href');
		if (href === currentPath ||
			(href === '/index.php' && (currentPath === '/' || currentPath === '/index.php'))) {
			link.classList.add('active');
			link.setAttribute('aria-current', 'page');
			hasActiveItem = true;

			// If it's in a dropdown, mark the parent dropdown too
			const parentDropdown = link.closest('.dropdown');
			if (parentDropdown) {
				const parentLink = parentDropdown.querySelector('.dropdown-toggle');
				if (parentLink) {
					parentLink.classList.add('active');
				}
			}
		}
	});

	// Second pass: if no exact match, look for parent paths
	if (!hasActiveItem) {
		navLinks.forEach(link => {
			const href = link.getAttribute('href');
			if (href !== '#' && href !== '/' && currentPath.startsWith(href) && href.length > 1) {
				link.classList.add('active');

				// If it's in a dropdown, mark the parent dropdown too
				const parentDropdown = link.closest('.dropdown');
				if (parentDropdown) {
					const parentLink = parentDropdown.querySelector('.dropdown-toggle');
					if (parentLink) {
						parentLink.classList.add('active');
					}
				}
			}
		});
	}
}

// Back to top functionality
function initBackToTop() {
	const backToTopButton = document.getElementById('to-top');

	if (backToTopButton) {
		// Show/hide button based on scroll position - show immediately when scrolling down
		window.addEventListener('scroll', function () {
			if (window.pageYOffset > 50) {
				backToTopButton.classList.add('visible');
			} else {
				backToTopButton.classList.remove('visible');
			}
		});

		// Handle click event
		backToTopButton.addEventListener('click', function (e) {
			e.preventDefault();
			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			});
		});
	}
}

// Sticky Navbar functionality with optimized scroll handling
function initStickyNavbar() {
	const navbar = document.querySelector('.navbar');
	const body = document.body;
	let lastScrollTop = 0;
	let navbarHeight = 0;
	let isSticky = false;
	let ticking = false;

	// Cache navbar measurements
	function cacheNavbarMeasurements() {
		navbarHeight = navbar.offsetHeight;
	}

	// Initial measurement
	cacheNavbarMeasurements();

	// Get navbar original position
	const navbarOriginalPosition = navbar.offsetTop;

	// Optimized scroll handler using requestAnimationFrame
	function handleScroll() {
		if (!ticking) {
			requestAnimationFrame(updateNavbar);
			ticking = true;
		}
	}

	function updateNavbar() {
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

		// If scrolled down more than navbar height + 50px buffer
		if (scrollTop > (navbarOriginalPosition + 50)) {
			// Add sticky class if not already added
			if (!isSticky) {
				navbar.classList.add('navbar-sticky');
				body.classList.add('has-sticky-navbar');
				body.style.paddingTop = navbarHeight + 'px';
				isSticky = true;
			}
		} else {
			// Remove sticky class if scrolled back up
			if (isSticky) {
				navbar.classList.remove('navbar-sticky');
				body.classList.remove('has-sticky-navbar');
				body.style.paddingTop = '0';
				isSticky = false;
			}
		}

		lastScrollTop = scrollTop;
		ticking = false;
	}

	// Listen for scroll events with passive option
	window.addEventListener('scroll', handleScroll, { passive: true });

	// Recalculate navbar height on resize with debouncing
	let resizeTimeout;
	window.addEventListener('resize', function () {
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(() => {
			cacheNavbarMeasurements();
			if (isSticky) {
				body.style.paddingTop = navbarHeight + 'px';
			}
		}, 150);
	});
}

document.addEventListener('DOMContentLoaded', function () {
	// Initialize dropdowns on page load
	initializeDropdowns();

	// Set active nav items
	setActiveNavItem();

	// Initialize back to top button
	initBackToTop();

	// Initialize sticky navbar
	initStickyNavbar();

	// Handle window resize - reinitialize dropdown behavior with debouncing
	let dropdownResizeTimeout;
	window.addEventListener('resize', function () {
		clearTimeout(dropdownResizeTimeout);
		dropdownResizeTimeout = setTimeout(() => {
			// Use requestAnimationFrame to batch DOM operations
			requestAnimationFrame(() => {
				// Reset all dropdown states
				const dropdownItems = document.querySelectorAll('.dropdown-item.expanded');
				dropdownItems.forEach(item => {
					item.classList.remove('expanded');
					const submenu = item.nextElementSibling;
					if (submenu && submenu.classList.contains('dropdown-submenu')) {
						submenu.style.display = 'none';
						submenu.style.position = '';
						submenu.style.top = '';
						submenu.style.right = '';
					}
				});

				// Reinitialize dropdowns with new behavior
				initializeDropdowns();
			});
		}, 150); // Debounce resize events
	});
});
