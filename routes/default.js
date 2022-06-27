const express = require('express')
const router = express.Router()

const controller = require('../controllers/defaultController')

router.get('/', controller.getHomePage)
router.get('/login', controller.getLogIN)
router.get('/signup', controller.getSignUP)
router.get('/auctionhouse', controller.getAuctionHouse)
router.get('/profile', controller.getProfile)
router.get('/item', controller.getItem)
router.get('/itemauction', controller.getAuctionItem)
module.exports = router