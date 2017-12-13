const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
	twitter: {
		id: {
			type: Number,
			unique: true
		},
		token: String,
		username: String,
		thumbnail: String
	}
});
module.exports = mongoose.model('User', UserSchema);