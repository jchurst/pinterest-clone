const Pin = require('../models/pin');
module.exports = (io, socket) => {
	/* LIKE */
	socket.on('like', (data) => {
		const {
			pinId,
			userId
		} = data;
		Pin.findById(pinId, (err, pin) => {
			if (err) throw err;
			if (pin) {
				const updateObject = {
					likes: userId
				};
				const exists = pin.likes.find(item => item === userId);
				/* IF NEVER LIKED */
				if (!exists) {
					pin.update({
						$push: updateObject
					}, (err, result) => {
						if (err) throw err;
						io.sockets.emit('like', {
							pinId,
							total: pin.likes.length + 1
						});
					});
				} else {
					/* IF ALREADY LIKED, UNLIKE */
					pin.update({
						$pull: updateObject
					}, (err, result) => {
						if (err) throw err;
						io.sockets.emit('unlike', {
							pinId,
							total: pin.likes.length - 1
						});
					});
				}
			}
		});
	});
};