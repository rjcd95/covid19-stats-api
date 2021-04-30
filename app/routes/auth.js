const express = require('express')
const router = express.Router()
const trimRequest = require('trim-request')

const { 
    register,
    login
} = require('../controllers/auth')

const { 
    validateRegister,
    validateLogin
} = require('../controllers/auth/validators')

/*
 * Register route
 */
router.post(
    '/register',
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

module.exports = router
