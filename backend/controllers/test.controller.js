const db = require('../../database/db.js')

class TestController {
    async createTest(req, res){
        const {title} = req.body
        const newTest = await db.query('INSERT INTO test (title) VALUES ($1) RETURNING *', [title])
        res.json(newTest.rows[0])
    }
    async getTests(req, res){
        const tests = await db.query('SELECT * FROM test')
        res.json(tests.rows)
    }
    async getOneTest(req, res){
        const id = req.params.id
        const test = await db.query('SELECT * FROM test WHERE id = $1', [id])
        res.json(test.rows)
    }
    async updateTest(req, res){
        const {id, title} = req.body
        const test = await db.query('UPDATE test SET title = $2 WHERE id = $1 RETURNING *', [id, title])
        res.json(test.rows[0])
    }
    async deleteTest(req, res){
        const id = req.params.id
        const test = await db.query('DELETE FROM test WHERE id = $1', [id])
        res.json(test.rows[0])
    }
}
module.exports = new TestController()