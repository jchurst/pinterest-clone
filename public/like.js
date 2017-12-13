(function($) {
	'use strict';
	var socket = io();
	$('body').on('click', '.like', like);
	socket.on('like', onLike);
	socket.on('unlike', onUnlike);
	socket.on('exception', onSocketError);

	function like() {
		var data = $(this).data();
		socket.emit('like', {
			pinId: data.pinid,
			userId: data.userid
		});
	}

	function onSocketError(err) {
		alert(err.message);
	}

	function onLike(data) {
		var $pin = $('[data-pinid="' + data.pinId + '"]');
		$pin.addClass('btn-default').removeClass('btn-danger');
		$pin.find('.like-count').text(data.total).hide().fadeIn();
		$pin.find('.fa').removeClass('fa-thumbs-up').addClass('fa-thumbs-o-up').hide().fadeIn();
	}

	function onUnlike(data) {
		var $pin = $('[data-pinid="' + data.pinId + '"]');
		$pin.addClass('btn-default').removeClass('btn-danger');
		$pin.find('.like-count').text(data.total).hide().fadeIn();
		$pin.find('.fa').removeClass('fa-thumbs-o-up').addClass('fa-thumbs-up').hide().fadeIn();
	}
})(jQuery);