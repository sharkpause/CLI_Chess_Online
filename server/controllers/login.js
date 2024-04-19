const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { StatusCodes } = require('http-status-codes');

const Account = require('../models/accounts');

async function login(req, res) {
    const { username, password } = req.body;

	if(!username) {
		return res.status(StatusCodes.BAD_REQUEST).json({ code: 2, message: 'Please provide username' });
	}
	if(!password) {
		return res.status(StatusCodes.BAD_REQUEST).json({ code: 3, message: 'Please provide password' });
	}

    const account = await Account.findOne({ username });

	if(!account || (await bcrypt.compare(password, account.password)) === false) {
		return res.status(StatusCodes.UNAUTHORIZED).json({ code: 1, message: 'Either username or password is incorrect' });
	}

	const token = jwt.sign(
		{ id: account._id, username },
		process.env.JWT_SECRET,
		{ expiresIn: '1d' }
	);

	res.cookie('jwtToken', token, {
		httpOnly: true,
		secure: true,
		sameSite: 'none',
		maxAge: 3600000
	});

	res.cookie('username', username, {
		sameSite: 'none',
		secure: true
	});

    res.status(StatusCodes.OK).json({ code: 0, message: 'Successfully logged in' });
}

module.exports = login;
