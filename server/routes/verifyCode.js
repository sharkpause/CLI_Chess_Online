const router = require('express').Router();

const verifyCode = require('../controllers/verifyCode');

router.route('/').post(verifyCode);

module.exports = router;
