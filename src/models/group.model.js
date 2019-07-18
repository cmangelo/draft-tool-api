const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    position: {
        type: Number,
        required: true
    }
}, {
    timestamps: true,
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;