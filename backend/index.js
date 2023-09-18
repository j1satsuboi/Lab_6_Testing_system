const express = require('express')
const cors = require('cors')

const testRouter = require('./routes/test.route.js')
const questionRouter = require('./routes/question.route.js')
const answerRouter = require('./routes/answer.route.js')

const PORT = 8080

const app = express()

app.use(cors())
app.use(express.json())
app.use('/', testRouter)
app.use('/', questionRouter)
app.use('/', answerRouter)

app.listen(PORT, () => console.log('Server started on port: ' + PORT))