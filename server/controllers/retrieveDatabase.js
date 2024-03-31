const Accounts = require('../models/accounts');
const { StatusCodes } = require('http-status-codes');

async function retrieveDatabase(req, res) {
    res.status(StatusCodes.OK).json({ accounts: await Accounts.find({}) });
}

module.exports = retrieveDatabase;
