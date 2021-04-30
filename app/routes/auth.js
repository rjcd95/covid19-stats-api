const express = require('express')
const router = express.Router()
const trimRequest = require('trim-request')

const { 
    register,
    login,
    refreshToken
} = require('../controllers/auth')

const { 
    validateRegister,
    validateLogin,
    validateRefreshToken
} = require('../controllers/auth/validators')

/*
 * Register route
 */
router.post(
    '/signup',
    trimRequest.all,
    validateRegister,
    register
)

/*
 * Login route
 */
router.post(
    '/login',
    trimRequest.all,
    validateLogin,
    login
)

/*
 * Refresh token
 */
router.get(
    '/token',
    trimRequest.all,
    validateRefreshToken,
    refreshToken
  )

module.exports = router
