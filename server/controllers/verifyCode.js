const Account = require('../models/accounts');
const VerifyCode = require('../models/verifyCodes');

const { StatusCodes } = require('http-status-codes');

async function verifyCode(req, res) {
	const { code } = req.body;

	if(!code) {
		return res.status(StatusCodes.BAD_REQUEST).json({ code: 2, message: 'Please provide verification code' });
	}

	if(typeof code === 'number' || !(/^\d{8}$/gm.test(code))) { // check if type number cuz somebody might try to hack the verify method
		return res.status(StatusCodes.UNAUTHORIZED).json({ code: 1, message: 'Code does not match' }); // Regex tests if code is 8 digits and only numbers
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
