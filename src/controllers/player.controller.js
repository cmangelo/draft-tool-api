const Player = require('../models/player.model');
const Tier = require('../models/tier.model');
const Group = require('../models/group.model');

exports.findByPosition = async (req, res) => {
    const position = req.params.positionId;
    try {
        const newestGroup = await Group.findOne({
            position
        }).sort({
            createdAt: -1
        });
        const groupId = newestGroup._id;

        const tiers = await Tier.find({
                group: groupId
            }).sort({
                tier: 1
            }).populate('players')
            .exec();
        res.send(tiers);
    } catch (ex) {
        res.status(400).send();
    }
}

exports.uploadFile = async (req, res) => {
    const groupId = req.params.groupId;

    if (Object.keys(req.files).length === 0) {
        res.status(400).send('no files');
    } else {
        try {
            let playersCSV = req.files.players.data.toString('utf8');
            let players = convertCSVToJS(playersCSV, req.params.id);

            let tiersObject = players.reduce(groupPlayersByTier, {});
            let groupModel = new Group({
                position: groupId
            });

            let group = await groupModel.save();

            for (const key of Object.keys(tiersObject)) {
                const sortedPlayers = sortArray(tiersObject[key], 'rank');
                let playerIds = [];
                for (let player of sortedPlayers) {
                    let playerModel = new Player(
                        player
                    );
                    let saved = await playerModel.save();
                    playerIds.push(saved._id);
                }

                const tier = new Tier({
                    tierNumber: parseInt(key),
                    players: playerIds,
                    group: group._id
                });
                await tier.save();
            }
            res.status(204).send();
        } catch (ex) {
            res.status(400).send();
        }
    }
};

exports.updatePlayer = async (req, res) => {
    let _id = req.params.playerId;
    const body = req.body;
    const updates = Object.keys(body);
    const allowedUpdates = ['owner', 'draftedRound', 'draftedPick'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send();
    }

    try {
        const player = await Player.findByIdAndUpdate(_id, body, {
            new: true, //is this supposed to be true?
            runValidators: true
        });
        if (!player) {
            return res.status(404).send();
        }
        res.send(player);
    } catch (ex) {
        res.status(400).send();
    }
}

function convertCSVToJS(csv, groupId) {
    let rows = csv.split('\n');
    let headers = rows[0].split(',').map(field => field.substring(1, field.length - 1));
    headers[headers.length - 1] = headers[headers.length - 1].substring(0, headers[headers.length - 1].length - 1); //trim new line character from last element in list
    rows.shift();
    let players = [];
    rows.forEach((row) => {
        let splitRow = row.split(',');
        let player = {};

        splitRow.forEach((field, ind) => {
            if (ind > headers.length - 1) {
                player[headers[headers.length - 1]] = splitRow.slice(headers.length - 1, ind + 1).join();
            } else {
                player[headers[ind]] = field.substring(1, field.length - 1);
            }
        });
        players.push({
            bye: player['Bye Week'],
            adp: player['ADP'],
            name: player['Name'],
            notes: player['Notes'],
            points: player['Points'],
            rank: player['Rank'],
            risk: player['Risk'],
            team: player['Team'],
            tier: player['Tier'],
            group: groupId
        });
    });
    return players;
}

function groupPlayersByTier(acc, player) {
    var tier = player.tier;
    if (!acc[tier]) {
        acc[tier] = [];
    }
    acc[tier].push(player);
    return acc;
}

function sortArray(arr, property) {
    return arr.sort((a, b) => {
        return a[property] < b[property] ? -1 : 1;
    });
}