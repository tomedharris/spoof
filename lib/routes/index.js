const express = require('express');

const router = express.Router();

router.use('/', require('./web'));
router.use('/api', require('./api'));

module.exports = router;
