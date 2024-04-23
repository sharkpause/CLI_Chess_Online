const Accounts = require('../models/accounts');
const VerifyCodes = require('../models/verifyCodes');
const Online = require('../models/online');

const { StatusCodes } = require('http-status-codes');

async function retrieveDatabase(req, res) { // Only for testing, will not be present in production
    res.status(StatusCodes.OK).json({
		accounts: await Accounts.find({}),
		verifyCodes: await VerifyCodes.find({}),
		online: await Online.find({})
	});
}

module.exports = retrieveDatabase;
