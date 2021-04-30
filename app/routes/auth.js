const express = require('express')
const router = express.Router()
const trimRequest = require('trim-request')

const { register } = require('../controllers/auth')
const { validateRegister } = require('../controllers/auth/validators')

/*
 * Register route
 */
router.post(
    '/register',
    trimRequest.all,
    validateRegister,
    register
)

module.exports = router
