const Account = require('../models/accounts');
const VerifyCode = require('../models/verifyCodes');

const { StatusCodes } = require('http-status-codes');

async function verifyCode(req, res) {
	const { code } = req.body;

	if(typeof code !== 'number') {
		return res.status(StatusCodes.UNAUTHORIZED).json({ code: 1, message: 'Code does not match' });
	}

	const userData = await VerifyCode.findOne({ code });

	if(userData) {
		await Account.create({
			username: userData.username,
			email: userData.email,
			password: userData.password
		});

		await VerifyCode.deleteMany({ username: userData.username });
		await VerifyCode.deleteMany({ email: userData.email });
		
		res.status(StatusCodes.OK).json({ code: 0, message: 'Successfully verified email, account created' });
	} else {
		res.status(StatusCodes.UNAUTHORIZED).json({ code: 1, message: 'Code does not match' });
	}
}

module.exports = verifyCode;
