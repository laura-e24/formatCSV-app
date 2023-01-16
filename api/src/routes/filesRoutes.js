const express = require('express')
const { getFormattedFiles } = require('../controllers/filesControllers')
const router = express.Router()

router.get('/', getFormattedFiles)

module.exports = router