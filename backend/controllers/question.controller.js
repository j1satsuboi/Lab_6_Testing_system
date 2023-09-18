const db = require('../../database/db.js')

class QuestionController {
    async createQuestion(req, res){
        const {questionTest_id, description, test_id} = req.body
        const newQuestion = await db.query('INSERT INTO question (questionTest_id, description, test_id) VALUES ($1, $2, $3) RETURNING *', [questionTest_id, description, test_id])
        res.json(newQuestion.rows[0])
    }
    async getQuestions(req, res){
        const questions = await db.query('SELECT * FROM question')
        res.json(questions.rows)
    }
    async getQuestionByTest(req, res){
        const testId = req.params.id
        const question = await db.query('SELECT * FROM question WHERE test_id = $1', [testId])
        res.json(question.rows)
    }
    async updateQuestion(req, res){
        const {id, questionTest_id, description, test_id} = req.body
        const question = await db.query('UPDATE question SET questionTest_id = $2, description = $3, test_id = $4 WHERE id = $1 RETURNING *', [id, questionTest_id, description, test_id])
        res.json(question.rows[0])
    }
    async deleteQuestion(req, res){
        const id = req.params.id
        const question = await db.query('DELETE FROM question WHERE id = $1', [id])
        res.json(question.rows[0])
    }
}
module.exports = new QuestionController()