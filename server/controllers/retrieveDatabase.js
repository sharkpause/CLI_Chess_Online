const Accounts = require('../models/accounts');
const VerifyCodes = require('../models/verifyCodes');

const { StatusCodes } = require('http-status-codes');

async function retrieveDatabase(req, res) {
    res.status(StatusCodes.OK).json({
		accounts: await Accounts.find({}),
		verifyCodes: await VerifyCodes.find({})
	});
}

module.exports = retrieveDatabase;
