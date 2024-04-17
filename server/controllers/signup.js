const Account = require('../models/accounts');
const VerifyCode = require('../models/verifyCodes');

const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { StatusCodes } = require('http-status-codes');

require('dotenv').config();

async function signup(req, res) {
	const { username, email, password } = req.body;

	if(!username) {
		return res.status(StatusCodes.BAD_REQUEST).json({ code: 3, message: 'Please provide username' });
	}
	if(!email) {
		return res.status(StatusCodes.BAD_REQUEST).json({ code: 4, message: 'Please provide email' });
	}
	if(!password) {
		return res.status(StatusCodes.BAD_REQUEST).json({ code: 5, message: 'Please provide password' });
	}

	try {
		if(await Account.findOne({ username })) {
			return res.status(StatusCodes.CONFLICT).json({ code: 1, message: 'Username already in use' });
		}
		if(await Account.findOne({ email })) {
			return res.status(StatusCodes.CONFLICT).json({ code: 2, message: 'Email already in use' });
		}

		let emailCode;

		const searchedCode = await VerifyCode.findOne({ email });
		if(!searchedCode) {
			emailCode = Math.floor(10000000 + Math.random() * 90000000);
			await VerifyCode.create({ code: emailCode, username, email, password });
		} else {
			emailCode = searchedCode.code;
		}

		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS
			}
		});
	
		const mailOptions = {
			from: 'finfeedapp@gmail.com',
			to: email,
			subject: 'Verify CLI_Chess_Online email',
			html: `<p>Enter the following code to verify your CLI_Chess_Online email: </p><p>${emailCode}</p>`
		}

		await transporter.sendMail(mailOptions);

		res.status(StatusCodes.OK).json({ code: 0, message: 'Please check your email for a code' });
	} catch(err) {
		if(err.statusCode === 409)  {
			throw err;
		}
		console.log(err);
	}
}

module.exports = { signup };
