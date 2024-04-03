const Account = require('../models/accounts');
const { StatusCodes } = require('http-status-codes');

async function signup(req, res) {
	const { username, email, password, cookieAccepted } = req.body;

	try {
		if((await Account.find({ username }).length > 0)) {
			return res.status(409).json({ errorCode: 1, message: 'Username already in use' });
		}
		if((await Account.find({ email }).length > 0)) {
			return res.status(409).json({ errorCode: 2, message: 'Email already in use' });
		}
		
		const user = await Account.create({
			username,
			email,
			password,
			cookieAccepted
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
