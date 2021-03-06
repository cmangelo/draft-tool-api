const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    team: {
        type: String,
        required: true
    },
    bye: {
        type: Number,
        required: true
    },
    rank: {
        type: Number,
        required: true
    },
    points: {
        type: Number,
        required: true
    },
    risk: {
        type: Number,
        required: true
    },
    adp: {
        type: Number,
        required: true
    },
    tier: {
        type: Number,
        required: true
    },
    notes: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;