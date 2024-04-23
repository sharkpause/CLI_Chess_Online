const mongoose = require('mongoose');

const OnlineSchema = new mongoose.Schema({
	username: {
		type: String
	},
	token: {
		type: String
	},
	createdAt: {
		type: Date,
		default: Date.now,
		expires: 3600000
	}
});

module.exports = mongoose.model('Online', OnlineSchema, 'online');
