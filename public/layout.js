(function($) {
	'use strict';
	var $grid = $('.grid').masonry({
		itemSelector: '.grid-item',
		columnWidth: '.grid-sizer',
		percentPosition: true
	});
	$grid.imagesLoaded().progress(function() {
		$grid.masonry('layout');
	});
	$('.grid img').on('error', function() {
		this.src = 'http://www.hurstcreative.com/stuff/fcc/pinterest-clone/error.jpg';
	});
})(jQuery);