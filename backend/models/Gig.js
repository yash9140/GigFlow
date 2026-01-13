const mongoose = require('mongoose');

const gigSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        budget: {
            type: Number,
            required: true,
            min: 0,
        },
        status: {
            type: String,
            enum: ['open', 'assigned'],
            default: 'open',
        },
        clientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Gig', gigSchema);
