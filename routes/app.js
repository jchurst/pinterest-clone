const express = require('express');
const router = express.Router();
const isLoggedIn = require('../util').isLoggedIn;
const Pin = require('../models/pin');
/* ALL PINS */
router.get('/', (req, res) => {
	Pin.find({}).populate('_user').exec((err, pins) => {
		if (err) throw err;
		if (req.user) {
			pins = pins.map(item => {
				item.iLike = item.likes.indexOf(req.user._id.toString()) !== -1;
				return item;
			});
		}
		res.render('index.html', {
			pins
		});
	});
});
/* SINGLE USER */
router.get('/pins/:userId', (req, res) => {
	Pin.find({
		_user: req.params.userId
	}).populate('_user').exec((err, pins) => {
		if (err) throw err;
		const isMine = req.user && req.user._id.toString() === req.params.userId;
		const owner = pins.length ? pins[0]._user.twitter.username : 'unknown';
		if (req.user && !isMine) {
			pins = pins.map(item => {
				item.iLike = item.likes.indexOf(req.user._id.toString()) !== -1;
				return item;
			});
		}
		res.render('pins.html', {
			pins,
			isMine,
			owner
		});
	});
});
/* UPLOAD */
router.get('/pin/:pinId', (req, res) => res.render('pin.html'));
router.post('/pin/add', isLoggedIn, (req, res) => {
	const newPin = new Pin({
		_user: req.user._id,
		url: req.body.url,
		caption: req.body.caption
	});
	newPin.save(err => {
		if (err) throw err;
		res.redirect('/pins/' + req.user._id);
	});
});
router.get('/pin/remove/:pinId', isLoggedIn, (req, res) => {
	Pin.findByIdAndRemove(req.params.pinId, (err, result) => {
		if (err) throw err;
		res.redirect('/pins/' + req.user._id);
	});
});
module.exports = router;