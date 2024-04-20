const mongoose = require('mongoose');

const OnlineSchema = new mongoose.Schema({
	token: {
		type: String
	},
	createdAt: {
		type: Date,
		default: Date.now,
		expires: 300
	}
});

module.exports = mongoose.model('Online', OnlineSchema, 'online');
