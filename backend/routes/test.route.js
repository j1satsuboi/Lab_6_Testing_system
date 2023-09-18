const Router = require('express')
const router = new Router()
const testController = require('../controllers/test.controller.js')

router.post('/test', testController.createTest)
router.get('/test', testController.getTests)
router.get('/test/:id', testController.getOneTest)
router.put('/test', testController.updateTest)
router.delete('/test/:id', testController.deleteTest)

module.exports = router