const express = require('express')
const router = express.Router()

const userController = require('./controllers/userController')
const testsController = require('./controllers/testsController')

const authMiddleware = require('./middlewares/authentication')

router.post('/login', userController.login)
router.post('/register', userController.register)

router.get('/test', authMiddleware, testsController.getTest)
router.post('/create_test', authMiddleware, testsController.createTest)

module.exports = router