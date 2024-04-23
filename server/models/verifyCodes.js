const mongoose = require('mongoose');

const VerifyCodeSchema = new mongoose.Schema({
	code: {
		type: Number,
		unique: true
	},
	username: {
		type: String,
		required: true,
		unique: false,
		maxlength: 30,
		minLength: 3,
		validate: {
			validator: name => {
				return /^[a-zA-Z0-9_]+$/.test(name);
			},
			message: 'Username may only contain letters, numbers, and underscores'
		}
	},
	email: {
		type: String,
		required: true,
		unique: true,
		maxlength: 500,
		validate: {
			validator: email => {
				return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/gm;
			},
			message: 'Invalid email'
		}
	},
	password: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now,
		expires: 300
	}
});

module.exports = mongoose.model('VerifyCode', VerifyCodeSchema, 'verifyCodes');
