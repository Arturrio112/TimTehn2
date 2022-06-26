const express = require('express')
const router = express.Router()

const controller = require('../controllers/defaultController')

router.get('/', controller.getHomePage)
router.get('/login', controller.getLogIN)
router.get('/signup', controller.getSignUP)
module.exports = router