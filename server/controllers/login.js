const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { StatusCodes } = require('http-status-codes');

const Account = require('../models/accounts');
const Online = require('../models/online');

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

	const onlineAccount = Online.findOne({ username });

	if(onlineAccount.token !== undefined) {
		if(onlineAccount.token !== token) {
			return res.status(StatusCodes.CONFLICT).json({ code: 4, message: 'User already logged in' });
		}
	}

	Online.create({ username, token });

	res.cookie('jwtToken', token, {
		httpOnly: true,
		secure: true,
		sameSite: 'none',
		maxAge: 3600000
	});

	res.cookie('username', username, { // username cookie is for the client to know who is logged in currently for UI purposes
		sameSite: 'none',
		secure: true
	});

    res.status(StatusCodes.OK).json({ code: 0, message: 'Successfully logged in' });
}

module.exports = login;
