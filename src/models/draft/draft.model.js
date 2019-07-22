const mongoose = require('mongoose');

const draftSchema = new mongoose.Schema({
    numTeams: {
        type: Number,
        default: 12
    },
    numRounds: {
        type: Number,
        default: 15
    },
    userPosition: {
        type: Number,
        required: true
    },
    QBs: {
        type: Number,
        default: 1,
        required: true
    },
    RBs: {
        type: Number,
        default: 2,
        required: true
    },
    WRs: {
        type: Number,
        default: 2,
        required: true
    },
    TEs: {
        type: Number,
        default: 1,
        required: true
    },
    FLEX: {
        type: Number,
        default: 1,
        required: true
    },
    BENCH: {
        type: Number,
        default: 6,
        required: true
    },
    K: {
        type: Number,
        default: 1,
        required: true
    },
    DEF: {
        type: Number,
        default: 1,
        required: true
    },
    teams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    }]
}, {
    timestamps: true
});



const Draft = mongoose.model('Draft', draftSchema);

module.exports = Draft;

/*
a draft is made up of rounds, a round is made up of picks*/