const express = require('express');
const { index, show } = require('../controllers/rocketController');

const router = express.Router();

router.route('/').get(index);

router.route('/:id').get(show);

module.exports = router;
