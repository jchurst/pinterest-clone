const mongoose = require('mongoose');
const PinSchema = new mongoose.Schema({
	createAt: {
		type: Date,
		default: Date.now
	},
	_user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	url: String,
	caption: String,
	likes: [String]
});
module.exports = mongoose.model('Pin', PinSchema);