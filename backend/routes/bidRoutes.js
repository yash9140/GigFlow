const express = require('express');
const { submitBid, getBidsByGig } = require('../controllers/bidController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All bid routes are protected
router.post('/', protect, submitBid);
router.get('/:gigId', protect, getBidsByGig);

module.exports = router;
