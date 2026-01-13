const Bid = require('../models/Bid');
const Gig = require('../models/Gig');
const mongoose = require('mongoose');

// @desc    Hire a freelancer (atomic transaction)
// @route   POST /api/hire/:bidId
const hireFreelancer = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const bidId = req.params.bidId;

        // Find the bid with session
        const bid = await Bid.findById(bidId).populate('freelancerId').session(session);
        if (!bid) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: 'Bid not found' });
        }

        // Find the gig with session
        const gig = await Gig.findById(bid.gigId).session(session);
        if (!gig) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: 'Gig not found' });
        }

        // Verify the user is the gig owner
        if (gig.clientId.toString() !== req.user._id.toString()) {
            await session.abortTransaction();
            session.endSession();
            return res.status(403).json({ message: 'You are not authorized to hire for this gig' });
        }

        // Lock: Check if gig is still open
        if (gig.status !== 'open') {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ message: 'This gig is already assigned' });
        }

        // 1. Mark selected bid as hired
        bid.status = 'hired';
        await bid.save({ session });

        // 2. Reject all other bids for this gig
        await Bid.updateMany(
            { gigId: gig._id, _id: { $ne: bidId } },
            { $set: { status: 'rejected' } },
            { session }
        );

        // 3. Update gig status to assigned
        gig.status = 'assigned';
        await gig.save({ session });

        // Commit the transaction
        await session.commitTransaction();
        session.endSession();

        // Emit real-time notification to freelancer
        const io = req.app.get('io');
        const userSockets = req.app.get('userSockets');
        const freelancerSocketId = userSockets.get(bid.freelancerId._id.toString());

        if (freelancerSocketId) {
            io.to(freelancerSocketId).emit('hired', {
                message: 'Congratulations! You have been hired for a gig',
                gig: {
                    id: gig._id,
                    title: gig.title,
                },
                bid: {
                    id: bid._id,
                    amount: bid.amount,
                },
            });
        }

        res.status(200).json({
            message: 'Freelancer hired successfully',
            bid,
            gig,
        });
    } catch (error) {
        // Abort transaction on any error
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ message: error.message });
    }
};

module.exports = { hireFreelancer };
