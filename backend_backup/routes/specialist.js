const express = require('express');
const router = express.Router();
const { getAllTeams, getSpecialist, getLevelContent } = require('../controllers/specialistController');

router.get('/teams', getAllTeams);
router.get('/level/:levelId', getLevelContent);
router.get('/:slug', getSpecialist);

module.exports = router;
