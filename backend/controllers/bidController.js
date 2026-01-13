const Bid = require('../models/Bid');
const Gig = require('../models/Gig');

// @desc    Submit a bid on a gig
// @route   POST /api/bids
const submitBid = async (req, res) => {
    try {
        const { gigId, amount, proposal } = req.body;

        // Validate input
        if (!gigId || !amount || !proposal) {
            return res.status(400).json({ message: 'Please provide all fields' });
        }

        // Check if gig exists and is open
        const gig = await Gig.findById(gigId);
        if (!gig) {
            return res.status(404).json({ message: 'Gig not found' });
        }

        if (gig.status !== 'open') {
            return res.status(400).json({ message: 'This gig is no longer accepting bids' });
        }

        // Prevent client from bidding on own gig
        if (gig.clientId.toString() === req.user._id.toString()) {
            return res.status(400).json({ message: 'Cannot bid on your own gig' });
        }

        // Create bid (duplicate prevention handled by unique index)
        const bid = await Bid.create({
            gigId,
            freelancerId: req.user._id,
            amount,
            proposal,
        });

        res.status(201).json(bid);
    } catch (error) {
        // Handle duplicate bid error
        if (error.code === 11000) {
            return res.status(400).json({ message: 'You have already placed a bid on this gig' });
        }
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all bids for a gig (gig owner only)
// @route   GET /api/bids/:gigId
const getBidsByGig = async (req, res) => {
    try {
        const gigId = req.params.gigId;

        // Check if gig exists
        const gig = await Gig.findById(gigId);
        if (!gig) {
            return res.status(404).json({ message: 'Gig not found' });
        }

        // Restrict to gig owner only
        if (gig.clientId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You are not authorized to view these bids' });
        }

        // Get all bids for this gig
        const bids = await Bid.find({ gigId })
            .populate('freelancerId', 'name email')
            .sort({ createdAt: -1 });

        res.status(200).json(bids);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { submitBid, getBidsByGig };
