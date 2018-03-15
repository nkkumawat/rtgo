const express = require('express');
const router = express.Router();


router.use('/refresh_balance', require('./refresh_balance'));
router.use('/receipt', require('./receipt'));

module.exports = router;
