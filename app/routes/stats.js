const express = require('express')
const router = express.Router()

const {
    syncStats
} = require('../controllers/stats')

router.get('/sync', syncStats)

module.exports = router
