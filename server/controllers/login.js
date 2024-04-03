const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { StatusCodes } = require('http-status-codes');

const Account = require('../models/accounts');


async function login(req, res) {
    const { username, password } = req.body;

    const account = await Account.findOne({ username });

	if(!account || (await bcrypt.compare(password, account.password)) === false) {
		return res.status(StatusCodes.UNAUTHORIZED).json({ errorCode: 1, message: 'Either username or password is incorrect' });
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

    res.status(StatusCodes.OK).json({ message: 'Successfully logged in' });
}

module.exports = login;
