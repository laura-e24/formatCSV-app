const express = require('express')
const { formatData } = require('../controllers/filesControllers')
const router = express.Router()

router.get('/', formatData)

module.exports = router