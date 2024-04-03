const Account = require('../models/accounts');

const { StatusCodes } = require('http-status-codes');

require('dotenv').config();

async function signup(req, res) {
	const { username, email, password } = req.body;

	try {
		if(await Account.findOne({ username })) {
			return res.status(StatusCodes.CONFLICT).json({ errorCode: 1, message: 'Username already in use' });
		}
		if(await Account.findOne({ email })) {
			return res.status(StatusCodes.CONFLICT).json({ errorCode: 2, message: 'Email already in use' });
		}
		
		const user = await Account.create({
			username,
			email,
			password,
		});

		res.status(StatusCodes.OK).json({ database: await Account.find({}) });
	} catch(err) {
		if(err.statusCode === 409)  {
			throw err;
		}
		console.log(err);
	}
}

module.exports = { signup };
