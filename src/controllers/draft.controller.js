const Draft = require('../models/draft/draft.model');
const Round = require('../models/draft/round.model');
const Pick = require('../models/draft/pick.model');
const Team = require('../models/draft/team.model');

exports.createDraft = async (req, res) => {
    try {
        const body = req.body;
        const playerConfig = body.playerConfig;

        const teamIds = [];
        for (let i = 1; i < body.numTeams + 1; i++) {
            let team;
            if (i === parseInt(body.userPosition)) {
                team = new Team({
                    owner: 'Me',
                    draftPosition: i
                });
            } else {
                team = new Team({
                    owner: 'Team ' + i,
                    draftPosition: i
                });
            }

            const savedTeam = await team.save();
            teamIds.push(team._id);
        }

        const draft = new Draft({
            numTeams: body.numTeams,
            numRounds: body.numRounds,
            userPosition: body.userPosition,
            teams: teamIds,
            QBs: playerConfig.QBs,
            RBs: playerConfig.RBs,
            WRs: playerConfig.WRs,
            TEs: playerConfig.TEs,
            FLEX: playerConfig.FLEX,
            BENCH: playerConfig.BENCH,
            K: playerConfig.K,
            DEF: playerConfig.DEF
        });
        const savedDraft = await draft.save();
        const response = await Draft.findById(savedDraft._id).populate('teams').exec();
        res.status(201).send(response);
    } catch (ex) {
        res.status(400).send()
    }
}

exports.submitPick = async (req, res) => {

}