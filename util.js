exports.attachUser = (req, res, next) => {
	res.locals.user = req.user && req.user;
	next();
};
exports.isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) return next();
	res.redirect('/');
};