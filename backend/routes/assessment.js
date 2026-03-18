const express = require('express');
const router = express.Router();
const { getQuestions, analyze } = require('../controllers/assessmentController');
const verifyToken = require('../middleware/auth');
router.get('/questions', getQuestions);
router.post('/analyze', verifyToken, analyze);
module.exports = router;