const express = require('express')
const router = express.Router()

const {
    syncStats,
    getAllStats,
} = require('../controllers/stats')

/*
 * Get all items route
 */
router.get('/', getAllStats)

/*
 * Sync stats data route
 */
router.get('/sync', syncStats)

module.exports = router
