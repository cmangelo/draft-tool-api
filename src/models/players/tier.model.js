const mongoose = require('mongoose');

const tierSchema = new mongoose.Schema({
    tierNumber: {
        type: Number,
        required: true
    },
    startingAtRank: {
        type: Number,
        required: true
    },
    players: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Player'
    }],
    group: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Group'
    }
}, {
    timestamps: true,
});

tierSchema.set('toJSON', {
    virtuals: true
});

const Tier = mongoose.model('Tier', tierSchema);

module.exports = Tier;