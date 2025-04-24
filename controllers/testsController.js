const { Test, Question, AnswerOption } = require('../models')


exports.getTest = async (req, res) => {
    const testObject = await Test.findByPk(req.body.test_id)

    if(testObject == null) return res.status(404)

    let test = {
        title: testObject.title,
        questions: []
    }

    const questions = await Question.findAll({ where: { test_id: testObject.id } })

    for (const questionObject of questions) {
        let question = {
            question: questionObject.question,
            options: [],
            correctAnswer: questionObject.correctAnswer.split(' ').map((x) => +x),
            isCheckbox: questionObject.isCheckbox
        }

        let answerOptions = await AnswerOption.findAll({ where: { question_id: questionObject.id } })

        for(const answerOption of answerOptions){
            question.options.push(answerOption.text)
        }

        test.questions.push(question)
    }

    res.json(test)
}


exports.createTest = async(req, res) => {
    const test = await Test.create({ title: req.body.title, author: req.user.id})

    for (const questionObject of req.body.questions) {
        const question = await Question.create({ 
            question: questionObject.question, 
            test_id: test.id, 
            correctAnswer: questionObject.correctAnswer,
            isCheckbox: questionObject.isCheckbox
        })

        for(const answerOption of questionObject.options){
            await AnswerOption.create({ text: answerOption, question_id: question.id })
        }
    }

    res.sendStatus(200)
}