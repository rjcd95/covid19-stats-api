const express = require('express')
const router = express.Router()
const trimRequest = require('trim-request')

const {
    validateGetStatsItem,
    validateRegisterStats,
} = require('../controllers/stats/validators')

const {
    syncStats,
    getAllStats,
    getStatItem,
    registerStats,
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
    trimRequest.all,
    validateGetStatsItem,
    getStatItem
)
/*
 * Get stats item route
 */
router.get(
    '/:id',
    getStatItem
)

/*
 * Register new cases and update totals
 */
router.post(
    '/:id',
    trimRequest.all,
    validateRegisterStats,
    registerStats
)

module.exports = router
