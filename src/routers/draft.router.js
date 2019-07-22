const express = require('express');

const draftController = require('../controllers/draft.controller');

const router = express.Router();

router.post('', draftController.createDraft);

router.post('/:draftId/rounds/:round/picks/:pickId', draftController.submitPick);

module.exports = router;