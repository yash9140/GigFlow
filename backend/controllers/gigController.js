const Gig = require('../models/Gig');

// @desc    Create new gig
// @route   POST /api/gigs
const createGig = async (req, res) => {
    try {
        const { title, description, budget } = req.body;

        // Validate input
        if (!title || !description || !budget) {
            return res.status(400).json({ message: 'Please provide all fields' });
        }

        // Create gig
        const gig = await Gig.create({
            title,
            description,
            budget,
            clientId: req.user._id,
        });

        res.status(201).json(gig);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all gigs with optional search
// @route   GET /api/gigs?search=keyword
const getGigs = async (req, res) => {
    try {
        const { search } = req.query;
        let query = { status: 'open' };

        // Add title search if provided
        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }

        const gigs = await Gig.find(query)
            .populate('clientId', 'name email')
            .sort({ createdAt: -1 });

        res.status(200).json(gigs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single gig by ID
// @route   GET /api/gigs/:id
const getGigById = async (req, res) => {
    try {
        const gig = await Gig.findById(req.params.id).populate('clientId', 'name email');

        if (!gig) {
            return res.status(404).json({ message: 'Gig not found' });
        }

        res.status(200).json(gig);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createGig, getGigs, getGigById };
