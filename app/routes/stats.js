const express = require('express')
const router = express.Router()

const {
    syncStatsData
} = require('../controllers/stats')

router.get('/sync', syncStatsData)

module.exports = router
