const Account = require('../models/accounts');
const VerifyCode = require('../models/verifyCodes');

const { StatusCodes } = require('http-status-codes');

async function verifyCode(req, res) {
	const { code } = req.body;

	const userData = await VerifyCode.findOne({ code });

	if(userData) {
		await Account.create({
			username: userData.username,
			email: userData.email,
			password: userData.password
		});

		await VerifyCode.deleteOne({ code });
		
		res.status(StatusCodes.OK).json({ code: 0, message: 'Successfully verified email, account created' });
	} else {
		res.status.(StautsCodes.UNAUTHORIZED).json({ code: 1, message: 'Code does not match' });
	}
}

module.exports = verifyCode;
