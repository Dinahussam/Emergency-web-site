(function($) {
    "use strict";
	
	/* ..............................................
	Loader 
    ................................................. */
	
	$(window).on('load', function() { 
		$('.preloader').fadeOut(); 
		$('#preloader').delay(550).fadeOut('slow'); 
		$('body').delay(450).css({'overflow':'visible'});
	});
    	
	/* ..............................................
    Navbar Bar
    ................................................. */
	
	$('.navbar-nav .nav-link').on('click', function() {
		var toggle = $('.navbar-toggler').is(':visible');
		if (toggle) {
			$('.navbar-collapse').collapse('hide');
		}
	});
	
	/* ..............................................
    Fixed Menu
    ................................................. */
    
	$(window).on('scroll', function () {
		if ($(window).scrollTop() > 50) {
			$('.top-header').addClass('fixed-menu');
		} else {
			$('.top-header').removeClass('fixed-menu');
		}
	});

	/* ..............................................
    Properties Filter
    ................................................. */
	var Container = $('.container');
	Container.imagesLoaded(function () {
		var portfolio = $('.properties-menu');
		portfolio.on('click', 'button', function () {
			$(this).addClass('active').siblings().removeClass('active');
			var filterValue = $(this).attr('data-filter');
			$grid.isotope({
				filter: filterValue
			});
		});
		var $grid = $('.properties-list').isotope({
			itemSelector: '.properties-grid'
		});

	});

	/* ..............................................
    Gallery
    ................................................. */
	
	$(document).ready(function() {
		$('.popup-gallery').magnificPopup({
			delegate: 'a',
			type: 'image',
			tLoading: 'Loading image #%curr%...',
			mainClass: 'mfp-img-mobile',
			gallery: {
				enabled: true,
				navigateByImgClick: true,
				preload: [0,1] // Will preload 0 - before current, and 1 after the current image
			},
			image: {
				tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
				titleSrc: function(item) {
					return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
				}
			}
		});
	});
	
	/* ..............................................
    Gallery
    ................................................. */
	
	$(document).ready(function() {
		$('.owl-carousel').owlCarousel({
			loop: true,
			margin: 10,
			dots: false,
			//autoplay: true,
            //autoplayTimeout: 3000,
            //autoplayHoverPause: true,
			responsiveClass: true,
			responsive: {
			  0: {
				items: 1,
				nav: true
			  },
			  600: {
				items: 3,
				nav: false
			  },
			  1000: {
				items: 4,
				nav: true,
				loop: false,
				margin: 15
			  }
			}
		})
	})
	
	
	/* ..............................................
    Scroll To Top
    ................................................. */
	
	$(document).ready(function () {

		$(window).scroll(function () {
			if ($(this).scrollTop() > 100) {
				$('#scroll-to-top').fadeIn();
			} else {
				$('#scroll-to-top').fadeOut();
			}
		});

		$('#scroll-to-top').click(function () {
			$("html, body").animate({
				scrollTop: 0
			}, 600);
			return false;
		});

	});
	
	
	/* ..............................................
    Smooth Scroll
    ................................................. */
	
	$('a[href*="#"]:not([href="#"])').on('click', function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') || location.hostname == this.hostname) {
		  var target = $(this.hash);
			  target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			  if (target.length) {
				$('html,body').animate({
				  scrollTop: target.offset().top - 65,
				  }, 1000);
				  return false;
			  }
		}
	});

	
}(jQuery));