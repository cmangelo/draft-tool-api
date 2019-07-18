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