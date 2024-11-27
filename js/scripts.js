"use strict"; // start of use strict


$(document).ready(function () {
    $(window).trigger("resize");
    backgroundImg_init();
    top_panel_search_init();
    sticky_set();
    init_classic_menu();
    heightFull_init();
    toggle_init();
    lightbox_init();
    masonry_init();
    scroll_top_init();
    pageSliders_init();
    widgetMenu_init();
    revolution_slider();
    cws_touch_events_fix ();
});
 

$(window).load(function(){
    init_classic_menu_resize();
    progress_bar_loader();
    pageSliders_init();
});


$(window).resize(function(){
    init_classic_menu_resize();
    heightFull_init();
    pageSliders_init();
    masonry_init();
    sticky_set();
});


$(window).scroll(function(){
	progress_bar_loader ();
});


//$(window).on('load', function() {
//	$("body").imagesLoaded(function(){
//		$(".preloader-wave").fadeOut();
//		$("#preloader").delay(200).fadeOut("slow").remove();
//	});
//});


function cws_touch_events_fix (){
    if ( is_mobile_device() ){
        jQuery( ".container" ).on( "mouseenter", ".hover-effect, .product .pic", function (e){
            e.preventDefault();
            jQuery( this ).trigger( "hover" );
        });
        jQuery( ".main-nav" ).on( "hover", ".mobile_nav .button_open, .mobile_nav li > a", function ( e ){
            e.preventDefault();
            jQuery( this ).trigger( "click" );
        });
    }
}

// Background image
function backgroundImg_init(){
    var pageSection = $(".home-section, .page-section, .small-section, .blog-section, .small-section-2, .breadcrumb-section");
    pageSection.each(function(indx){
        if ($(this).attr("data-background")){
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
        }
    });
}


// Function for block height 100%
function height_line(height_object, height_donor){
    height_object.height(height_donor.height());
    height_object.css({
        "line-height": height_donor.height() + "px"
    });
}


// Top panel search
function top_panel_search_init(){ 
	$(".main-nav .search-menu").on('click', function(){ 
		$(this).parents('.main-nav').find('.search-menu-cont').fadeToggle(200); 
		$(this).parents('.main-nav').addClass('search-on'); 
		$(this).parents('.main-nav').find('.search-menu-cont .search-field').focus(); 
	}) 
	$('.main-nav .search-menu-cont .search-back-button').on('click', function(){ 
		$(this).parents('.main-nav').find('.search-menu-cont').fadeToggle(200); 
		$(this).parents('.main-nav').removeClass('search-on'); 
	}) 
}

// Classic menu resize
var mobile_nav = $(".mobile-nav");
var desktop_nav = $(".desktop-nav");
function init_classic_menu_resize(){
    $(".mobile-on .desktop-nav > ul").css("max-height", $(window).height() - $(".main-nav").height() - 20 + "px");
    if ($(window).width() <= 1024) {
        $(".main-nav").addClass("mobile-on");
    } else 
        if ($(window).width() > 1024) {
            $(".main-nav").removeClass("mobile-on");
            desktop_nav.show();
        }
}
 

// Sticky function
function sticky_set () {
    if(is_mobile_device ()) {
        $(".js-stick").unstick();
        $(".main-nav").removeClass('small-height');
    } else if (!($('.sticky-wrapper').length)) {
        $(".js-stick").sticky({
            topSpacing: 0
        });
    }
}


// Classic menu
function init_classic_menu(){

    // Navbar sticky 
    height_line($(".inner-nav > ul > li > a"), $(".main-nav"));
    height_line(mobile_nav, $(".main-nav"));   
    mobile_nav.css({
        "width": $(".main-nav").height() + "px"
    });

    // Transpaner menu
    if ($(".main-nav").hasClass("transparent")){
       $(".main-nav").addClass("js-transparent"); 
    }       
    $(window).scroll(function(){        
        if ($('.sticky-header').hasClass('top-fixed')) {
            if ($(window).scrollTop() > 10) {
                $(".js-transparent").removeClass("transparent");
                $(".main-nav, .nav-logo-wrap .logo, .mobile-nav, .search-back-button").addClass("small-height");
            }
            else {
                $(".js-transparent").addClass("transparent");
                $(".main-nav, .nav-logo-wrap .logo, .mobile-nav, .search-back-button").removeClass("small-height");
            }
        };
    });

    // Mobile menu toggle
    mobile_nav.on('click', function(){
        if (desktop_nav.hasClass("js-opened")) {
            desktop_nav.slideUp("slow", "easeOutExpo").removeClass("js-opened");
            $(this).removeClass("active");
        } else {
            desktop_nav.slideDown("slow", "easeOutQuart").addClass("js-opened");
            $(this).addClass("active");  
        }
    });
    desktop_nav.find("a:not(.nav-submenu)").on('click', function(){
        if (mobile_nav.hasClass("active")) {
            desktop_nav.slideUp("slow", "easeOutExpo").removeClass("js-opened");
            mobile_nav.removeClass("active");
        }
    });
    var navSubmenu = $(".nav-submenu");
    var navThisLi;
    navSubmenu.on('click', function(){
        if ($(".main-nav").hasClass("mobile-on")) {
            navThisLi = $(this).parent("li:first");
            if (navThisLi.hasClass("js-opened")) {
                navThisLi.find(".submenu:first").slideUp(function(){
                    navThisLi.removeClass("js-opened");
                });
            } else {
                navThisLi.addClass("js-opened");
                navThisLi.find(".submenu:first").slideDown();
            }
            return false;
        }
    });
    navThisLi = navSubmenu.parent("li");
    navThisLi.hover(function(){
        if (!($(".main-nav").hasClass("mobile-on"))) {
        
            $(this).find(".submenu:first").stop(true, true).fadeIn("fast");
        }
    }, function(){
        if (!($(".main-nav").hasClass("mobile-on"))) {
            $(this).find(".submenu:first").stop(true, true).delay(100).fadeOut("fast");
        }
    });
}



// Mobile device detect 
function is_mobile_device () {
  if ( ( $(window).width()<767) || (navigator.userAgent.match(/(Android|iPhone|iPod|iPad)/) ) ) {
    return true;
  } else {
    return false;
  }
}


// Height full
function heightFull_init(){
    $(".height-full").height($(window).height());
}


// Toggle
function toggle_init(){
    if ($(".toggle > dt > a").hasClass("active")) {
        $(this).parent().next().css({display: "block"}).slideDown("easeOutExpo");
    };
    $(".toggle > dt > a").on('click', function(){
        if ($(this).hasClass("active")) {
            $(this).parent().next().slideUp("easeOutExpo");
            $(this).removeClass("active");
        }
        else {
            var current = $(this).parent().next("dd");
            $(this).addClass("active");
            $(this).parent().next().slideDown("easeOutExpo");
        }
        return false;
    });
};




// Lightbox
function lightbox_init(){
    $(".lightbox").magnificPopup({
        gallery: {
            enabled: true
        }
    });
    $(".lightbox-single").magnificPopup({
        type: 'image'
    });
}


// Masonry
function masonry_init(){
    $(".masonry").imagesLoaded(function(){
        $(".masonry").masonry();
    });
}


// Progress bar
function progress_bar_loader(){
	$('.skill-bar-progress').each(function(){
		var el = this;
		if (is_visible(el)){
			if ($(el).attr("processed")!="true"){
				$(el).css("width","0%");
				$(el).attr("processed","true");
				var val = parseInt($(el).attr("data-value"), 10);
				var fill = 0;
				var speed = val/100; 
				var timer = setInterval(function (){
					if (fill<val){
						fill += 1;
						$(el).css("width",String(fill)+"%");
						var ind = $(el).parent().parent().find(".skill-bar-perc");
						$(ind).text(fill+"%");
					}
				},(10/speed));      
			}
		}
	});
}


// Visible function
function is_visible (el){
	var w_h = $(window).height();
	var dif = $(el).offset().top - $(window).scrollTop();
	if ((dif > 0) && (dif<w_h)){
		return true;
	} else {
		return false;
	}
}


// Scroll top function
function scroll_top_init(){
    $('#scroll-top').on( 'click', function() {
        $('html, body').animate({scrollTop: 0});
        return false;
    });
    if( $(window).scrollTop() > 500 ) {
        $('#scroll-top').fadeIn();
    } else {
        $('#scroll-top').fadeOut();
    } 
    $(window).scroll(function(){
        if( $(window).scrollTop() > 500 ) {
            $('#scroll-top').fadeIn();
        } else {
            $('#scroll-top').fadeOut();
        } 
    })
}


// Wrap this
$.fn.WrapThis = function(arg1, arg2) { /*=Takes 2 arguments, arg1 is how many elements to wrap together, arg2 is the element to wrap*/

  var wrapClass = "column"; //=Set class name for wrapping element

  var itemLength = $(this).find(arg2).length; //=Get the total length of elements
  var remainder = itemLength%arg1; //=Calculate the remainder for the last array
  var lastArray = itemLength - remainder; //=Calculate where the last array should begin

  var arr = [];

  if($.isNumeric(arg1)) {
    $(this).find(arg2).each(function(idx, item) {
      var newNum = idx + 1;

      if(newNum%arg1 !== 0 && newNum <= lastArray){
          arr.push(item);
      }
      else if(newNum%arg1 == 0 && newNum <= lastArray) {
          arr.push(item);
          var column = $(this).pushStack(arr);
          column.wrapAll('<div class="' + wrapClass + '"/>'); //=If the array reaches arg1 setting then wrap the array in a column
          arr = [];
      }
      else if(newNum > lastArray && newNum !== itemLength){ //=If newNum is greater than the lastArray setting then start new array of elements
          arr.push(item);
      }
      else { //=If newNum is greater than the length of all the elements then wrap the remainder of elements in a column
          arr.push(item);
          var column = $(this).pushStack(arr);
          column.wrapAll('<div class="' + wrapClass + '"/>');
          arr = []
      }
    });
  }
}


// Page sliders
function pageSliders_init(){
    $(".slider-1").owlCarousel({
        items: 3,
        itemsDesktop: [1199, 2],
        itemsTablet: [998, 2],
        itemsTabletSmall: [768, 1],
        itemsMobile: [480, 1],
        stopOnHover: true,
        navigation: false,
        navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
    }); 

    $(".slider-2").owlCarousel({
        singleItem: true,
        navigation: true,
        navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
    });

    $(".slider-3").owlCarousel({
        items: 4,
        itemsDesktop: [1199, 3],
        itemsTabletSmall: [768, 2],
        itemsMobile: [480, 1],
        navigation: false,
        navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
    });

    $(".slider-4").owlCarousel({
        items: 5,
        itemsDesktop: [1700, 5],
        itemsDesktopSmall: [1199, 3],
        itemsTabletSmall: [768, 2],
        itemsMobile: [480, 1],
        navigation: false,
        navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
    });

    $(".widget-slider-1").owlCarousel({
        items: 3,
        itemsDesktop: [1199, 3],
        itemsTabletSmall: [768, 3],
        itemsMobile: [480, 1],
        navigation: true,
        navigationText: ["<i class='flaticon-arrows-1'></i>", "<i class='flaticon-arrows-2'></i>"]
    });

    $(".widget-slider-2").owlCarousel({
        singleItem: true,
        navigation: true,
        navigationText: ["<i class='flaticon-arrows-1'></i>", "<i class='flaticon-arrows-2'></i>"]
    });
    $(".widget-slider-twitt").owlCarousel({
        singleItem: true,
        navigation: true,
        navigationText: ["<i class='flaticon-arrows-1'></i>", "<i class='flaticon-arrows-2'></i>"]
    });    
}


// Menu widget
function widgetMenu_init(){
    $('.widget-navigation li>ul').parent().addClass('has-child');
    $('.widget-navigation li>a').on( 'click', function(e) {
        e.stopPropagation();
    })
    $('.widget-navigation li>a').on( 'click', function(e) {
        e.stopPropagation();
        if( $(this).parent().children('ul').length ) {
            $(this).parent().children('ul').slideToggle(500);   
            $(this).parent().toggleClass('active');
            $(this).parent().children('ul').toggleClass('active');
        } 
    });
}


// Revolution slider
function revolution_slider () {
  $('.tp-banner-slider').on("revolution.slide.onloaded",function (e) {
    $('.tp-banner-slider').css("opacity","1");
  });
  if ( jQuery('.tp-banner-slider').length ) {
    jQuery('.tp-banner-slider').revolution({
      responsiveLevels:[4096,992,768,480],
      dottedOverlay:"custom",
      delay:9000,
      startwidth:1170,
      startheight:800,
      hideThumbs:10,
      navigation: {
          arrows:{enable:true}        
      },
      fullWidth:"on",
      fullScreen:"off",
      forceFullWidth:"on",
      hideThumbsOnMobile:"off",
      hideNavDelayOnMobile:1500,            
      hideBulletsOnMobile:"off",
      hideArrowsOnMobile:"off",
      hideThumbsUnderResolution:0,
      navigationType:"none"
    });
  }
}











