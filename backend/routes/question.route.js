const Router = require('express')
const router = new Router()
const questionController = require('../controllers/question.controller.js')

router.post('/question', questionController.createQuestion)
router.get('/question', questionController.getQuestions)
router.get('/question/:id', questionController.getQuestionByTest)
router.put('/question', questionController.updateQuestion)
router.delete('/question/:id', questionController.deleteQuestion)

module.exports = router