const Player = require('../models/player.model');

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
};

exports.findByGroup = async (req, res) => {
    try {
        let players = await Player.find({
            group: req.params.groupId
        });
        res.send(players);
    } catch (ex) {
        res.status(400).send(ex);
    }
};

exports.uploadFile = async (req, res) => {
    if (Object.keys(req.files).length === 0) {
        res.send('no files');
    } else {
        try {
            let playersCSV = req.files.players.data.toString('utf8');
            let players = convertCSVToJS(playersCSV, req.params.id);
            for (const p of players) {
                let player = new Player(p);
                await player.save();
            }
            res.status(204).send();
        } catch (ex) {
            console.log(ex.message);
            res.status(400).send();
        }
    }
};