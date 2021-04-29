const express = require('express')
const router = express.Router()
const trimRequest = require('trim-request')

const {
    syncStats,
    getAllStats,
    getStatItem,
} = require('../controllers/stats')

/*
 * Sync stats data route
 */
router.get('/sync', syncStats)

/*
 * Get all items route
 */
router.get('/', getAllStats)

/*
 * Get stats item route
 */
router.get(
    '/:id',
    getStatItem
)

module.exports = router
