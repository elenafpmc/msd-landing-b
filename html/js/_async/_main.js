/*	----------------------------------------------------------------------------------------------------
	 JS ADN global para todo el proyecto de carga asíncrona
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
		mousewheel: {
			forceToAxis: false,
			sensitivity: 1,
			releaseOnEdges: false,
			invert: true
		},
		pagination: {
	    el: '.b_fullpage__pagination',
	    type: 'bullets',
			clickable: true,
			bulletClass: 'b_fullpage__pagination__bullet',
			bulletActiveClass: 'b_fullpage__pagination__bullet--active',
			renderBullet: function (index, className) {
				var slide = $('.b_fullpage__slide').eq(index);
		    return '<span class="' + className + '">' + slide.data('pagination') + '</span>';
		  }
	  }
	});

	$('.b_fullpage__scroll-down').on('click', function(){
		fullpage.slideNext();
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
