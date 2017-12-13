const express = require('express');
const router = express.Router();
/* 404 */
router.use((req, res, next) => {
	res.status(404);
	/* HTML RESPONSE */
	if (req.accepts('html')) {
		return res.render('error', {
			title: '404 Page Not Found',
			error: {
				status: 404,
				title: 'Page Not Found',
				details: 'The requested URL ' + req.url + ' was not found on this server.'
			}
		});
	}
	/* JSON RESPONSE */
	if (req.accepts('json')) {
		return res.send({
			error: 'Page Not Found'
		});
	}
	res.type('txt').send('Page Not Found');
});
/* 500 */
router.use((err, req, res, next) => {
	let error = {
		status: err.status || 500,
		title: err.title || 'Internal Server Error',
		details: err.details || 'The server encountered an internal error and was unable to complete your request.'
	};
	res.status(error.status)
	/* HTML RESPONSE */
	if (req.accepts('html')) {
		return res.render('error', {
			title: error.title,
			error: error
		});
	}
	/* JSON RESPONSE */
	if (req.accepts('json')) {
		return res.send({
			error: error
		});
	}
	res.type('txt').send(error.title);
});
module.exports = router;