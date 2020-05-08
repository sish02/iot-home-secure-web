const express = require('express');
const router = express.Router();

//Controllers
const controller = require('./controller');

router.get('/', controller.get_all_readings);

// router.post('/', controller.samples_create_new);

module.exports = router;