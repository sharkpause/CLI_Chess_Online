const bcrypt = require('bcrypt');
const Accounts = require('../models/accounts');
const { StatusCodes } = require('http-status-codes');

async function login(req, res) {
    const { username, password } = req.body;

    const account = await Accounts.findOne({ username });

	if(!account || (await bcrypt.compare(password, account.password)) === false) {
		return res.status(StatusCodes.UNAUTHORIZED).json({ errorCode: 1, message: 'Either username or password is incorrect' });
	}

    res.status(StatusCodes.OK).json({ account: await Accounts.findOne({ username }) });
}

module.exports = login;
