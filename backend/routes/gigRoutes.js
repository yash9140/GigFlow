const express = require('express');
const { createGig, getGigs, getGigById } = require('../controllers/gigController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Protected routes
router.post('/', protect, createGig);
router.get('/', getGigs);
router.get('/:id', getGigById);

module.exports = router;
