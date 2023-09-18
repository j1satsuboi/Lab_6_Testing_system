const db = require('../../database/db.js')

class AnswerController {
    async createAnswer(req, res){
        const {question_id, questionTest_id, answer_id, description, isCorrect} = req.body
        const newAnswer = await db.query('INSERT INTO answer (question_id, questionTest_id, answer_id, description, isCorrect) VALUES ($1, $2, $3, $4, $5) RETURNING *', [question_id, questionTest_id, answer_id, description, isCorrect])
        res.json(newAnswer.rows[0])
    }
    async getAnswers(req, res){
        const answers = await db.query('SELECT * FROM answer')
        res.json(answers.rows)
    }
    async getAnswersByQuestion(req, res){
        const id = req.params.id
        const answer = await db.query('SELECT * FROM answer WHERE question_id = $1', [id])
        res.json(answer.rows)
    }
    async updateAnswer(req, res){
        const {id, question_id, questionTest_id, answer_id, description, isCorrect} = req.body
        const answer = await db.query('UPDATE answer SET question_id = $2, questionTest_id = $3, answer_id = $4, description = $5, isCorrect = $6 WHERE id = $1 RETURNING *', [id, question_id, questionTest_id, answer_id, description, isCorrect])
        res.json(answer.rows[0])
    }
    async deleteAnswer(req, res){
        const id = req.params.id
        const answer = await db.query('DELETE FROM answer WHERE id = $1', [id])
        res.json(answer.rows[0])
    }
}
module.exports = new AnswerController()