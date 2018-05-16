// Preloader //
$(window).on('load', function () {
    $(".preloader").fadeOut("slow");
 
 });
 
 
 jQuery(function ($) {
 
 
    // Navbar Scroll Function
    var $window = $(window);
    $window.scroll(function () {
       var $scroll = $window.scrollTop();
       var $navbar = $(".navbar");
       if (!$navbar.hasClass("sticky-bottom")) {
          if ($scroll > 200) {
             $navbar.addClass("fixed-menu");
          } else {
             $navbar.removeClass("fixed-menu");
          }
       }
    });
 
    /*bottom menu fix*/
    if ($("nav.navbar").hasClass("sticky-bottom")) {
       var navHeight = $(".sticky-bottom").offset().top;
       $(window).scroll(function () {
          if ($(window).scrollTop() > navHeight) {
             $('.sticky-bottom').addClass('fixed-menu');
          } else {
             $('.sticky-bottom').removeClass('fixed-menu');
          }
       });
    }
 
 
 
    // Click Scroll Function
    $(".scroll").on('click', function (event) {
       event.preventDefault();
       $("html,body").animate({
          scrollTop: $(this.hash).offset().top
       }, 1000);
    });
 
 
    $("body").append("<a href='#' class='back-top'><i class='fa fa-angle-up'></i></a>");
    var amountScrolled = 700;
    var backBtn = $("a.back-top");
    $(window).on("scroll", function () {
       if ($(window).scrollTop() > amountScrolled) {
          backBtn.addClass("back-top-visible");
       } else {
          backBtn.removeClass("back-top-visible");
       }
    });
    backBtn.on("click", function () {
       $("html, body").animate({
          scrollTop: 0
       }, 700);
       return false;
    });
 
 
    // Nav Overlay Function
    (function () {
       var triggerBttn1 = $("#nav-button"),
          overlay1 = document.querySelector("div.overlay"),
          closeBttn1 = overlay1.querySelector("button.overlay-close");
       (transEndEventNames = {
          WebkitTransition: "webkitTransitionEnd",
          MozTransition: "transitionend",
          OTransition: "oTransitionEnd",
          msTransition: "MSTransitionEnd",
          transition: "transitionend"
       }),
       (transEndEventName = transEndEventNames[Modernizr.prefixed("transition")]),
       (support = {
          transitions: Modernizr.csstransitions
       });
       (s = Snap(overlay1.querySelector("svg"))),
       (path = s.select("path")),
       (pathConfig = {
          from: path.attr("d"),
          to: overlay1.getAttribute("data-path-to")
       });
 
       function toggleOverlay1() {
          if (classie.has(overlay1, "open")) {
             classie.remove(overlay1, "open");
             classie.add(overlay1, "close");
 
             var onEndTransitionFn = function (ev) {
                classie.remove(overlay1, "close");
             };
 
             path.animate({
                   path: pathConfig.from
                },
                400,
                mina.linear,
                onEndTransitionFn
             );
          } else if (!classie.has(overlay1, "close")) {
             classie.add(overlay1, "open");
             path.animate({
                path: pathConfig.to
             }, 400, mina.linear);
          }
       }
 
       triggerBttn1.on("click", function () {
          $(this).toggleClass("active");
          toggleOverlay1();
       });
 
       $(".scroll-two").on("click", function (event) {
          event.preventDefault();
          $("html,body").animate({
             scrollTop: $(this.hash).offset().top
          }, 1000);
          toggleOverlay1();
          triggerBttn1.removeClass("active");
       });
    })();
 
    // Pricing Table Hover Function Toggle
    $(".pricing-table-inner").hover(function () {
       if ($window.width() > 768) {
          $(".pricing-table-inner.main").removeClass("active");
          $(this).addClass("active");
       }
    }, function () {
       $(this).removeClass("active");
       $(".pricing-table-inner.main").addClass("active");
    });
 
 
    // Main Page Slider Script + Initializing + Function For its Pagination Made In Swiper Slider
    var mainSLider = new Swiper(".main-slider-section-inner", {
       pagination: { // If we need pagination
          el: '.swiper-pagination',
          type: 'fraction',
       },
       effect: 'fade',
       loop: true,
       runCallbacksOnInit: true,
       navigation: {
          nextEl: '.main-next',
          prevEl: '.main-prev',
       },
       on: {
          'init': function (e) {
             var $this = $(this);
             var element = $this[0].$el;
             var parentObj = $this[0];
             var activeSlide = parseInt(parentObj.slides[parentObj.activeIndex].getAttribute("data-swiper-slide-index"));
             $(element.find('[data-mainTotal="total"]')).text(parentObj.slides.length);
             $(element.find('[data-mainIndex="index"]')).text(parentObj.activeIndex + 1);
             $(element.find('.swiper-slide')).each(function (index) {
                if (!$(this).hasClass("swiper-slide-duplicate")) {
                   var src = $(this).attr("data-image-src");
                   $(".main-slider-preview div").removeClass("active");
                   $(".main-slider-preview").append("<div style=background:url(" + src + ")" + " data-index=" + index + "> </div>");
                }
             });
             $(".main-slider-preview ").find('[data-index="' + (activeSlide + 2) + '"]').addClass("active");
          },
 
          'slideChange': function () {
             var $this = $(this);
             var element = $this[0].$el;
             var parentObj = $this[0];
             var activeSlide = parseInt(parentObj.slides[parentObj.activeIndex].getAttribute("data-swiper-slide-index"));
             var activeSlideJust = parentObj.slides[parentObj.activeIndex];
             $(element.find('[data-mainIndex="index"]')).text($this[0].activeIndex + 1);
             $(".main-slider-preview div").removeClass("active");
             if ((activeSlideJust.className.indexOf("swiper-slide-duplicate") > -1) && activeSlide === 0) {
                $(".main-slider-preview ").find('[data-index="' + (0 + 2) + '"]').addClass("active");
             } else if ((parentObj.slides.length - 2) === (activeSlide + 1)) {
                $(".main-slider-preview ").find('[data-index="' + (1) + '"]').addClass("active");
             } else {
                $(".main-slider-preview ").find('[data-index="' + (activeSlide + 2) + '"]').addClass("active");
             }
          },
       }
    });
    $(".main-slider-preview").on("click",
       function () {
          mainSLider.slideNext();
       });
 
    // Main Slider Video
    new Swiper(".main-slider-section-inner-two", {
       allowTouchMove: false,
    });
 
 
    // Main Slider three
    new Swiper(".main-slider-section-inner-three", {
       pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true
       },
       effect: 'fade',
       autoplay: {
          delay: 3000,
       }
    });
 
    // About Slider
    new Swiper(".about-company-slider", {
       pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true
       },
       effect: 'fade',
       autoplay: {
          delay: 3000,
       },
    });
 
    // Team Slider Single image on left side
    if ($(".team-section").hasClass("team-section-two")) {
       new Swiper(".team-member-slider-2", {
          loop: true,
          navigation: {
             nextEl: '.swiper-button-next',
             prevEl: '.swiper-button-prev',
          },
       });
    }
 
    // Team Member Sliders Includes 2 Slider One For Team Photo And Other For Team Detail
    if ($(".team-section").hasClass("team-section-one")) {
       // 1. Slider Team Photo rotating
       var teammemberslider = new Swiper(".team-member-slider", {
          slidesPerView: 3,
          allowTouchMove: false,
          centeredSlides: true,
          loop: true,
          slideToClickedSlide: true,
          effect: 'coverflow',
          coverflow: {
             rotate: 0,
             stretch: 100,
             depth: 200,
             modifier: 1,
             slideShadows: false
          },
          breakpoints: {
             // when window width is <= 768px
             768: {
                slidesPerView: 1,
                centeredSlides: false,
                effect: "slide",
                allowTouchMove: true,
             }
          }
       });
 
       // 2. Slider Team Detail
       var teammemberanimation = $('.team-member-progress-detail').first();
       teammemberanimation.show();
       teammemberanimation.addClass('animated ' + teammemberanimation.data('animate'));
       var teammembersliderdetail = new Swiper(".team-member-detail-slider", {
          on: {
             slideChangeTransitionStart: function () {
                var $this = $(this);
                var maping = $($this[0].slides[$this[0].activeIndex]).find('[data-slide="animated"]');
                maping.map(function (k, v) {
                   var target = $(v);
                   target.hide();
                   target.removeClass('animated ' + target.data('animate'));
                });
             },
             slideChangeTransitionEnd: function () {
                var $this = $(this);
                var maping = $($this[0].slides[$this[0].activeIndex]).find('[data-slide="animated"]');
                maping.map(function (k, v) {
                   var target = $(v);
                   target.show();
                   target.addClass('animated ' + target.data('animate'));
                });
             }
          },
          allowTouchMove: false,
          loop: true,
          loopSlides: 3,
          slidesPerView: "auto",
          slideToClickedSlide: true,
          breakpoints: {
             768: {
                slidesPerView: 1,
             }
          }
       });
       teammemberslider.controller.control = teammembersliderdetail;
       teammembersliderdetail.controller.control = teammemberslider;
    }
 
 
    // Sponsors Slider
    new Swiper(".sponsors-slider-inner", {
       slidesPerView: "5",
       spaceBetween: 0,
       loop: true,
       autoplay: {
          delay: 1000,
       },
       breakpoints: {
          1200: {
             slidesPerView: 4,
          },
          992: {
             slidesPerView: 3,
          },
          550: {
             slidesPerView: 2,
             spaceBetween: 0,
          },
          480: {
             slidesPerView: 1,
             spaceBetween: 0,
          }
       }
    });
 
    // Blog Listing Image Slider
    new Swiper(".blog-listing-image-slider", {
       pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true
       },
       effect: 'fade',
       autoplay: {
          delay: 3000,
       },
    });
 
 
 
 
    // Main Slider Four Revolution
    if ($("body").hasClass("index-one")) {
       jQuery("#main-slider-four").show().revolution({
          sliderType: "standard",
          jsFileLocation: "//server.local/revslider/wp-content/plugins/revslider/public/assets/js/",
          sliderLayout: "fullscreen",
          dottedOverlay: "none",
          delay: 9000,
          navigation: {
             keyboardNavigation: "off",
             keyboard_direction: "horizontal",
             mouseScrollNavigation: "off",
             mouseScrollReverse: "default",
             onHoverStop: "off",
             arrows: {
                style: "hesperiden",
                enable: true,
                hide_onmobile: false,
                hide_onleave: false,
                tmp: '',
                left: {
                   h_align: "center",
                   v_align: "bottom",
                   h_offset: -20,
                   v_offset: 8
                },
                right: {
                   h_align: "center",
                   v_align: "bottom",
                   h_offset: 20,
                   v_offset: 8
                }
             }
          },
          responsiveLevels: [1240, 1240, 1240, 480],
          visibilityLevels: [1240, 1240, 1240, 480],
          gridwidth: [1200, 1200, 1200, 480],
          gridheight: [800, 800, 800, 700],
          lazyType: "none",
          parallax: {
             type: "mouse+scroll",
             origo: "slidercenter",
             speed: 400,
             speedbg: 0,
             speedls: 0,
             levels: [1, 2, 3, 4, 5, 6, 7, 8, 12, 16, 47, 48, 49, 50, 51, 55]
          },
          shadow: 0,
          spinner: "off",
          stopLoop: "on",
          stopAfterLoops: 0,
          stopAtSlide: 1,
          shuffle: "off",
          autoHeight: "off",
          fullScreenAutoWidth: "off",
          fullScreenAlignForce: "off",
          fullScreenOffsetContainer: "",
          fullScreenOffset: "",
          disableProgressBar: "on",
          hideThumbsOnMobile: "off",
          hideSliderAtLimit: 0,
          hideCaptionAtLimit: 0,
          hideAllCaptionAtLilmit: 0,
          debugMode: false,
          fallbacks: {
             simplifyAll: "off",
             nextSlideOnWindowFocus: "off",
             disableFocusListener: false
          }
       });
       var ua = window.navigator.userAgent;
       var msie = ua.indexOf("MSIE ");
       if (
          msie > 0 ||
          !!navigator.userAgent.match(/Trident.*rv\:11\./) ||
          ("CSS" in window &&
             "supports" in window.CSS &&
             !window.CSS.supports("mix-blend-mode", "screen"))
       ) {
          var bgColor = "rgba(245, 245, 245, 0.5)";
          //jQuery('.rev_slider .tp-caption[data-blendmode]').removeAttr('data-blendmode').css('background', bgColor);
          jQuery(
             ".rev_slider .tp-caption.tp-blendvideo[data-blendmode]"
          ).remove();
       }
 
       // BEFORE/AFTER INITIALISATION
       RevSliderBeforeAfter(jQuery, jQuery("#main-slider-four"), {
          arrowStyles: {
             leftIcon: "fas fa-caret-left",
             rightIcon: "fas fa-caret-right",
             topIcon: "fas fa-caret-up",
             bottomIcon: "fas fa-caret-bottom",
             size: "35",
             color: "#ffffff",
             bgColor: "transparent",
             spacing: "10",
             padding: "0",
             borderRadius: "0"
          },
          dividerStyles: {
             width: "1",
             color: "rgba(255, 255, 255, 0.5)"
          },
          onClick: {
             time: "500",
             easing: "Power2.easeOut"
          },
          cursor: "move",
          carousel: false
       });
    }
 
 
    // Number Counter Which Will Run On Appearing On The Screen
    $(".company-stats-section").appear(function () {
       $('.stats-number-inner span').each(function () {
          $(this).prop('Counter', 0).animate({
             Counter: $(this).text()
          }, {
             duration: 3000,
             easing: 'swing',
             step: function (now) {
                $(this).text(Math.ceil(now));
             }
          });
       });
    });
 
 
    // Cube Portfolio Initializing
    $('#js-grid-mosaic').cubeportfolio({
          filters: '#js-filters-mosaic',
          layoutMode: 'grid',
          sortByDimension: true,
          mediaQueries: [{
             width: 1500,
             cols: 2,
         }, {
             width: 1100,
             cols: 2,
         }, {
             width: 768,
             cols: 1,
         }, {
             width: 480,
             cols: 1,
             options: {
                gapHorizontal: 60
             }
         }],
          defaultFilter: '*',
          animationType: 'fadeIn',
          gapHorizontal: 120,
          gapVertical: 150,
          gridAdjustment: 'responsive',
          caption: 'zoom',
          displayType: 'sequentially',
          displayTypeSpeed: 100,
 
          // lightbox
          lightboxDelegate: '.cbp-lightbox',
          lightboxGallery: true,
          lightboxTitleSrc: 'data-title',
          lightboxCounter: '<div class="cbp-popup-lightbox-counter">{{current}} of {{total}}</div>',
 
          plugins: {
             loadMore: {
                element: "#js-loadMore-lightbox-gallery",
                action: "click",
                loadItems: 5,
             }
          }
 
       })
       .on('initComplete.cbp', function () {
          // your functionality
          var $this = $(this);
          if ($(".cbp-filter-item-active").attr("data-filter") === "*") {
             $("#js-loadMore-lightbox-gallery").addClass("active");
          } else {
             $("#js-loadMore-lightbox-gallery").removeClass("active");
          }
          $this.find(".cbp-wrapper").find(".cbp-item:not(.cbp-item-off)").each(function (index) {
             $(this).removeClass("even");
 
             console.log()
             var val = index + 1;
             if ($(this).css('left') !== "0px") {
                $(this).addClass("even");
 
             }
          });
       })
       .on('onAfterLoadMore.cbp', function () {
          // your functionality
          var $this = $(this);
          $("#js-loadMore-lightbox-gallery a").addClass("d-none");
          $("#js-loadMore-lightbox-gallery").addClass("active-outer");
          $this.find(".cbp-wrapper").find(".cbp-item:not(.cbp-item-off)").each(function (index) {
             $(this).removeClass("even");
             console.log()
             var val = index + 1;
             if ($(this).css('left') !== "0px") {
                $(this).addClass("even");
             }
          });
       })
       .on('filterComplete.cbp', function () {
          // your functionality
          var $this = $(this);
          if ($(".cbp-filter-item-active").attr("data-filter") === "*") {
             $("#js-loadMore-lightbox-gallery").addClass("active");
             $("#js-loadMore-lightbox-gallery").removeClass("d-none");
          } else {
             $("#js-loadMore-lightbox-gallery").removeClass("active");
             $("#js-loadMore-lightbox-gallery").addClass("d-none");
          }
          $this.find(".cbp-wrapper").find(".cbp-item:not(.cbp-item-off)").each(function (index) {
             $(this).removeClass("even");
             var val = index + 1;
             if ($(this).css('left') !== "0px") {
                $(this).addClass("even");
             }
          });
       });
 
 
 
 });