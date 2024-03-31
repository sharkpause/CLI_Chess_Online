const router = require('express').Router();
const retrieveDatabase = require('../controllers/retrieveDatabase');

router.route('/').get(retrieveDatabase);

module.exports = router;
