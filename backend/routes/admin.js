const express = require('express')
const router = express.Router()
const {
  getAllResources, addResource, updateResource, deleteResource,
  getAllUsers, getStats, addSpecialist,
  getQuestions, addQuestion, updateQuestion, deleteQuestion,
  getAllProjects, addProject, updateProject, deleteProject,
  getAllCertificates, addCertificate, updateCertificate, deleteCertificate,
} = require('../controllers/adminController')
const { getTraitDistribution, getCareerDistribution, getLowConfidenceUsers, getOverview } = require('../assessment/analytics')
const verifyToken = require('../middleware/auth')
const adminOnly = require('../middleware/adminOnly')

router.use(verifyToken, adminOnly)

router.get('/resources', getAllResources)
router.post('/resources', addResource)
router.put('/resources/:id', updateResource)
router.delete('/resources/:id', deleteResource)

router.get('/projects', getAllProjects)
router.post('/projects', addProject)
router.put('/projects/:id', updateProject)
router.delete('/projects/:id', deleteProject)

router.get('/certificates', getAllCertificates)
router.post('/certificates', addCertificate)
router.put('/certificates/:id', updateCertificate)
router.delete('/certificates/:id', deleteCertificate)

router.get('/users', getAllUsers)
router.get('/stats', getStats)
router.post('/specialists', addSpecialist)

router.get('/questions', getQuestions)
router.post('/questions', addQuestion)
router.put('/questions/:id', updateQuestion)
router.delete('/questions/:id', deleteQuestion)

router.get('/analytics/overview', getOverview)
router.get('/analytics/traits', getTraitDistribution)
router.get('/analytics/careers', getCareerDistribution)
router.get('/analytics/confidence', getLowConfidenceUsers)

module.exports = router