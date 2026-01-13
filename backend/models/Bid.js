const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema(
    {
        gigId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Gig',
            required: true,
        },
        freelancerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        amount: {
            type: Number,
            required: true,
            min: 0,
        },
        proposal: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['pending', 'hired', 'rejected'],
            default: 'pending',
        },
    },
    {
        timestamps: true,
    }
);

// Ensure a freelancer can only bid once per gig
bidSchema.index({ gigId: 1, freelancerId: 1 }, { unique: true });

module.exports = mongoose.model('Bid', bidSchema);
