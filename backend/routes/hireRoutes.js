const express = require('express');
const { hireFreelancer } = require('../controllers/hireController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/:bidId', protect, hireFreelancer);

module.exports = router;
