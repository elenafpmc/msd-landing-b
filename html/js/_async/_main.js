/*	----------------------------------------------------------------------------------------------------
	 JS global para todo el proyecto de carga asíncrona
------------------------------------------------------------------------------------------------------ */

/*	--------------------------------------------------
	Declaración de funciones
-------------------------------------------------- */
windowWidth = window.innerWidth;
//Si hacemos una llamada AJAX lanzaremos esta función para recargar los plugins
function initAsync(){


	//Validaciones formularios
//	$("input,select,textarea").not("[type=submit]").jqBootstrapValidation(
//		{
//			filter: function () {
//				return $(this).is(":visible");
//			}
//		}
//	);


}

$(window).on('load', function(){

})


svg4everybody();


/*	--------------------------------------------------
	Lógica de scripts
-------------------------------------------------- */
$(function() {

	var fullpage = new Swiper('.b_fullpage', {
	    speed: 400,
	    direction: 'horizontal',
		slideActiveClass: 'b_fullpage__slide--active',
			// mousewheel: {
			// 	forceToAxis: false,
			// 	sensitivity: 1,
			// 	releaseOnEdges: false,
			// 	invert: true
			// },
		pagination: {
		    el: '.b_fullpage__pagination',
		    type: 'bullets',
				clickable: true,
				bulletClass: 'b_fullpage__pagination__bullet',
				bulletActiveClass: 'b_fullpage__pagination__bullet--active',
				renderBullet: function (index, className) {
					var slide = $('.b_fullpage__slide').eq(index);
			    return '<span class="' + className + '"><span>' + slide.data('pagination') + '</span></span>';
			  }
	  	},
	  	on: {
	  		slideChange: function() {
	  			var slides = this.slides;
	  			var activeIndex = this.activeIndex;
	  			if ( $(slides[activeIndex]).is('.contacto') ) {
	  				$('.b_fullpage__scroll-down').hide();
	  				$('.b_fullpage__scroll-up').show();
	  			} else {
	  				$('.b_fullpage__scroll-down').show();
	  				$('.b_fullpage__scroll-up').hide();
	  			}
	  		}
	  	}
	});

	var scrollCount = 0;
	var wheelIndicator = new WheelIndicator({
	  "elem": document.querySelector('.b_fullpage'),
	  "callback": function(e){
	    //console.log(e.direction); // "up" or "down"
			if (e.direction === "up" && scrollCount === 0){
				if ( !$('.b_fullpage').is('.video-overlay-open') ) {
					fullpage.slideNext();
				}
			}
			else if (e.direction === "down" && scrollCount === 0){
				if ( !$('.b_fullpage').is('.video-overlay-open') ) {
					fullpage.slidePrev();
				}
			}
			if (scrollCount === 0){
				scrollCount = 1;
				setTimeout(function (){ scrollCount = 0; }, 750);
			}
	  }
	});

	/*	--------------------------------------------------
		Al hacer click en el scroll-down, avanzamos un slide
	-------------------------------------------------- */
	$('.b_fullpage__scroll-down').on('click', function(){
		if ( !$('.b_fullpage').is('.video-overlay-open') ) {
			fullpage.slideNext();
		}
	});
	$('.b_fullpage__scroll-up').on('click', function(){
		if ( !$('.b_fullpage').is('.video-overlay-open') ) {
			fullpage.slidePrev();
		}
	});

	/*	--------------------------------------------------
		Al hacer click en el logo, vuelve al inicio
	-------------------------------------------------- */
	$('.b_header__logo').on('click', function() {
		fullpage.slideTo(0);
	});

	var video_player_interval;
	$('.b_special__content__play').on('click', function(){
		$('.b_fullpage').addClass('video-overlay-open playing-video');
		$('.b_header').fadeOut(300);
		var video = $(this).closest('.b_fullpage__slide').find('.b_special__video video')[0];
		video.play();
		video_player_interval = setInterval(function(){
			var total = video.duration;
			var partial = video.currentTime;
			$('.b_special__video__controls__progress').css('width', (partial/total)*100+'%');
		}, 100);
		fullpage.allowSlidePrev = false;
		fullpage.allowSlideNext = false;
		fullpage.allowTouchMove = false;
		fullpage.update();
	});

	$('.b_special__video__close').on('click', function(){
		$('.b_fullpage').removeClass('video-overlay-open playing-video');
		$('.b_header').fadeIn(300);
		clearInterval(video_player_interval);
		var video = $(this).closest('.b_fullpage__slide').find('.b_special__video video')[0];
		video.currentTime = 0;
		video.pause();
		$('.b_special__video__controls__progress').css('width', '0%');
		fullpage.allowSlidePrev = true;
		fullpage.allowSlideNext = true;
		fullpage.allowTouchMove = true;
		fullpage.update();
	});

	$('.b_special__video__controls__back').on('click', function(){
		var video = $(this).closest('.b_fullpage__slide').find('.b_special__video video')[0];
		video.currentTime = video.currentTime - 5;
	});

	$('.b_special__video__controls__forward').on('click', function(){
		var video = $(this).closest('.b_fullpage__slide').find('.b_special__video video')[0];
		video.currentTime = video.currentTime + 5;
	});

	$('.b_special__video__controls__play').on('click', function(){
		$('.b_fullpage').addClass('playing-video');
		var video = $(this).closest('.b_fullpage__slide').find('.b_special__video video')[0];
		video.play();
	});

	$('.b_special__video__controls__pause').on('click', function(){
		$('.b_fullpage').removeClass('playing-video');
		var video = $(this).closest('.b_fullpage__slide').find('.b_special__video video')[0];
		video.pause();
	});

	if( $('.b_special__covervideo').length ){
		covervid();
	}

	$(window).on('resize', function(){
		covervid();
	});

	function covervid(){
		var width = $(window).width();
		var height = $(window).height();
		var covervideo = $('.b_special__covervideo');
		covervideo.coverVid(width, height);
	}

	$(document).on('mousemove', function(ev){
		if($(window).width() >= 991){
			var lines = $('.b_fullpage__slide--active .b_special__line--desktop');
			var cursorX = ev.pageX;
			var refX = $(window).width() / 2;
			var rangeX = $(window).width() * 0.05; //in px;
			var factors = [1, 0.75, -1];

			if (lines.length){
				if (cursorX <= refX){
					var moveX = ((refX - cursorX) / refX) * rangeX;
				}
				else{
					var moveX = -1 * ((cursorX - refX) / refX) * rangeX;
				}
				lines.css({
					'transition': 'margin 1s ease-out 0s',
				});
				lines.filter('.b_special__line--top').css({
					'margin-left': (moveX * factors[0])+'px',
				});
				lines.filter('.b_special__line--middle').css({
					'margin-left': (moveX * factors[1])+'px',
				});
				lines.filter('.b_special__line--bottom').css({
					'margin-left': (moveX * factors[2])+'px',
				});
			}
		}
	});


	/*	--------------------------------------------------
		Recalculamos alturas cuando se ejecute el lazysizes
	-------------------------------------------------- */

	document.addEventListener('lazybeforeunveil', function(e){

	    sameHeight();

	});


	/*	--------------------------------------------------
		Mostrar una capa
	-------------------------------------------------- */
	$('[data-show]').on('click', function(e){
		var layerToShow = $(this).attr('data-show');
		$(layerToShow).removeClass('hidden');

	// Vamos hasta la capa, esperamos un poco para que esté visible
	setTimeout(function(){

		var moveToOffset = $(layerToShow).offset().top - 80;
		$("html, body").animate({scrollTop: moveToOffset, useTranslate3d:true }, 700);
		sameHeight();

	}, 700);

	});
	/*	--------------------------------------------------
		Ocultar una capa
	-------------------------------------------------- */
	$('[data-hide]').on('click', function(e){
		var layerToHide = $(this).attr('data-hide');
		$(layerToHide).addClass('hidden');
	});


	/*	--------------------------------------------------
		Video players
	-------------------------------------------------- */
	$('.card-video__button').click(function(){

		videoPlayer = $('.card-video-full__player video').attr('id');

		$('.card-video-full__poster').hide();
		$('.card-video-full__player').show();

		document.getElementById(videoPlayer).play();

	});

	// $('.hero-video__button').click(function(){

	// 	videoPlayer = $('.hero-video__player video').attr('id');

	// 	$('.hero-video__poster').hide();
	// 	$('.hero-video__player').show();

	// 	$('.hero-video').css('background','black');
	// 	$('.hero-video').attr('data-background','');
	// 	$('.hero-video').attr('data-background-2x','');

	// 	document.getElementById(videoPlayer).play();

	// });


	if( windowWidth >= smBreak ) {

		$('.dropdown').hover(function() {
			$(this).addClass('open');
			$(this).closest('header').addClass('solid-bg');
		}, function() {
			$(this).removeClass('open');
			$(this).closest('header').removeClass('solid-bg');
		});
	}


	/*	--------------------------------------------------
		Calculo altura del menu mobile
	-------------------------------------------------- */

	maxHeight = $(window).height() - $('.off-canvas__head').outerHeight() - $('.bottom-off-canvas').outerHeight() - 20;

	$('.js-height-menu').css('height', maxHeight);




	/*	--------------------------------------------------
		Llamada de funciones
	-------------------------------------------------- */
	initAsync();



	/*	--------------------------------------------------
		Llamada de funciones en resize
	-------------------------------------------------- */
	$( window ).on('resize', function() {



	});


	/*	--------------------------------------------------
		Llamada de funciones al abrir modales
	-------------------------------------------------- */

	$('#modal-suscription').on('hide.bs.modal', function () {
	 	insertBG();
	 	sameHeight();

	});

});
