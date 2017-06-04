const express = require('express');
const HomeController = require('../controllers/home-controller');

const router = express.Router();

router.route('/')
    .get((new HomeController()).index);


module.exports = router;
