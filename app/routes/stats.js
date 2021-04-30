const express = require('express')
const router = express.Router()
const trimRequest = require('trim-request')
require('../config/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})

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
router.get(
    '/sync',
    requireAuth,
    syncStats
)

/*
 * Get all items route
 */
router.get(
    '/',
    requireAuth,
    getAllStats
)

/*
 * Get stats item route
 */
router.get(
    '/:id',
    requireAuth,
    trimRequest.all,
    validateGetStatsItem,
    getStatItem
)

/*
 * Get stats item route
 */
router.get(
    '/:id',
    requireAuth,
    getStatItem
)

/*
 * Register new cases and update totals
 */
router.post(
    '/:id',
    requireAuth,
    trimRequest.all,
    validateRegisterStats,
    registerStats
)

module.exports = router
