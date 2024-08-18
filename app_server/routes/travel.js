const express = require('express');
const router = express.Router();
const travelController = require('../controllers/travel');

/* GET travel page. */
router.get('/', travelController.travel);
router.get('/:tripCode', travelController.travelDetails);

module.exports = router;